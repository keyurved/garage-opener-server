const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const admin = require('firebase-admin');

admin.initializeApp();

const app = express();
const port = 8080;

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

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})
