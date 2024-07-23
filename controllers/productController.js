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
import ProductSchema from "../models/productSchema.js";
import { productValidation } from "../validations/productValidation.js";

export const createUpdateProduct = asyncHandler(async (req, res, next) => {
  const { error } = productValidation.validate(req.body);
  if (error) {
    return next(new ErrorHandler(400, error.details[0].message));
  }

  const { id } = req.body;

  if (req.files?.gallery_image) {
    const storePath = await uploadFile(
      "product_gallery_image",
      req.files.gallery_image
    );
    req.body.gallery_image = storePath;
  }

  if (req.files?.thumbnail_image) {
    const storePath = await uploadFile(
      "product_thumbnail_image",
      req.files.thumbnail_image
    );
    req.body.thumbnail_image = storePath;
  }

  if (req.files?.pdf_specification) {
    const storePath = await uploadFile(
      "product_pdf_specification",
      req.files.pdf_specification
    );
    req.body.pdf_specification = storePath;
  }

  if (id) {
    const [checkRecord] = await getRecord("product", "id", id);
    // console.log(checkRecord);

    if (!checkRecord) {
      return next(
        new ErrorHandler(400, "Product with this id doest not exist")
      );
    }

    if (req.files?.gallery_image && checkRecord.gallery_image) {
      const fileName = checkRecord.gallery_image;
      await deleteFile(fileName);
    }

    if (req.files?.thumbnail_image && checkRecord.thumbnail_image) {
      const fileName = checkRecord.thumbnail_image;
      await deleteFile(fileName);
    }

    if (req.files?.pdf_specification && checkRecord.pdf_specification) {
      const fileName = checkRecord.pdf_specification;
      await deleteFile(fileName);
    }

    const { query, values } = updateQueryBuilder(ProductSchema, req.body);
    const response = await db.query(query, values);

    if (response.affectedRows > 0) {
      return sendSuccessResponse(res, 200, "Product updated Successfully", 1);
    } else {
      return sendErrorResponse(res, 400, "Product updation Failed");
    }
  }

  const { query, values } = createQueryBuilder(ProductSchema, req.body);
  const response = await db.query(query, values);
  if (response.affectedRows > 0) {
    return sendSuccessResponse(res, 200, "Product Created Successfully", 1);
  } else {
    return sendErrorResponse(res, 400, "Product Creation Failed");
  }
});

export const getAllProduct = asyncHandler(async (req, res, next) => {
  const condition = await whereCondition({
    table: "product ",
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
                category LIKE '%${req.query.search}%' OR
                brand LIKE '%${req.query.search}%' OR
                tags LIKE '%${req.query.search}%' OR

                )
                `
    : "";

  const selectQuery = `SELECT * FROM product WHERE deleted = 0 ${searchCondition} ${condition} `;
  const response = await db.query(selectQuery);

  if (response.length > 0) {
    const totalCountQuery = makeTotalCountQuery(selectQuery);
    const totalCount = await db.query(totalCountQuery);
    return sendSuccessResponse(
      res,
      200,
      "Product Fetched Successfully",
      response,
      totalCount.length
    );
  } else {
    return sendErrorResponse(res, 400, "No Data Found");
  }
});

export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ErrorHandler(400, "id is missing"));
  }

  const [checkRecord] = await getRecord("product", "id", id);

  if (!checkRecord) {
    return next(new ErrorHandler(400, "Product with this id doest not exist"));
  }

  if (checkRecord?.gallery_image) {
    const fileName = checkRecord.gallery_image;
    await deleteFile(fileName);
  }

  if (checkRecord?.thumbnail_image) {
    const fileName = checkRecord.thumbnail_image;
    await deleteFile(fileName);
  }

  if (checkRecord?.pdf_specification) {
    const fileName = checkRecord.pdf_specification;
    await deleteFile(fileName);
  }

  const { query, values } = updateQueryBuilder(ProductSchema, {
    deleted: 1,
    gallery_image: null,
    thumbnail_image: null,
    pdf_specification: null,
    id,
  });

  const response = await db.query(query, values);
  if (response.affectedRows > 0) {
    return sendSuccessResponse(res, 200, "Product deleted Successfully");
  } else {
    return sendErrorResponse(res, 400, "Product Deletion Failed");
  }
});
