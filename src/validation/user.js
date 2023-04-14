import Joi from "joi";

const POST = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  return schema.validate(data);
};

const UPLOAD = (data) => {
  const schema = Joi.object({
    mimetype: Joi.string()
      .valid("image/jpeg", "image/jpg", "image/png", "image/svg")
      .required(),
    size: Joi.number().max(5242880).required(),
  });
  return schema.validate(data);
};

const LOGIN = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });
  return schema.validate(data);
};

export default {
  POST,
  UPLOAD,
  LOGIN,
};
