var express = require('express');
var router = express.Router();
var Blogs = require('../models/blogs');

/* POST title modify page. */
router.post('/title_modify/:blogId', function(req, res, next) {
	console.log(req.body);
	var data = {title:req.body.title, date:{updateAt:Date.now()}};
	Blogs.update({_id: req.params.blogId},data, 
		function(err, msg){
		console.log(msg);
		if(err){
			console.log(err);
		} else {
			res.send(req.body);
		}
	});

});

module.exports = router;