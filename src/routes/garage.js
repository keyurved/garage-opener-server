const router = require('express').Router();
const fetch = require('node-fetch');
const openerConfig = require('../../config/opener-config.json');
const headers = {
    'X-Auth': openerConfig.key
};

const TIMEOUT = 10000;

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const url = `${openerConfig.base_url}/garage/${id}`;

    try {
        let result = await fetch(url, { method: 'GET', headers: headers, timeout: TIMEOUT});
        let data = await result.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.statusMessage = `Could not connect to Garage ${id}`;
        res.status(400).end();
    }
});

router.post('/open/:id', async (req, res) => {
    const id = req.params.id;
    const url = `${openerConfig.base_url}/open/${id}`;

    try {
        let result = await fetch(url, { method: 'POST', headers: headers, timeout: TIMEOUT});
        let data = await result.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.statusMessage = `Could not connect to Garage ${id}`;
        res.status(400).end();
    }
});

router.post('/close/:id', async (req, res) => {
    const id = req.params.id;
    const url = `${openerConfig.base_url}/close/${id}`;

    try {
        let result = await fetch(url, { method: 'POST', headers: headers, timeout: TIMEOUT});
        let data = await result.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.statusMessage = `Could not connect to Garage ${id}`;
        res.status(400).end();
    }
});

module.exports = router;