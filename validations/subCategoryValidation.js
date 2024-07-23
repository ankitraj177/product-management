import Joi from "joi";

export const createUpdateSubCategoryValidation = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Sub Category name is required",
    "string.empty": "Sub Category name must not be empty",
  }),
  category_id: Joi.number().required().messages({
    "any.required": "Category id is required",
    "string.empty": "Category id must not be empty",
  }),
  description: Joi.string().optional().messages({
    "string.empty": "Description must not be empty",
  }),
}).options({ allowUnknown: true });
