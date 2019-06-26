const router = require('express').Router();
const fetch = require('node-fetch');
const openerConfig = require('../../config/opener-config.json');
const headers = {
    'X-Auth': openerConfig.key
};

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const url = `${openerConfig.base_url}/garage/${id}`;

    try {
        let result = await fetch(url, { method: 'GET', headers: headers})
        let data = await result.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/open/:id', async (req, res) => {
    const id = req.params.id;
    const url = `${openerConfig.base_url}/open/${id}`;

    try {
        let result = await fetch(url, { method: 'POST', headers: headers})
        let data = await result.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post('/close/:id', async (req, res) => {
    const id = req.params.id;
    const url = `${openerConfig.base_url}/close/${id}`;

    try {
        let result = await fetch(url, { method: 'POST', headers: headers})
        let data = await result.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;