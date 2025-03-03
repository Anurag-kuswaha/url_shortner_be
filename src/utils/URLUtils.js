const Joi = require("joi");
var base62 = require("base62/lib/ascii");
/**
 *@function ValidateURLSchema: used for validation of the url Schema
 */
const ValidateURLSchema = (url) => {
  const urlSchema = Joi.object({
    url: Joi.string().required().uri(),
  });
  return urlSchema.validate(url);
};

const generateShortenCode = (id) => {
  return base62.encode(id);
};
module.exports = {
  ValidateURLSchema,
  generateShortenCode,
};
