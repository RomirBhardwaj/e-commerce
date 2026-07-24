const Joi = require("joi");
const apiError = require("../utils/api.error");

const validation = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      throw new apiError(error.message,400)
    }

    req.body = value;
    next();
  };
};

module.exports = validation;