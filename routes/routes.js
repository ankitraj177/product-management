import { Router } from "express";
import CategoryRouter from "./categoryRoutes.js";
import SubCategoryRouter from "./subCategoryRoutes.js";
import ProductRouter from "./productRoutes.js";

const router = Router();

router.use("/category",CategoryRouter)
router.use("/sub-category",SubCategoryRouter)
router.use("/product",ProductRouter)

export default router