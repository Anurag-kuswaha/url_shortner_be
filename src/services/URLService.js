const db = require("../sequelize/models");
const { v4: uuidv4, validate } = require("uuid");
const { Op } = require("sequelize");
const { ValidateURLSchema, generateShortenCode } = require("../utils/URLUtils");

const getUrlService = async (short_code, req) => {
  try {
    console.log("actual short_code is ", short_code);
    const url = await db.Urls.findOne({ where: { short_code: short_code.toString() } });

    if (!url)
      return {
        statusCode: 404,
        response: {
          msg: "URL not found",
          error: true,
        },
      };
    url.clicks++;
    await url.save();
    const new_id = uuidv4();
    await db.Analytics.create({
      id: new_id,
      urlId: url.id,
      ip: req.clientIp,
      user_agent: req.headers["user-agent"],
    });

    return {
      statusCode: 301,
      response: {
        url: url.original_url,
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

const shortenUrlService = async (body) => {
  try {
    console.log("body is ", body);
    console.log(body);
    const { error } = ValidateURLSchema({ ...body });

    if (error) {
      return {
        response: { msg: error.details[0].message, error: true },
        statusCode: 400,
      };
    }
    console.log("db", db);
    const isUrlExists = await db.Urls.findOne({
      where: { original_url: body.url },
    });
    if (isUrlExists) {
      return {
        statusCode: 409,
        response: { error: true, msg: "Url already exists" },
      };
    }
    let urlsCount = await db.Urls.count();
    let short_code = generateShortenCode(urlsCount);
    const dbData = await db.Urls.create({
      id: urlsCount + 1,
      original_url: body.url,
      short_code: short_code,
    });
    return {
      statusCode: 200,
      response: { data: dbData, error: false },
    };
  } catch (e) {
    console.log("eror occured", e);
    return {
      statusCode: 500,
      response: { error: true, msg: "Internal Server Error" },
    };
  }
};

const getUrlListService = async (pageSize, start,query=null) => {
  try {
    console.log('coming over here with query ', query);
    console.log('start is', start);
    console.log('pageSize is', pageSize);
    const dbQuery = {}
    if(query){
       // form  a query if present
    }
    console.log('dbQuery query is ', dbQuery);
    const dbData = await db.Urls.findAll({
        where: {
           ...dbQuery
        },
        order: [['createdAt', 'DESC']],
        offset: start,
        limit: pageSize,
        attributes: ['id', 'createdAt', 'short_code', 'original_url', 'clicks'],

    });
    const totalCount = await db.Urls.count({where : {...dbQuery}});
    //console.log('dbData is', dbData);
    if (!dbData) {
        return {
            statusCode: 400,
            response: { msg: `No Record found for the query`, error: true }
        }

    }
    return {
        statusCode: 200,
        response: { data: dbData, totalCount, currentCount: dbData.length, error: false }
    }

}
catch (e) {
    console.log('eror occured', e);
    return {
        statusCode: 500,
        response: { error: true, msg: 'Internal Server Error' }
    }
}
}

module.exports = {
  shortenUrlService,
  getUrlService,
  getUrlListService,
};
