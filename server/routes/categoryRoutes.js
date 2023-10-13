import express from "express";
import { createCategory, listCategories } from "../controllers/categoryController.js";


const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", listCategories);

export default router;
