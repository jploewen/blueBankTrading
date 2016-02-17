import { Router } from 'express';
var request = require('request');
var cors = require('cors');
var tradeURL = (process.env.GWURL || "http://172.16.22.242:8080") + "/Blaze/rest/trades";
export default function() {
	var routes = Router();

	// add middleware here


	routes.get('/index.html', cors(),function(req, res, next){
		var myhtmlpage = '<html><title>Hi There</title><body>Saying Have a nice day :)</body></html>';
		res.send(myhtmlpage);
		next();
		});

	routes.get('/flatline.html', cors(), function(req, res, next){
		var myhtmlpage = '<html><title>Flat Line</title><body><h1>Flat Line</h1><br/>________________________ </body></html>';
		res.send(myhtmlpage);
		next();
	})


	return routes;
}
