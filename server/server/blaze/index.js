import { Router } from 'express';
//import facets from './facets';
import request from 'request';
import cors from 'cors';

export default function() {
	//var tradeURL = (process.env.GWURL || "http://127.0.0.1:8080") + "/Blaze/rest/trades";
	var Blaze = Router();

	// mount the facets resource
	//blaze.use('/facets', facets);

	// perhaps expose some API metadata at the root
	Blaze.get('/', (req, res) => {
		res.json({
			version : '1.0'
		});
	});

  Blaze.get('/rest/trades',cors(), function(req, res, next){
    var json = {
       "about": "http://bbtrading.stage1.mybluemix.net:80/Blaze/rest/trades",
       "details": "http://bbtrading.stage1.mybluemix.net:80/Blaze/rest/trades/details"
    };
    if(!res.headersSent){
      res.status(200).json(json);

    }
		return;


  });

  Blaze.get('/rest/trades/details',cors(), function(req,res,next){
    var json = {
       "about": "http://bbtrading.stage1.mybluemix.net:80/Blaze/rest/trades/details",
       "allTasks": [
          {
             "company": "Random Corp. Inc",
             "currentPrice": 36.52706878238702,
             "gainLoss": "loss",
             "high": 48.23490115289704,
             "low": 36.52706878238702,
             "numGainLoss": 11.707832370510019,
             "openPrice": 48.23490115289704,
             "percGainLoss": 75.72746685351747,
             "symbol": "RCI",
             "volume": 800339
          },
          {
             "company": "Random Corp. Inc",
             "currentPrice": 9.728488142423375,
             "gainLoss": "loss",
             "high": 51.641045716880484,
             "low": 9.728488142423375,
             "numGainLoss": 41.91255757445711,
             "openPrice": 51.641045716880484,
             "percGainLoss": 18.8386737862733,
             "symbol": "RCI",
             "volume": 3639010
          },
          {
             "company": "Random Corp. Inc",
             "currentPrice": 30.984648095162893,
             "gainLoss": "loss",
             "high": 35.45075126257423,
             "low": 30.984648095162893,
             "numGainLoss": 4.466103167411337,
             "openPrice": 35.45075126257423,
             "percGainLoss": 87.40195056987056,
             "symbol": "RCI",
             "volume": 4786280
          },
          {
             "company": "Random Corp. Inc",
             "currentPrice": 39.78852635100096,
             "gainLoss": "loss",
             "high": 96.1005644118608,
             "low": 39.78852635100096,
             "numGainLoss": 56.31203806085984,
             "openPrice": 96.1005644118608,
             "percGainLoss": 41.40301005983502,
             "symbol": "RCI",
             "volume": 2981398
          },
          {
             "company": "Random Corp. Inc",
             "currentPrice": 20.365687614564564,
             "gainLoss": "loss",
             "high": 65.24451910387816,
             "low": 20.365687614564564,
             "numGainLoss": 44.8788314893136,
             "openPrice": 65.24451910387816,
             "percGainLoss": 31.214403744994453,
             "symbol": "RCI",
             "volume": 712179
          }
       ],
       "schemaGET": "http://bbtrading.stage1.mybluemix.net:80/Blaze/rest/trades/details/schemaGET"
    }
    if(!res.headersSent){
      res.status(200).json(json);

    }

  });

  Blaze.post('/rest/trades/buy',cors(), function(req,res,next){
    if(!res.headersSent){
      res.status(200).json({"result": 0,"orderID": 31666,"orderStatus": "Success",
      "resultLabel": "Success buying trade"});
    }

  })
  return Blaze;
}
