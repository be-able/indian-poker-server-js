function bindRoomsApi(socket) {
  socket.on('hello', function (data) {
    console.log(data);
    console.log(data.msg);
    socket.emit('hello', {'pid': data.pid, 'msg': `hello. I am hyobin bot. I like jjam bbong. You said : ${data.msg}`});
  });

  socket.on('createRoom', function (data) {
    const rooms = socket.rooms;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i] == data.room) {
        socket.emit('createRoom', {'pid': data.pid, 'error': 1, 'msg': `${data.room}은 이미 존재하는 방입니다.`});
        return;
      }
      socket.join(data.room);
      socket.emit('createRoom', {'pid': data.pid, 'error': 0, 'msg': `${data.room} 에 입장했습니다.`});
    }
  });

  socket.on('leaveRoom', function (data) {
    socket.leave(data.room);
    socket.emit('leaveRoom', {'pid': data.pid, msg: `${data.room} 방을 나갔습니다.`});
  });

  socket.on('joinRoom', function (data) {
    //console.log(data);
    socket.join(data.room);
  });

  socket.on('getRooms', function (data) {
    const rooms = socket.rooms;
    console.log(rooms);
    socket.emit('getRooms', {'pid': `${data.pid}`, 'rooms': rooms});
  });
}

module.exports = bindRoomsApi;