var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');
var config = require('../config.js');
var pool = mysql.createPool(config.MYSQL);

router.post('/racing',function(req, res, next){
	var PAGE_SIZE = 20;
	if(req.cookies.driver != "666666")
	{
		 res.send({
		      code: -403,
		      result: 'out'
		 });
		 return;
	}
	var argument = req.body;
	var sqlwhere = "where 1=1";
    var ordersql = ' order by hot desc';
    var table = "seed_link";
    if (typeof argument.page == 'undefined') {
      argument.page = 1;
    }
    var sqlarg = [(argument.page - 1) * PAGE_SIZE];
    if (argument.keyword && (typeof argument.keyword != 'undefined')) {
      console.log('关键字:'+argument.keyword);
      console.log(req.cookies);
      sqlwhere += ' and name like ' + pool.escape('%' + argument.keyword + '%');
       var sqls = {
	      'selectSQL': 'select * from ' + table + ' ' + sqlwhere + ordersql +
	        " limit ?," +
	        PAGE_SIZE,
	      'countSQL': 'select count(id) count from ' + table + '  ' + sqlwhere
	    };

	    var tasks = {
	      select: function(callback) {
	        pool.query(sqls['selectSQL'], sqlarg, function(err, res) {
	          callback(err, res);
	        });
	      },
	      count: function(callback) {
	        pool.query(sqls['countSQL'], function(err, res) {
	          callback(err, res);
	        });
	      }
	    };
	    async.series(tasks, function(err, rets) {
	      if (err) {
	        console.error(err);
	        console.log(sqls);
	        res.send({
		      code: -400,
		      result: 'out'
		    });
	      } else {
	        var realret = {
	          list: rets.select,
	          total: rets.count[0].count,
	          pages: Math.ceil(rets.count[0].count / PAGE_SIZE)
	        }
	        res.send({
		      code: 0,
		      result: realret
		    });
	      }

	    });
    }
    else
    {
    	res.send({
	      code: -400,
	      result: 'out'
	    });
    }

});
module.exports = router;