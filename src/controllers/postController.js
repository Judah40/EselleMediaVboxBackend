const { Post } = require("../models/post.model");
const { randomName } = require("../utils/generators/generateRandomNames");
const {handleUploadImageToAWSs3bucket} = require("../controllers/awsController")
////////////////////////////////////////////////////////////////////////////
//CREATE POST
exports.handleCreatingPost = async (req, res) => {
  try {
    const { content, caption, tags, location } = req.body;
    // Access the uploaded files from the middleware
    const thumbnails = req.files["thumbnails"]
      ? req.files["thumbnails"][0]
      : null;
    const banner = req.files["banner"] ? req.files["banner"][0] : null;
    const fullVideo = req.files["fullVideo"] ? req.files["fullVideo"][0] : null;

    // return res.status(200).json({
    //   content,
    //   caption,
    //   tags,
    //   location,
    //   //   thumbnails,
    //   //   banner,
    //   fullVideo,
    // });

    const thumbnailName = randomName();
    const bannerName = randomName();
    const fullVideoName = randomName();
    // return res.status(200).json({
    //   thumbnailName,
    //   bannerName,
    //   fullVideoName,
    // });
    await handleUploadImageToAWSs3bucket(
      bannerName,
      banner.buffer,
      banner.mimetype
    );
    await handleUploadImageToAWSs3bucket(
      fullVideoName,
      fullVideo.buffer,
      fullVideo.mimetype
    );
    await handleUploadImageToAWSs3bucket(
      thumbnailName,
      thumbnails.buffer,
      thumbnails.mimetype
    );
    const { id } = req.user;
    const newPost = await Post.create({
      content: content,
      caption: caption,
      tags: tags,
      location: location,
      userId: id,
      bannerUrl: bannerName,
      thumbnailUrl: thumbnailName,
      videoUrl: fullVideoName,
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
