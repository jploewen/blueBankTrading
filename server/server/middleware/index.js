import { Router } from 'express';
var request = require('request');

export default function() {
	var routes = Router();

	// add middleware here

	routes.get('/api/v1', function(req, res, next){

		res.send("Not defined");
	});


		routes.get('/api/v1/trades', function(req, res, next){
		//var opts = {url: 'http://172.16.22.17/trade/app'};
		var opts = {
			url: 'http://cap-sg-stage-3.integration.ibmcloud.com:15324/Blaze/rest/trades/details?limit=10',
			json: true
		}
		console.log("Sending request for trades");
		request(opts, function(err, resp, body){
			if(!err){
				console.log("Sucess!");
				var trades = body.allTasks;
				console.log("trades: ", trades);
				if(!res.headerSent){
					res.status(200).json(body);
					return;
				}
				else{
					console.error("Headers already sent");
				}
			}
			console.log("Error ", err);
			res.status(500).send("Error "+ err);
		});


	});

/*
	routes.get('/api/v1/trades/:id', function(req, res, next){
			var holdingID = "54";
			if( req.params && req.params.hasOwnProperty( "id" ) ) {
				holdingID = req.params.id;
			}
			var opts = {
				url: 'http://cap-sg-stage-3.integration.ibmcloud.com:15324/Blaze/rest/trades/details?holdingID=' + holdingID,
				json: true
			}
			console.log("Sending request for trade " + holdingID);
			request(opts, function(err, resp, body){
				if(!err && resp.statusCode === 200){
					console.log("Sucess!");
					var holding = body.TASK;
					if(!res.headerSent){
						res.status(200).json(holding);
						return;
					}
					else {
						console.error("Headers already sent");
					}
				}
				console.log("Error ", err);
				res.status(500).send("Error "+ err);
			});


		});
*/

	return routes;
}
