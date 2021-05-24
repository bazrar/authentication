const joi = require('joi');

exports.registerValidation = (data) => {
  const schema = joi.object({
    name: joi.string().min(6).max(30).required(),
    email: joi.string().min(6).max(255).email().required(),
    password: joi.string().min(6).max(1024).required(),
  });
  return schema.validateAsync(data);
};

exports.loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().min(6).max(255).email().required(),
    password: joi.string().min(6).max(1024).required(),
  });
  return schema.validateAsync(data);
};
