const db = require("../sequelize/models");
const getUrlAnalyticsService = async (url_id, pageSize, start, query = null) => {
  try {
    console.log("coming over here with query ", query);
    console.log("start is", start);
    console.log("pageSize is", pageSize);
   
    const dbData = await db.Analytics.findAll({
      where: {
        urlId:url_id,
      },
      order: [["createdAt", "DESC"]],
      offset: start,
      limit: pageSize,
      attributes: ["id", "createdAt", "ip", "user_agent", "timestamp", "urlId"],
    });
    const totalCount = await db.Analytics.count({ where: { urlId:url_id, } });
    //console.log('dbData is', dbData);
    if (!dbData) {
      return {
        statusCode: 400,
        response: { msg: `No Record found for the query`, error: true },
      };
    }
    const urlDetails = await db.Urls.findOne( {where:{id:url_id}, raw:true})
    return {
      statusCode: 200,
      response: {
        data: dbData,
        details:urlDetails,
        totalCount,
        currentCount: dbData.length,
        error: false,
      },
    };
  } catch (e) {
    console.log("eror occured", e);
    return {
      statusCode: 500,
      response: { error: true, msg: "Internal Server Error" },
    };
  }
};

module.exports = {
  getUrlAnalyticsService,
};
