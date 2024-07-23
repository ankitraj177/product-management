/**
 * @swagger
 * tags:
 *   name: Category
 *   description: API endpoints for managing categories
 */

import { Router } from "express";
import { createUpdateCategory, deleteCategory, getAllCategory } from "../controllers/categoryController.js";

const CategoryRouter = Router();

/**
 * @swagger
 * /api/category/create-update-category:
 *   post:
 *     summary: Create or update a category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Category created or updated successfully
 *       '400':
 *         description: Bad request, category creation/update failed
 */
CategoryRouter.post("/create-update-category", createUpdateCategory);

/**
 * @swagger
 * /api/category/get-all-category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       '200':
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       '404':
 *         description: No categories found
 */
CategoryRouter.get("/get-all-category", getAllCategory);

/**
 * @swagger
 * /api/category/get-category/:id:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A category object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Category not found
 */
CategoryRouter.get("/get-category/:id", getAllCategory);

/**
 * @swagger
 * /api/category/delete-category/:id:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *       '404':
 *         description: Category not found
 */
CategoryRouter.delete("/delete-category/:id", deleteCategory);

export default CategoryRouter;
