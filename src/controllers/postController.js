const { Post } = require("../models/post.model");
const { randomName } = require("../utils/generators/generateRandomNames");
const {
  handleUploadImageToAWSs3bucket,
  handleGetUploadedMediaFromAWSs3Bucket,
  handleGetMultipleUploadedMediaFromAWSs3Bucket,
} = require("../controllers/awsController");
const sharp = require("sharp");
const { Op } = require("sequelize");
const { sequelize } = require("../config/database");
const { Favorite } = require("../models/favorite.model");
const {
  attribute,
} = require("@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/attribute.js");
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
//GET ALL POST BY GENRE
exports.handleGetAllPostsByGenre = async (req, res) => {
  try {
    // Fetch all posts from the database
    const posts = await Post.findAll({
      attributes: {
        exclude: [
          "videoUrl",
          "userId",
          "createdAt",
          "updatedAt",
          "isPublic",
          "isDeleted",
        ],
      },
    });

    // Check if posts exist
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    // Group posts by tags
    const postsByTags = {};

    // Fetch images and group posts
    await Promise.all(
      posts.map(async (post) => {
        const tags = JSON.parse(post.tags[0]); // Parse tags if stored as stringified JSON

        // Fetch images from S3 bucket
        const thumbnailUrl = await handleGetUploadedMediaFromAWSs3Bucket(
          post.thumbnailUrl
        );
        const bannerUrl = await handleGetUploadedMediaFromAWSs3Bucket(
          post.bannerUrl
        );

        tags.forEach((tag) => {
          if (!postsByTags[tag]) {
            postsByTags[tag] = [];
          }
          postsByTags[tag].push({
            id: post.id,
            postId: post.postId,
            content: post.content,
            thumbnailUrl, // Add fetched thumbnail URL
            bannerUrl, // Add fetched banner URL
            caption: post.caption,
            likeCount: post.likeCount,
            commentCount: post.commentCount,
            location: post.location,
          });
        });
      })
    );

    // Return the grouped posts
    return res.status(200).json({
      success: true,
      data: postsByTags,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching posts",
    });
  }
};
////////////////////////////////////////////////////////////////////////////
//GET  POST BY GENRE
exports.handleGetPostsByGenre = async (req, res) => {
  const { genre } = req.params;
  try {
    const postsByGenre = await Post.findAll({
      where: sequelize.where(sequelize.cast(sequelize.col("tags"), "text[]"), {
        [Op.contains]: [genre],
      }),
    });

    const updatedPosts = await Promise.all(
      postsByGenre.map(async (post) => {
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
    // Fetch all posts from the database
    const posts = await Post.findAll({
      attributes: {
        exclude: [
          "videoUrl",
          "userId",
          "createdAt",
          "updatedAt",
          "isPublic",
          "isDeleted",
        ],
      },
    });

    // console.log(posts)
    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found",
      });
    }

    // const updatedPosts = [];
    ////////////////////////////////////////////////////////////////////////////

    // Process all posts in parallel
    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        // Fetch URLs for thumbnail, banner, and video in parallel
        const [thumbnailUrl, bannerUrl] = await Promise.all([
          handleGetUploadedMediaFromAWSs3Bucket(post.thumbnailUrl),
          handleGetUploadedMediaFromAWSs3Bucket(post.bannerUrl),
        ]);

        // Return the updated post object
        return {
          ...post.toJSON(), // Ensure you convert Sequelize instances to plain objects
          thumbnailUrl,
          bannerUrl,
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

////////////////////////////////////////////////////////////////////////////
//GET ALL POST BY Favorite
exports.handleGetAllPostByFavorite = async (req, res) => {
  const { id } = req.user;

  try {
    const favorites = await Favorite.findOne({
      where: { userId: id },
    });
    if (!favorites) {
      console.log(favorites);
      return res.status(404).json({
        success: false,
        message: "No favorites found",
        statusCode: 404,
      });
    }
    const favoritePosts = await Post.findAll({
      where: sequelize.where(sequelize.cast(sequelize.col("tags"), "text[]"), {
        [Op.contains]: [favorites.favorites],
      }),
    });
    if (favoritePosts.length + 1 > 0) {
      return res.status(200).json({
        message: "Successfully gotten posts by favorites",
        statusCode: 200,
        data: favoritePosts,
      });
    }

    const posts = await Post.findAll();
    return res.status(200).json({
      message: "No posts found",
      statusCode: 200,
      data: posts,
    });
    // res.send(id);
    // return res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }

  // Favorite;
};
