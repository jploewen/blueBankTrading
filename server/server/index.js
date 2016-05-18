import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './db';
import middleware from './middleware';
import api from './api';
import blaze from './blaze';
import path from 'path';
import images from './images';

var app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors({
	exposedHeaders: ['Link']
}));

app.use(bodyParser.json({
	limit : '100kb'
}));

// connect to db
db( λ => {
	// internal middleware
	app.use(middleware());

	// api router
	app.use('/api', api());
	app.use('/Blaze', blaze());
	app.use("/",express.static(path.join(__dirname, 'client')));
	app.use('/images', images());
	app.server.listen(process.env.PORT || 8080);

	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
