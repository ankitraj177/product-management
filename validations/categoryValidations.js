import Joi from "joi";

export const createUpdateCategoryValidation = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Category Name is required",
    "string.empty": "Category Name must not be empty",
  }),
  description: Joi.string().optional().messages({
    "string.empty": "Description must not be empty",
  }),
}).options({ allowUnknown: true });
