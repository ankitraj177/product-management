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
import SubCategorySchema from "../models/subCategorySchema.js";
import { createUpdateSubCategoryValidation } from "../validations/subCategoryValidation.js";

export const createUpdateSubCategory = asyncHandler(async (req, res, next) => {
  const { error } = createUpdateSubCategoryValidation.validate(req.body);

  if (error) {
    return next(new ErrorHandler(400, error.details[0].message));
  }

  const { id } = req.body;

  if (req.files?.image) {
    const storePath = await uploadFile("sub_category_image", req.files.image);
    req.body.image = storePath;
  }

  if (id) {
    const checkRecord = await getRecord("sub_category", "id", id);

    if (checkRecord.length === 0) {
      return next(
        new ErrorHandler(400, "Sub Category with this id doest not exist")
      );
    }
    if (req.files?.image && checkRecord[0].image) {
      const fileName = checkRecord[0].image;
      await deleteFile(fileName);
    }
    const { query, values } = updateQueryBuilder(SubCategorySchema, req.body);
    const response = await db.query(query, values);

    if (response.affectedRows > 0) {
      return sendSuccessResponse(res, 200, "Sub Category Updated Successfully");
    } else {
      return sendErrorResponse(res, 400, "Sub Category Updation Failed");
    }
  }

  const { query, values } = createQueryBuilder(SubCategorySchema, req.body);
  const response = await db.query(query, values);

  if (response.affectedRows > 0) {
    return sendSuccessResponse(
      res,
      200,
      "Sub Category Created Successfully",
      1
    );
  } else {
    return sendErrorResponse(res, 400, "Sub Category Creation Failed");
  }
});

export const getAllSubCategory = asyncHandler(async (req, res, next) => {
  const condition = await whereCondition({
    table: "sub_category",
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
                name LIKE '%${req.query.search}%' OR
                category_id LIKE '%${req.query.search}%' 
                )
                `
    : "";

  const selectQuery = `SELECT * FROM sub_category WHERE deleted = 0 ${searchCondition} ${condition} `;
  const response = await db.query(selectQuery);
  if (response.length > 0) {
    const totalCountQuery = makeTotalCountQuery(selectQuery);
    const totalCount = await db.query(totalCountQuery);
    return sendSuccessResponse(
      res,
      200,
      "Sub Category Fetched Successfully",
      response,
      totalCount.length
    );
  } else {
    return next(new ErrorHandler(400, "No data found"));
  }
});

export const deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler(400, "id is missing"));
  }
  const checkRecord = await getRecord("sub_category", "id", id);
  if (checkRecord.length === 0) {
    return next(
      new ErrorHandler(400, "Sub Category with this id doest not exist")
    );
  }

  if (checkRecord[0].image) {
    const fileName = checkRecord[0].image;
    await deleteFile(fileName);
  }

  const { query, values } = updateQueryBuilder(SubCategorySchema, {
    deleted: 1,
    image: null,
    id,
  });

  const response = await db.query(query, values);

  if (response.affectedRows > 0) {
    return sendSuccessResponse(res, 200, "Sub Category deleted Successfully");
  } else {
    return next(new ErrorHandler(400, "Sub Category Deletion Failed"));
  }
});
