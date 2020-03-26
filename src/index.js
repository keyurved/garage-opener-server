const express = require('express');
const fs = require('fs');
const http = require('http');
const https = require('https');
const cors = require('cors');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const admin = require('firebase-admin');
require('dotenv').config()

admin.initializeApp();

const app = express();
const httpPort = 8080;
const httpsPort = 8443;
let credentials = {};

if (process.env.USE_HTTPS) {
    credentials = {
        key: fs.readFileSync(process.env.HTTPS_KEY),
        cert: fs.readFileSync(process.env.HTTPS_CERT),
    }
}

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(async (req, res, next) => {
    console.log(req);
    if (req.header('X-Auth')) {
        try {
            await admin.auth().verifyIdToken(req.header('X-Auth'));
            next();
        } catch (err) {
            console.error(err);
            res.sendStatus(403);
        }
    } else {
        //next();
	console.log("UNAUTHORIZED");
        res.sendStatus(403);
    }
});

configRoutes(app);

if (process.env.USE_HTTPS) {
    https.createServer(credentials, app).listen(httpsPort, () => {
        console.log(`Listening on https://localhost:${httpsPort}`);
    })
} else {
    http.createServer(app).listen(httpPort, () => {
        console.log(`Listening on http://localhost:${httpPort}`);
    })
}