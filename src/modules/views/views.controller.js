const { viewService } = require("./views.service");

exports.viewsController = async (req, res) => {
  const ipAddress = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
  const { id: postId } = req.params;
  const userId = req.user?.id || null;

  if (!postId) {
    return res.status(400).json({ message: "POST ID REQUIRED" });
  }

  try {
    const { created, reason } = await viewService({
      ipAddress,
      userId,
      postId,
    });

    return res.status(200).json({
      message: created
        ? "View recorded successfully"
        : `View already counted today${reason ? ": " + reason : ""}`,
      status: created ? 201 : 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      statusCode: 500,
    });
  }
};
