const express = require('express');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
})

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(async (req, res, next) => {
    if (req.body.idToken) {
        try {
            let decoded = await admin.auth().verifyIdToken(req.body.idToken);
            console.log(decoded);
        } catch (err) {
            console.error(err);
        }
        next();
    } else {
        //next();
        res.sendStatus(403);
    }
});

configRoutes(app);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})
