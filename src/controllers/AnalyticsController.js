const {
    getUrlAnalyticsService,
  } = require("../services/AnalyticsService.js");

  
  exports.getUrlAnalytics = async (req, res) => {
    let url_id = req.params.url_id;
    if (!url_id){
      res.status(400).send({error:true, msg:'url_id is required'});
    }
    let pageSize = req.query.limit ? Number(req.query.limit) : 10;
    let start = req.query.page ? pageSize * (Number(req.query.page) - 1) : 0;
    let query = null;
    const { statusCode, response } = await getUrlAnalyticsService(
      url_id,
      pageSize,
      start,
      query
    );
    return res.status(statusCode).send(response);
  };
  