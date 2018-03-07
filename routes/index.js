var express = require('express');
var router = express.Router();
var request = require('request');
var iconv = require('iconv-lite');
var zlib = require('zlib');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mirror', { title: 'Express' });
});
router.get('/index', function(req, res, next) {
  res.render('beian', { title: 'Express' });
});
/* GET home page. */
router.get('/video/av(:aid([0-9]+))', function(req, res, next) {
	var aid = req.params.aid;
	res.render('view', { id: aid });
});
router.get('/video/(:aid([a-z]+)).html', function(req, res, next) {
	var aid = req.params.aid;
	res.render('view_2', { id: aid });
});
router.get('/bangumi/(:aid)', function(req, res, next) {
	var aid = req.params.aid;
	res.render('view_3', { id: aid, type: "bangumi" });
});
router.get('/tag/(:aid)', function(req, res, next) {
	var aid = req.params.aid;
	res.render('view_3', { id: aid, type: "tag" });
});
router.post('/boom',function(req,res,next) {
	var pwd = req.body.pwd;
	console.log(pwd);
	var outdata = '438';
	if(pwd == 'iamyourfather')
	{
		outdata = '2233';
		console.log(outdata);
	}
	res.send(outdata);
});

router.get('/mirror', function(req, res, next) {
	var aid = req.params.aid;
	res.render('mirror', {  });
});
router.get('/bilibili',function(req,res,next){
	request({uri:'http://www.bilibili.com',headers:{referer: 'http://www.bilibili.com'}}, function (error, response, body) {
    	if (!error && response.statusCode == 200) {
    		res.render('index_get', { html: body });
      	}
    })
});
router.get('/curl/test',function(req,res,next){
	var rc = {code:0,msg:'OK'};
	console.log("curl test");
	function sleep(milliSeconds) { 
		    var startTime = new Date().getTime(); 
		        while (new Date().getTime() < startTime + milliSeconds);
			 };
	 sleep(10000);
	res.send(rc);
});
router.get('/index/catalogy/(:json)', function(req, res, next){
	var id = req.params.json;
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://www.bilibili.com/index/catalogy/"+id,
				headers: {
					     'Accept-Encoding' : 'gzip',
					     }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			zlib.unzip(body, function(err, buffer) {
             	res.send(buffer.toString());
       		});				
      	}
	});
});

router.get('/search', function(req, res, next){
	res.render('search',{});
});

router.get('/widget/(:json)', function(req, res, next){
	var id = req.params.json;
	var getpar = "?";
	for(key in req.query)
	{
		getpar+=key+"="+req.query[key]+"&";
	}
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://www.bilibili.com/widget/"+id+getpar,
				getData:req.query,
				headers: {
					     'Accept-Encoding' : 'gzip',
					     }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			zlib.unzip(body, function(err, buffer) {
             	res.send(buffer.toString());
       		});				
      	}
	});
});

router.get('/api_proxy', function(req, res, next){
	var getpar = "?";
	for(key in req.query)
	{
		getpar+=key+"="+req.query[key]+"&";
	}
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://www.bilibili.com/api_proxy"+getpar,
				getData:req.query,
				headers: {
					     'Accept-Encoding' : 'gzip',
					     }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			zlib.unzip(body, function(err, buffer) {
             	res.send(buffer.toString());
       		});				
      	}
	});
});



router.get('/index/promote/(:json)', function(req, res, next){
	var id = req.params.json;
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://www.bilibili.com/index/promote/"+id,
				headers: {
					     'Accept-Encoding' : 'gzip',
					     }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			zlib.unzip(body, function(err, buffer) {
             	res.send(buffer.toString());
       		});				
      	}
	});
});

router.get('/x/web-show/res/loc', function(req, res, next){
	var getpar = "?";
	for(key in req.query)
	{
		getpar+=key+"="+req.query[key]+"&";
	}
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://api.bilibili.com/x/web-show/res/loc"+getpar,
				headers: {
						 'referer' :'http://www.bilibili.com',
						 }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
             	res.send(body);		
		}else{
			res.send("boy next door!");	
		}
		  
	});
});


router.get('/x/web-show/res/locs', function(req, res, next){
	var getpar = "?";
	for(key in req.query)
	{
		getpar+=key+"="+req.query[key]+"&";
	}
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://api.bilibili.com/x/web-show/res/locs"+getpar,
				headers: {
						 'referer' :'http://www.bilibili.com',
						 }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			//console.log(body.toString());
            res.send(body);		
		}else{
			res.send("boy next door!");	
		}
		  
	});
});

router.get('/x/web-interface/index/icon', function(req, res, next){
	var getpar = "?";
	for(key in req.query)
	{
		getpar+=key+"="+req.query[key]+"&";
	}
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://api.bilibili.com/x/web-interface/index/icon"+getpar,
				headers: {
						 'referer' :'http://www.bilibili.com',
						 }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			//console.log(body.toString());
            res.send(body);		
		}else{
			res.send("boy next door!");	
		}
		  
	});
});


router.get('/x/web-interface/nav', function(req, res, next){
	var getpar = "?";
	for(key in req.query)
	{
		getpar+=key+"="+req.query[key]+"&";
	}
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://api.bilibili.com/x/web-interface/nav"+getpar,
				headers: {
						 'referer' :'http://www.bilibili.com',
						 }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			//console.log(body.toString());
            res.send(body);		
		}else{
			res.send("boy next door!");	
		}
		  
	});
});

router.get('/x/web-interface/online', function(req, res, next){
	var getpar = "?";
	for(key in req.query)
	{
		getpar+=key+"="+req.query[key]+"&";
	}
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://api.bilibili.com/x/web-interface/online"+getpar,
				headers: {
						 'referer' :'http://www.bilibili.com',
						 }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			//console.log(body.toString());
            res.send(body);		
		}else{
			res.send("boy next door!");	
		}
		  
	});
});

router.get('/x/web-interface/dynamic/region', function(req, res, next){
	var getpar = "?";
	for(key in req.query)
	{
		getpar+=key+"="+req.query[key]+"&";
	}
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://api.bilibili.com/x/web-interface/dynamic/region"+getpar,
				headers: {
						 'referer' :'http://www.bilibili.com',
						 }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			//console.log(body.toString());
            res.send(body);		
		}else{
			res.send("boy next door!");	
		}
		  
	});
});

router.get('/x/web-interface/ranking/region', function(req, res, next){
	var getpar = "?";
	for(key in req.query)
	{
		getpar+=key+"="+req.query[key]+"&";
	}
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://api.bilibili.com/x/web-interface/ranking/region"+getpar,
				headers: {
						 'referer' :'http://www.bilibili.com',
						 }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			//console.log(body.toString());
            res.send(body);		
		}else{
			res.send("boy next door!");	
		}
		  
	});
});

router.get('/x/web-interface/dynamic/total', function(req, res, next){
	var getpar = "?";
	for(key in req.query)
	{
		getpar+=key+"="+req.query[key]+"&";
	}
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://api.bilibili.com/x/web-interface/dynamic/total"+getpar,
				headers: {
						 'referer' :'http://www.bilibili.com',
						 }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			//console.log(body.toString());
            res.send(body);		
		}else{
			res.send("boy next door!");	
		}
		  
	});
});


router.get('/index/(:json)',function(req, res, next) {
	var json = req.params.json;
	var requestOptions  = { 
				encoding: null,
				method: "GET", 
				url: "http://www.bilibili.com/index/"+json,
				headers: {
					     'Accept-Encoding' : 'gzip',
					     }
				};
	request( requestOptions, function (error, response, body){
		if (!error && response.statusCode == 200) {
			zlib.unzip(body, function(err, buffer) {
             	res.send(buffer.toString());
       		});				
      	}
	});
});

module.exports = router;
