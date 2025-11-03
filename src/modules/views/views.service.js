const { Views } = require("../../models/Views");
const { Post } = require("../../models/post.model");
const { Op } = require("sequelize");
const { sequelize } = require("../../config/database");

exports.viewService = async ({ ipAddress, userId, postId }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // ✅ Define identifier: prefer userId, else fallback to IP
  const identifier = userId ? { userId } : { ipAddress };
  // ✅ Check if user/IP already viewed this video today
  const existingView = await Views.findOne({
    where: {
      videoId: postId,
      ...identifier,
      viewedAt: { [Op.gte]: today },
    },
  });
  if (existingView) {
    return { created: false, reason: "Already viewed today" };
  }
  // ✅ Transaction for atomicity (prevents race conditions)
  return await sequelize.transaction(async (t) => {
    await Views.create(
      {
        videoId: postId,
        userId,
        ipAddress,
        viewedAt: new Date(),
      },
      { transaction: t }
    );
    await Post.increment("viewCount", {
      by: 1,
      where: { postId },
      transaction: t,
    });
    return { created: true };
  });
};
