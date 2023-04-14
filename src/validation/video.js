import Joi from "joi";

const UPLOADVIDEO = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(500).required(),
    mimetype: Joi.string().valid("video/mp4").required(),
    size: Joi.number().max(52428800).label("size must be less 50Mb").required(),
  });
  return schema.validate(data);
};
const UPDATEVIDEO = (data) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    title: Joi.string().min(3).max(500).required(),
  });
  return schema.validate(data);
};

export default {
  UPLOADVIDEO,
  UPDATEVIDEO,
};
