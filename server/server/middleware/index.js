import { Router } from 'express';
var request = require('request');
var cors = require('cors');
var tradeURL = (process.env.GWURL || "http://172.16.22.242:8080") + "/Blaze/rest/trades";
export default function() {
	var routes = Router();

	// add middleware here


	routes.get('/api/v1', cors(),function(req, res, next){

		res.send("Not defined");
		});


	routes.get('/api/v1/trades', function(req, res, next){
		//var opts = {url: 'http://172.16.22.17/trade/app'};
		console.log("Sending request to ", tradeURL);
		var opts = {
			url:tradeURL+'/details',
			json: true
		}
		console.log("/api/v1/trades About to request trades");
		request(opts, function(err, resp, body){
			if(!err && resp.statusCode === 200){
				console.log("Sucess!");
				var trades = body.allTasks;
				console.log("trades: ", trades);
				if(!res.headerSent){
					var json = {"trades": trades};
					res.status(200).json(json);
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


	routes.get('/api/v1/trades/:id', cors(), function(req, res, next){
			var holdingID = "54";

			if( req.params && req.params.hasOwnProperty( "id" ) ) {

				holdingID = req.params.id;
			}
			console.log("/api/v1/trades/ " + holdingID);
			console.log("Sending request to ", tradeURL);
			var opts = {
				url: tradeURL+'/details?holdingID=' + holdingID,
				json: true
			}

			request(opts, function(err, resp, body){
				if(!err && resp.statusCode === 200){
					console.log("Sucess!");
					var holding = body.TASK;
					var json = {"trade": holding};
					if(!res.headerSent){
						res.status(200).json(json);
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

		routes.post('/api/v1/trades/buy', cors(),function(req,res,next){
			console.log("Sending request to ", tradeURL);
			if(!req.hasOwnProperty('body')){
				console.error("Required post attributes missing");
				next();
			}
			else if(!req.body.amount && !req.body.symbol){
				console.error("Need required post attributes symbol and amount");
				next();
			}

			var opts = {
				url: tradeURL+"/buy",
				json: true,
				body: req.body,
				method: "post",
				headers: {
					"Content-Type": "application/json"
				}
			}
			request(opts, function(err, res, body){
				if(!err && res.statusCode === 200){
					console.log("Success buying trade");
					var json = body;
					console.log("RET: ", json);
					res.status(200).json(json);
					next();
					return;
				}
				console.error("Problem buying trade: ", err);
				res.status(500).send({"result": 1, "resultMessage": "Failed to buy trade"})
			})
		})

	return routes;
}
