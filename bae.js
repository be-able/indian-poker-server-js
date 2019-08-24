 
/** 
* 连接到mongodb 
* 使用mongoose而非mongodb中间件 
**/  
let mongoose = require('mongoose');  
let host,port,username,password,database,url;

if (process.env.SERVER_SOFTWARE === 'bae/3.0') {
    host = 'localhost';
    username ="admin",
    password ="admin",
    database = 'indian-poker';
    port = 27017;
    url ="mongodb://"+ username +":"+ password +"@"+ host +":"+ port +"/"+ database;  
} else {
    host = '127.0.0.1';
    database = 'blog';
    port = 27017;
    url = "mongodb://127.0.0.1:27017/blog";
}
 
   
let recon =true;  
function getConnect(){  
	let opts ={  
	          db:{native_parser:true},  
	          server:{ poolSize:5, auto_reconnect:true },  
	          user: username,  
	          pass: password  
	};  
	// mongoose.connect("mongodb://HahMqSkZWUq9QWHsWceXmG83:XH82hOf5MGzoMUMUkCNj0KdBvecF3mzP@mongo.duapp.com:8908/pQPzvWlctdHpUjrbtFnX");//需要验证账户  
	// mongoose.connect("mongodb://" + username + ":" + password +"@"+ host + ":" + port + "/" + dbName);//需要验证账户  
	mongoose.connect(url, opts);  
	let dbcon = mongoose.connection;  
	// let dbcon = mongoose.createConnection(url, opts);  
	dbcon.on('error',function(error){  
	    console.log('connection error');  
		// throw new Error('disconnected,restart');  
		dbcon.close();  
	});  
	   
	//监听关闭事件并重连  
	dbcon.on('disconnected',function(){  
		console.log('disconnected');  
		dbcon.close();  
	});  
	dbcon.on('open',function(){  
		console.log('connection success open');  
		recon =true;  
	});  
	dbcon.on('close',function(err){  
		console.log('closed');  
	// dbcon.open(host, dbName, port, opts, function() {  
	// console.log('closed-opening');  
	// });  
		reConnect('*');  
	});  
	function reConnect(msg){  
		console.log('reConnect'+msg);  
		if(recon){  
			console.log('reConnect-**');  
			dbcon.open(host, database, port, opts,function(){  
				console.log('closed-opening');  
			      });  
		    recon =false;  
		    console.log('reConnect-***');  
		};  
		console.log('reConnect-end');  
	}	  
}  
   
exports.getConnect = getConnect;//包含到module.exports对象中,  
// 如果module.exports中包含属性或方法则export.XX将被忽略  
// Module.exports才是真正的接口，exports只不过是它的一个辅助工具。  
// 最终返回给调用的是Module.exports而不是exports。  
// 所有的exports收集到的属性和方法，都赋值给了Module.exports。  
// 当然，这有个前提，就是Module.exports本身不具备任何属性和方法。  
// 如果，Module.exports已经具备一些属性和方法，那么exports收集来的信息将被忽略。  
//module.exports = getConnection;//直接导出这个对象  
exports.mongoose = mongoose;  