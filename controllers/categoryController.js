import db from "../db.js";
import ErrorHandler from "../helpers/errorHandler.js";
import {
  createQueryBuilder,
  deleteFile,
  getRecord,
  makeTotalCountQuery,
  sendErrorResponse,
  sendSuccessResponse,
  updateQueryBuilder,
  uploadFile,
  whereCondition,
} from "../helpers/general.js";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import CategorySchema from "../models/categorySchema.js";
import { createUpdateCategoryValidation } from "../validations/categoryValidations.js";

export const createUpdateCategory = asyncHandler(async (req, res, next) => {
  const { error } = createUpdateCategoryValidation.validate(req.body);

  if (error) {
    return next(new ErrorHandler(400, error.details[0].message));
  }

  const { id } = req.body;

  if (req.files?.image) {
    const storePath = await uploadFile("category_image", req.files.image);
    req.body.image = storePath;
  }

  if (id) {
    const checkRecord = await getRecord("category", "id", id);

    if (checkRecord.length === 0) {
      return next(
        new ErrorHandler(400, "Category with this id doest not exist")
      );
    }

    if (req.files?.image && checkRecord[0].image) {
      const fileName = checkRecord[0].image;
      await deleteFile(fileName);
    }
    const { query, values } = updateQueryBuilder(CategorySchema, req.body);
    const response = await db.query(query, values);

    if (response.affectedRows > 0) {
      return sendSuccessResponse(res, 200, "Category Updated Successfully");
    } else {
      return sendErrorResponse(res, 400, "Category Updation Failed");
    }
  }

  const { query, values } = createQueryBuilder(CategorySchema, req.body);
  const response = await db.query(query, values);

  if (response.affectedRows > 0) {
    return sendSuccessResponse(res, 200, "Category Created Successfully");
  } else {
    return sendErrorResponse(res, 400, "Category Creation Failed");
  }
});

export const getAllCategory = asyncHandler(async (req, res, next) => {
  const condition = await whereCondition({
    table: "category",
    page: req.query.page,
    all: req.query.all,
    pageSize: req.query.pageSize,
    filter: req.query.filter,
    id: req.params.id,
    user: req.user,
  });

  const searchCondition = req.query.search
    ? `
                AND (
                name LIKE '%${req.query.search}%'
                )
                `
    : "";

  const selectQuery = `SELECT * FROM category WHERE deleted = 0 ${searchCondition} ${condition} `;
  const response = await db.query(selectQuery);

  if (response.length > 0) {
    const totalCountQuery = makeTotalCountQuery(selectQuery);
    const totalCount = await db.query(totalCountQuery);
    console.log("totalCount",totalCount.length)
    return sendSuccessResponse(
      res,
      200,
      "Category Fetched Successfully",
      response,
      totalCount.length
    );
  } else {
    return next(new ErrorHandler(400, "No data found"));
  }
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler(400, "id is missing"));
  }
  const checkRecord = await getRecord("category", "id", id);
  if (checkRecord.length === 0) {
    return next(new ErrorHandler(400, "Category with this id doest not exist"));
  }

  if (checkRecord[0].image) {
    const fileName = checkRecord[0].image;
    await deleteFile(fileName);
  }

  const { query, values } = updateQueryBuilder(CategorySchema, {
    deleted: 1,
    image: null,
    id,
  });

  const response = await db.query(query, values);

  if (response.affectedRows > 0) {
    return sendSuccessResponse(res, 200, "Category deleted Successfully");
  } else {
    return next(new ErrorHandler(400, "Category Deletion Failed"));
  }
});
