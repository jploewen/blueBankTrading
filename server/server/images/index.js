import { Router } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';


export default function() {
	var pngsrc = (process.env.PNG_SRC || "money.png");
	var images = Router();


	// perhaps expose some API metadata at the root
	images.get('/money.png', (req, res) => {
    console.log("serving image: ", pngsrc);
    var img = fs.readFileSync(path.resolve(__dirname,pngsrc));
     res.writeHead(200, {'Content-Type': 'image/png' });
     res.end(img, 'binary');
		//res.render();
	});

  return images;
  }
