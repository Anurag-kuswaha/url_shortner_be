const {
  shortenUrlService,
  getUrlService,
  getUrlListService,
} = require("../services/URLService");
exports.shortenUrl = async (req, res) => {
  const { statusCode, response } = await shortenUrlService(req.body);
  return res.status(statusCode).send(response);
};

exports.getUrl = async (req, res) => {
  const { statusCode, response } = await getUrlService(
    req.params.short_code,
    req
  );
  return res.status(statusCode).send(response);
};

exports.getUrlList = async (req, res) => {
  let pageSize = req.query.limit ? Number(req.query.limit) : 10;
  let start = req.query.page ? pageSize * (Number(req.query.page) - 1) : 0;
  let query = null;
  const { statusCode, response } = await getUrlListService(
    pageSize,
    start,
    query
  );
  return res.status(statusCode).send(response);
};
