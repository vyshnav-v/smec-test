import express from "express";
import multer from "multer";
import {
  createArticle,
  listArticles,
  listArticlesByCategory,
  editArticle,
  deleteArticle,
} from "../controllers/articleController.js";

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../server/assets/images");
  },
  filename: function (req, file, cb) {
    const imageName = Date.now() + "-" + file.originalname;
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

// Define your routes
router.post("/articles", upload.single("image"), createArticle); 
router.get("/articles", listArticles); 
router.get("/articles-by-categories", listArticlesByCategory); 
router.put("/articles/:id", upload.single("image"), editArticle); 
router.delete("/articles/:id", deleteArticle); 

export default router;
