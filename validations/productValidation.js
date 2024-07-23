import Joi from "joi";

export const productValidation = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Product Name is required",
    "string.empty": "Product Name must not be empty",
  }),
  category: Joi.string().required().messages({
    "any.required": "category Name is required",
    "string.empty": "category Name must not be empty",
  }),
  min_purchase: Joi.number().required(),
  // tags: Joi.array().items(Joi.string()).default([]),
  description: Joi.string().optional().messages({
    "string.empty": "Description must not be empty",
  }),
  unit_price: Joi.number().required(),
  discount: Joi.number().required(),
  quantity: Joi.number().required(),

}).options({ allowUnknown: true });
