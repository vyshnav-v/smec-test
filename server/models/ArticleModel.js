import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    heading: String,
    readTime: String,
    description: String,
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    image: String,
    verified: Boolean,
    newest: Boolean,
    trending: Boolean,
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);
export default Article;
