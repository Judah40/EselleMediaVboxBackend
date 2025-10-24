const { uploadFile, getFileUrl } = require("../../services/supabase");
const { randomName } = require("../../utils/generators/generateRandomNames");
const { resizedImage } = require("../../utils/resizer/postImageResizer");
const { Post } = require("../../models/post.model");
const { Readable } = require("stream");
const mm = require("music-metadata");
const { Favorite } = require("../../models/favorite.model");

exports.postVideoService = async (
  title,
  description,
  genre,
  location,
  userId,
  thumbnails,
  banner,
  fullVideo
) => {
  const thumbnailName = randomName();
  const bannerName = randomName();
  const fullVideoName = randomName();

  const resizedThumbnail = await resizedImage(1080, 1920, thumbnails.buffer);
  const resizedBanner = await resizedImage(1080, 1920, banner.buffer);

  await uploadFile(resizedBanner, banner.mimetype, "posts/", bannerName);
  await uploadFile(
    fullVideo.buffer,
    fullVideo.mimetype,
    "posts/",
    fullVideoName
  );
  await uploadFile(
    resizedThumbnail,
    thumbnails.mimetype,
    "posts/",
    thumbnailName
  );

  // Use music-metadata to get duration from buffer
  const metadata = await mm.parseBuffer(fullVideo.buffer, fullVideo.mimetype);
  const duration = metadata.format.duration || 0;

  await Post.create({
    title,
    description,
    genre,
    location,
    userId,
    duration: Math.floor(duration),
    bannerUrl: bannerName,
    thumbnailUrl: thumbnailName,
    videoUrl: fullVideoName,
  });
};

exports.handleGetAllVideoService = async () => {
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
    return [];
  }

  // Group posts by tags
  const postsByTags = {};

  // Fetch images and group posts
  await Promise.all(
    posts.map(async (post) => {
      let tags = [];

      try {
        const rawTag = post.tags[0];

        if (
          typeof rawTag === "string" &&
          rawTag.trim().startsWith("[") &&
          rawTag.trim().endsWith("]")
        ) {
          // Valid JSON array string
          tags = JSON.parse(rawTag);
        } else {
          // Plain string (like "comedy")
          tags = [rawTag];
        }
      } catch (e) {
        console.warn(`Invalid tag format for post ID ${post.id}:`, post.tags);
        tags = []; // Skip grouping if parsing fails
      }

      // Fetch images from S3 bucket
      const thumbnailUrl = await getFileUrl(`posts/${post.thumbnailUrl}`);
      const bannerUrl = await getFileUrl(`posts/${post.bannerUrl}`);
      // Group by tags
      tags.forEach((tag) => {
        if (!postsByTags[tag]) {
          postsByTags[tag] = [];
        }
        postsByTags[tag].push({
          id: post.id,
          postId: post.postId,
          content: post.content,
          thumbnailUrl,
          bannerUrl,
          caption: post.caption,
          likeCount: post.likeCount,
          commentCount: post.commentCount,
          location: post.location,
        });
      });
    })
  );

  return postsByTags;
};

exports.handleGetVideosByGenreService = async (genre) => {
  const postsByGenre = await Post.findAll({
    where: sequelize.where(
      sequelize.fn("LOWER", sequelize.cast(sequelize.col("tags"), "text")),
      "LIKE",
      sequelize.fn("LOWER", `%${genre}%`)
    ),
  });

  console.log("Posts by Genre:", postsByGenre);

  return await Promise.all(
    postsByGenre.map(async (post) => {
      const [thumbnailUrl, bannerUrl, videoUrl] = await Promise.all([
        handleGetUploadedMediaFromAWSs3Bucket(post.thumbnailUrl),
        handleGetUploadedMediaFromAWSs3Bucket(post.bannerUrl),
        handleGetUploadedMediaFromAWSs3Bucket(post.videoUrl),
      ]);

      return {
        ...post.toJSON(),
        thumbnailUrl,
        bannerUrl,
        videoUrl,
      };
    })
  );
};

exports.handleGetSingleVideoService = async (id) => {
  const post = await Post.findOne({ where: { postId: id } });

  if (!post) throw new Error("POST NOT FOUND");
  const thumbnailUrl = await getFileUrl(`posts/${post.thumbnailUrl}`);
  const bannerUrl = await getFileUrl(`posts/${post.bannerUrl}`);
  const videoUrl = await getFileUrl(`posts/${post.videoUrl}`);
  return {
    ...post.toJSON(),
    thumbnailUrl,
    bannerUrl,
    videoUrl,
  };
};

exports.handleGetAllPostService = async () => {
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
  return await Promise.all(
    posts.map(async (post) => {
      // Fetch URLs for thumbnail, banner, and video in parallel
      const [thumbnailUrl, bannerUrl] = await Promise.all([
        getFileUrl(`posts/${post.thumbnailUrl}`),
        getFileUrl(`posts/${post.bannerUrl}`),
      ]);

      // Return the updated post object
      return {
        ...post.toJSON(), // Ensure you convert Sequelize instances to plain objects
        thumbnailUrl,
        bannerUrl,
      };
    })
  );
};

exports.getAllPostsByFavorite = async (userId) => {
  const favorites = await Favorite.findOne({
    where: { userId },
  });
  if (!favorites) throw new Error("NO FAVORITES FOUND");
  return await Post.findAll({
    where: sequelize.where(sequelize.cast(sequelize.col("tags"), "text[]"), {
      [Op.contains]: [favorites.favorites],
    }),
  });
};
