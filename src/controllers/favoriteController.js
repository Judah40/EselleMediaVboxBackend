////////////////////////////////////////////////////////////////////////////////////////////////

const { Favorite } = require("../models/favorite.model");

// CREATE FAVORITES CONTROLLER
exports.handleCreateFavorites = async (req, res) => {
  const { favorites } = req.body;
  const { id } = req.user;

  try {
    const favoriteAlreadyExists =await Favorite.findOne({
      where: { userId: id },
    });
    if (favoriteAlreadyExists) {
      return res
        .status(409)
        .json({
          message: "Favorite already added",
          data: favoriteAlreadyExists,
        });
    }
    const favoritesAdded = await Favorite.create({
      userId: id,
      favorites: favorites,
    });
    if (!favoritesAdded) {
      return res.status(400).json({ message: "Failed to add favorites" });
    }
    return res.status(201).json({ message: "Favorites added successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message, statusCode: 500 });
  }
};

////////////////////////////////////////////////////////////////////////
// READ FAVORITES CONTROLLER
exports.handleGetFavorites = async (req, res) => {
  const { id } = req.user;
  try {
    const favorites = await Favorite.findOne({
      where: { userId: id },
    });
    if (!favorites) {
      return res.status(404).json({ message: "No favorites found" });
    }
    return res
      .status(200)
      .json({ message: "Favorites found successfully", favorites });
  } catch (error) {
    return res.status(500).json({ message: error.message, statusCode: 500 });
  }
};
