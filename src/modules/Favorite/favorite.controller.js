////////////////////////////////////////////////////////////////////////////////////////////////

const { Favorite } = require("../models/favorite.model");

// CREATE FAVORITES CONTROLLER
exports.handleCreateFavorites = async (req, res) => {
  const { favorites } = req.body;
  const { id } = req.user;

  try {
    const [favoriteInstance, created] = await Favorite.upsert(
      {
        userId: id,
        favorites: favorites,
      },
      {
        returning: true,
        conflictFields: ["userId"], // Specify the unique field for conflict detection
      }
    );

    if (created) {
      return res.status(201).json({
        message: "Favorites added successfully",
        data: favoriteInstance,
      });
    } else {
      return res.status(200).json({
        message: "Favorites updated successfully",
        data: favoriteInstance,
      });
    }
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
