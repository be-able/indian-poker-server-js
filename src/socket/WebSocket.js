//socket.io模块
const Blogs = require('../models/blogs');
const bindRoomsApi = require('./api/rooms');

function serverSocket(server) {
  var io = require('socket.io')(server);
  io.on('connection', function (socket) {
    bindRoomsApi(socket);
    socket.on('add_comment', function (data) {
      console.log(data);
      var blogId = data.blogId;
      var commenter = data.author;
      var comment = data.comment;
      var date = data.date;
      Blogs.findById(blogId, function (err, blogs) {
        if (err) console.log(err);
        socket.broadcast.to(blogId).emit('render_comment', {
          date: date,
          commenter: commenter,
          blogTitle: blogs[0].title,
          blogId: blogId,
          comment: comment
        });
      });
    });
  });
};

module.exports = serverSocket;