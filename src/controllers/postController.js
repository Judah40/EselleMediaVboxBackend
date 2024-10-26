const { Post } = require("../models/post.model");

////////////////////////////////////////////////////////////////////////////
//CREATE POST
exports.handleCreatingPost = async (req, res) => {
  try {
    const { content, caption, tags, location } = req.body;
    const { id } = req.user;
    const newPost = await Post.create({
      content: content,
      caption: caption,
      tags: tags,
      location: location,
      userId: id,
    });
    if (newPost) {
      res.status(201).json({ message: "Post created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

////////////////////////////////////////////////////////////////////////////
//GET SINGLE POST
exports.handleGetSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findOne({ where: { id: id } });
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        statusCode: 404,
      });
    }
    return res.status(200).json({
      post: post,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

////////////////////////////////////////////////////////////////////////////
//GET ALL POST FOR AUTHENTICATED USERS
exports.handleGetAllPosts = async (req, res) => {
  try {
    const { id } = req.user;
    const posts = await Post.findAll({ where: { userId: id } });
    if (!posts) {
      return res.status(404).json({
        message: "No posts found",
        statusCode: 404,
      });
    }
    return res.status(200).json({
      post: posts,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
