const express = require('express');
const router = express.Router();
const UrlController = require('../controllers/URLController');
const requestIp = require('request-ip');
router.post('/shorten', UrlController.shortenUrl);
router.get('/shortUrl/:short_code', requestIp.mw(), UrlController.getUrl);
router.get('/urls', UrlController.getUrlList);

module.exports = router;