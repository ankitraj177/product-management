import { Router } from "express";
import { createUpdateProduct, deleteProduct, getAllProduct } from "../controllers/productController.js";

const ProductRouter = Router();

/**
 * @swagger
 * /api/product/create-update-product:
 *   post:
 *     summary: Create or update a product
 *     tags: 
 *       - Products
 *     requestBody:
 *       description: Product object to be created or updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               brand:
 *                 type: string
 *               unit:
 *                 type: integer
 *               min_purchase:
 *                 type: integer
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               low_stock_warning:
 *                 type: integer
 *               gallery_image:
 *                 type: string
 *               thumbnail_image:
 *                 type: string
 *               video_provider:
 *                 type: string
 *                 enum: [Youtube, DailyMotion, Vimeo]
 *               video_link:
 *                 type: string
 *               product_variation_colors:
 *                 type: string
 *               product_variation_attributes:
 *                 type: string
 *               unit_price:
 *                 type: number
 *               discount_date_from:
 *                 type: string
 *                 format: date
 *               discount_date_to:
 *                 type: string
 *                 format: date
 *               discount:
 *                 type: number
 *               discount_type:
 *                 type: string
 *                 enum: [FLAT, PERCENTAGE]
 *               quantity:
 *                 type: integer
 *               sku:
 *                 type: string
 *               description:
 *                 type: string
 *               pdf_specification:
 *                 type: string
 *               meta_title:
 *                 type: string
 *               meta_description:
 *                 type: string
 *               meta_image:
 *                 type: string
 *               stock_visibility:
 *                 type: string
 *                 enum: [SHOW_STOCK_QUANTITY, SHOW_STOCK_WITH_TEXT_ONLY, HIDE_STOCK]
 *               cash_on_delivery:
 *                 type: boolean
 *               featured:
 *                 type: boolean
 *               todays_deal:
 *                 type: boolean
 *               flash_deal_title:
 *                 type: string
 *               flash_deal_discount:
 *                 type: number
 *               flash_deal_discount_type:
 *                 type: string
 *                 enum: [FLAT, PERCENTAGE]
 *               shipping_days:
 *                 type: integer
 *               tax:
 *                 type: number
 *               tax_type:
 *                 type: string
 *                 enum: [FLAT, PERCENTAGE]
 *               created_at:
 *                 type: string
 *                 format: date-time
 *               updated_at:
 *                 type: string
 *                 format: date-time
 *               deleted:
 *                 type: integer
 *                 enum: [0, 1]
 *     responses:
 *       '200':
 *         description: Successfully created or updated product
 */
ProductRouter.post("/create-update-product", createUpdateProduct);

/**
 * @swagger
 * /api/product/get-all-product:
 *   get:
 *     summary: Retrieve all products
 *     tags: 
 *       - Products
 *     responses:
 *       '200':
 *         description: A list of products
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               brand:
 *                 type: string
 *               unit:
 *                 type: integer
 *               min_purchase:
 *                 type: integer
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               low_stock_warning:
 *                 type: integer
 *               gallery_image:
 *                 type: string
 *               thumbnail_image:
 *                 type: string
 *               video_provider:
 *                 type: string
 *                 enum: [Youtube, DailyMotion, Vimeo]
 *               video_link:
 *                 type: string
 *               product_variation_colors:
 *                 type: string
 *               product_variation_attributes:
 *                 type: string
 *               unit_price:
 *                 type: number
 *               discount_date_from:
 *                 type: string
 *                 format: date
 *               discount_date_to:
 *                 type: string
 *                 format: date
 *               discount:
 *                 type: number
 *               discount_type:
 *                 type: string
 *                 enum: [FLAT, PERCENTAGE]
 *               quantity:
 *                 type: integer
 *               sku:
 *                 type: string
 *               description:
 *                 type: string
 *               pdf_specification:
 *                 type: string
 *               meta_title:
 *                 type: string
 *               meta_description:
 *                 type: string
 *               meta_image:
 *                 type: string
 *               stock_visibility:
 *                 type: string
 *                 enum: [SHOW_STOCK_QUANTITY, SHOW_STOCK_WITH_TEXT_ONLY, HIDE_STOCK]
 *               cash_on_delivery:
 *                 type: boolean
 *               featured:
 *                 type: boolean
 *               todays_deal:
 *                 type: boolean
 *               flash_deal_title:
 *                 type: string
 *               flash_deal_discount:
 *                 type: number
 *               flash_deal_discount_type:
 *                 type: string
 *                 enum: [FLAT, PERCENTAGE]
 *               shipping_days:
 *                 type: integer
 *               tax:
 *                 type: number
 *               tax_type:
 *                 type: string
 *                 enum: [FLAT, PERCENTAGE]
 *               created_at:
 *                 type: string
 *                 format: date-time
 *               updated_at:
 *                 type: string
 *                 format: date-time
 *               deleted:
 *                 type: integer
 *                 enum: [0, 1]
 *       '500':
 *         description: Internal server error
 */
ProductRouter.get("/get-all-product", getAllProduct);

/**
 * @swagger
 * /api/product/get-product/:id:
 *   get:
 *     summary: Get a product by ID
 *     tags: 
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to get
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       '200':
 *         description: A single product object
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             category:
 *               type: string
 *             brand:
 *               type: string
 *             unit:
 *               type: integer
 *             min_purchase:
 *               type: integer
 *             tags:
 *               type: array
 *               items:
 *                 type: string
 *             low_stock_warning:
 *               type: integer
 *             gallery_image:
 *               type: string
 *             thumbnail_image:
 *               type: string
 *             video_provider:
 *               type: string
 *               enum: [Youtube, DailyMotion, Vimeo]
 *             video_link:
 *               type: string
 *             product_variation_colors:
 *               type: string
 *             product_variation_attributes:
 *               type: string
 *             unit_price:
 *               type: number
 *             discount_date_from:
 *               type: string
 *               format: date
 *             discount_date_to:
 *               type: string
 *               format: date
 *             discount:
 *               type: number
 *             discount_type:
 *               type: string
 *               enum: [FLAT, PERCENTAGE]
 *             quantity:
 *               type: integer
 *             sku:
 *               type: string
 *             description:
 *               type: string
 *             pdf_specification:
 *               type: string
 *             meta_title:
 *               type: string
 *             meta_description:
 *               type: string
 *             meta_image:
 *               type: string
 *             stock_visibility:
 *               type: string
 *               enum: [SHOW_STOCK_QUANTITY, SHOW_STOCK_WITH_TEXT_ONLY, HIDE_STOCK]
 *             cash_on_delivery:
 *               type: boolean
 *             featured:
 *               type: boolean
 *             todays_deal:
 *               type: boolean
 *             flash_deal_title:
 *               type: string
 *             flash_deal_discount:
 *               type: number
 *             flash_deal_discount_type:
 *               type: string
 *               enum: [FLAT, PERCENTAGE]
 *             shipping_days:
 *               type: integer
 *             tax:
 *               type: number
 *             tax_type:
 *               type: string
 *               enum: [FLAT, PERCENTAGE]
 *             created_at:
 *               type: string
 *               format: date-time
 *             updated_at:
 *               type: string
 *               format: date-time
 *             deleted:
 *               type: integer
 *               enum: [0, 1]
 *       '404':
 *         description: Product not found
 */
ProductRouter.get("/get-product/:id", getAllProduct);

/**
 * @swagger
 * /api/product/delete-product/:id:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: 
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the product to delete
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       '200':
 *         description: Successfully deleted product
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
ProductRouter.delete("/delete-product/:id", deleteProduct);

export default ProductRouter;
