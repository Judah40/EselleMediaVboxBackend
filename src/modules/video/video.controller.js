const {
  postVideoService,
  handleGetAllVideoService,
  handleGetVideosByGenreService,
  handleGetSingleVideoService,
  handleGetAllPostService,
  getAllPostsByFavorite,
} = require("../../modules/video/video.service");
const { getFileUrl } = require("../../services/supabase");
////////////////////////////////////////////////////////////////////////////
//CREATE POST
exports.handleCreatingPost = async (req, res) => {
  try {
    const { title, description, genre, location } = req.body;
    const thumbnails = req.files["thumbnails"]
      ? req.files["thumbnails"][0]
      : null;
    const banner = req.files["banner"] ? req.files["banner"][0] : null;
    const fullVideo = req.files["fullVideo"] ? req.files["fullVideo"][0] : null;
    const { id: userId } = req.user;
    await postVideoService(
      title,
      description,
      genre,
      location,
      userId,
      thumbnails,
      banner,
      fullVideo
    );
    res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

////////////////////////////////////////////////////////////////////////////
//GET ALL POST BY GENRE
exports.handleGetAllPostsByGenre = async (req, res) => {
  try {
    // Fetch all posts from the database
    const postsByTags = await handleGetAllVideoService();

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
    // Convert the tags JSON string to a parseable format and search within it
    const postsByGenre = await handleGetVideosByGenreService(genre);
    res.status(200).json({
      post: postsByGenre,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

////////////////////////////////////////////////////////////////////////////
//GET SINGLE POST
exports.handleGetSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await handleGetSingleVideoService(id);
    return res.status(200).json({
      post,
      statusCode: 200,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

////////////////////////////////////////////////////////////////////////////
//GET ALL POST FOR AUTHENTICATED USERS
exports.handleGetAllPosts = async (req, res) => {
  const userId = req.user?.id || null; // 👈 userId is optional
  try {
    // Fetch all posts from the database
    const posts = await handleGetAllPostService({
      userId,
    });
    // res.send({updatedPosts});
    res.status(200).json({
      posts,
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
    const favorites = await getAllPostsByFavorite(id);
    return res.status(200).json({ favorites });
  } catch (error) {
    res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
