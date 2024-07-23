import { Router } from "express";
import {
  createUpdateSubCategory,
  deleteSubCategory,
  getAllSubCategory,
} from "../controllers/subCategoryController.js";

const SubCategoryRouter = Router();

/**
 * @swagger
 * tags:
 *   name: SubCategory
 *   description: Operations about SubCategories
 */

/**
 * @swagger
 * definitions:
 *   SubCategory:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       category_id:
 *         type: integer
 *       image:
 *         type: string
 *       created_at:
 *         type: string
 *         format: date-time
 *       updated_at:
 *         type: string
 *         format: date-time
 *       deleted:
 *         type: integer
 */

/**
 * @swagger
 * /api/sub-category/create-update-sub-category:
 *   post:
 *     summary: Create or Update a SubCategory
 *     tags: [SubCategory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/SubCategory'
 *     responses:
 *       200:
 *         description: SubCategory created or updated successfully
 *       400:
 *         description: Invalid request or missing required fields
 */

SubCategoryRouter.post(
  "/create-update-sub-category",
  createUpdateSubCategory
);

/**
 * @swagger
 * /api/sub-category/get-all-sub-category:
 *   get:
 *     summary: Retrieve all SubCategories
 *     tags: [SubCategory]
 *     responses:
 *       200:
 *         description: A list of SubCategories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/SubCategory'
 */

SubCategoryRouter.get("/get-all-sub-category", getAllSubCategory);

/**
 * @swagger
 * /api/sub-category/get-sub-category/:id:
 *   get:
 *     summary: Retrieve a single SubCategory by ID
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the SubCategory to fetch
 *     responses:
 *       200:
 *         description: A single SubCategory object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/SubCategory'
 *       404:
 *         description: SubCategory not found
 */

SubCategoryRouter.get("/get-sub-category/:id", getAllSubCategory);

/**
 * @swagger
 * /api/sub-category/delete-sub-category/:id:
 *   delete:
 *     summary: Delete a SubCategory by ID
 *     tags: [SubCategory]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the SubCategory to delete
 *     responses:
 *       200:
 *         description: SubCategory deleted successfully
 *       404:
 *         description: SubCategory not found
 */

SubCategoryRouter.delete("/delete-sub-category/:id", deleteSubCategory);

export default SubCategoryRouter;
