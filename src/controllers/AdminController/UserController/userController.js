////////////////////////////////////////////////////////////////////////////////////////////////

const User = require("../../../models/user.model");

//DEACTIVATE USER CONTROLLER
exports.handleDeactivateUser = async (req, res) => {
  const { id } =req.params;
  try {
    const userExists = await User.findOne({ where: { id: id } });
    if (!userExists) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const deactivateUser = await User.update(
      { isActive: false },
      {
        where: { id: id },
      }
    );
    if (!deactivateUser) {
      return res
        .status(404)
        .json({ message: "user not found", statusCode: 404 });
    }
    if (deactivateUser) {
      return res.status(200).json({
        statusCode: 200,
        message: "User Deactivated",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error getting comments for live",
      error: error,
      status: error.status,
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////
//ACTIVATE USER CONTROLLER
exports.handleActivateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userExists = await User.findOne({ where: { id: id } });
    if (!userExists) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const activateUser = await User.update(
      { isActive: true },
      {
        where: { id: id },
      }
    );
    if (!activateUser) {
      return res
        .status(404)
        .json({ message: "user not found", statusCode: 404 });
    }
    if (activateUser) {
      return res.status(200).json({
        statusCode: 200,
        message: "User reactivated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
      status: error.status,
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////
//GET ALL USERS CONTROLLER
exports.handleGetSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id: id },
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({
      error: error,
      status: error.status,
    });
  }
};
////////////////////////////////////////////////////////////////////////////////////////////////
//GET ALL USERS CONTROLLER
exports.handleGetAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json({
      data: allUsers,
      message: " users found",
    });
  } catch (error) {
    res.status(500).json({
      error: error,
      status: error.status,
    });
  }
};
