import { Router } from 'express';
var request = require('request');

export default function() {
	var routes = Router();

	// add middleware here
	routes.get('/' ,function(req, res, next){
		res.json({data: "hi there"});
	})

	routes.get('/api/v1', function(req, res, next){

		res.send("Not defined");
		});


	routes.get('/api/v1/trades', function(req, res, next){
		var opts = {url: 'http://172.16.22.17/trade/app'};

		request(opts, function(err, resp, body){
			if(!err && resp.statusCode === 200){
				console.log("Sucess!");
				res.status(200).send("I got data " + body);
			}
			console.log("Error ", err);
			res.status(500).send("Error "+ err);
		});

		
	});


	return routes;
}
