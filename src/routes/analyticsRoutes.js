const express = require('express');
const router = express.Router();
const {getUrlAnalytics} = require('../controllers/AnalyticsController');


router.get('/analytics/:url_id', getUrlAnalytics);

module.exports = router;