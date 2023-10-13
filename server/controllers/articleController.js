import Article from "../models/ArticleModel.js";
import fs from "fs";

// Create a new article with image upload
export const createArticle = async (req, res) => {
  try {
    const {
      heading,
      readTime,
      description,
      categories,
      verified,
      newest,
      trending,
    } = req.body;
    const image = req.file.filename;

    const newArticle = new Article({
      heading,
      readTime,
      description,
      categories,
      image,
      verified,
      newest,
      trending,
    });

    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// List all articles
export const listArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("categories")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// List articles by category
export const listArticlesByCategory = async (req, res) => {
  const selectedCategories = req.query.categories;

  try {
    if (selectedCategories && selectedCategories.length > 0) {
      const categories = selectedCategories.split(",");

      const articles = await Article.find({
        categories: { $in: categories },
      })
        .populate("categories")
        .sort({ createdAt: -1 });

      res.json(articles);
    } else {
      res.status(400).json({ error: "No categories specified" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Edit an existing article
export const editArticle = async (req, res) => {
  const articleId = req.params.id;
  try {
    const updatedData = { ...req.body };

    // Check if a new image file was uploaded
    if (req.file && req.file.filename) {
      updatedData.image = req.file.filename;
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      updatedData,
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an article
export const deleteArticle = async (req, res) => {
  const articleId = req.params.id;

  try {
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    // Delete the associated image file
    if (article.image) {
      const imagePath = `../server/assets/images/${article.image}`;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error deleting image file: ${err}`);
        }
      });
    }

    // Delete the article record from the database
    const deletedArticle = await Article.findByIdAndRemove(articleId);
    res.json(deletedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
