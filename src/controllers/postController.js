const { Post } = require("../models/post.model");
const { randomName } = require("../utils/generators/generateRandomNames");
const {
  handleUploadImageToAWSs3bucket,
  handleGetUploadedMediaFromAWSs3Bucket,
  handleGetMultipleUploadedMediaFromAWSs3Bucket,
} = require("../controllers/awsController");
const sharp = require("sharp");
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

    const thumbnailName = randomName();
    const bannerName = randomName();
    const fullVideoName = randomName();

    const resizedThumbnail = await sharp(thumbnails.buffer)
      .resize({
        height: 150,
        width: 150,
        fit: "contain",
      })
      .toBuffer();
    const resizedBanner = await sharp(banner.buffer)
      .resize({ height: 1080, width: 1920, fit: "contain" })
      .toBuffer();
    await handleUploadImageToAWSs3bucket(
      bannerName,
      resizedBanner,
      banner.mimetype
    );
    await handleUploadImageToAWSs3bucket(
      fullVideoName,
      fullVideo.buffer,
      fullVideo.mimetype
    );
    await handleUploadImageToAWSs3bucket(
      thumbnailName,
      resizedThumbnail,
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
    const thumbnailUrl = await handleGetUploadedMediaFromAWSs3Bucket(
      post.thumbnailUrl
    );
    const bannerUrl = await handleGetUploadedMediaFromAWSs3Bucket(
      post.bannerUrl
    );
    const videoUrl = await handleGetUploadedMediaFromAWSs3Bucket(post.videoUrl);
    const updatedPost = {
      ...post.toJSON(),
      thumbnailUrl,
      bannerUrl,
      videoUrl,
    };
    return res.status(200).json({
      post: updatedPost,
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
    // Fetch all posts from the database
    const posts = await Post.findAll();

    // console.log(posts)
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    // const updatedPosts = [];

    // Process all posts in parallel
    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        // Fetch URLs for thumbnail, banner, and video in parallel
        const [thumbnailUrl, bannerUrl, videoUrl] = await Promise.all([
          handleGetUploadedMediaFromAWSs3Bucket(post.thumbnailUrl),
          handleGetUploadedMediaFromAWSs3Bucket(post.bannerUrl),
          handleGetUploadedMediaFromAWSs3Bucket(post.videoUrl),
        ]);

        // Return the updated post object
        return {
          ...post.toJSON(), // Ensure you convert Sequelize instances to plain objects
          thumbnailUrl,
          bannerUrl,
          videoUrl,
        };
      })
    );

    // res.send({updatedPosts});
    res.status(200).json({
      post: updatedPosts,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
