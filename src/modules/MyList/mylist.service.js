const { MyList } = require("../../models/MyList.model");
const { handleGetSingleVideoService } = require("../video/video.service");

exports.handleAddToMyListService = async ({ videoId, userId }) => {
  const alreadyAdded = await MyList.findOne({
    where: {
      posts: videoId,
    },
  });

  if (alreadyAdded) throw new Error("ALREADY ADDED TO LIST");

  return await MyList.create({
    posts: videoId,
    userId,
  });
};

exports.handleGetAllMyVideoListService = async (userId) => {
  const list = await MyList.findAll({
    where: {
      userId,
    },
  });

  const videos = await Promise.all(
    list.map(async (video) => {
      const postData = await Promise.all([
        handleGetSingleVideoService(video.posts),
      ]);
      return postData;
    })
  );
  return videos;
};

exports.handleRemoveFromMyListService = async ({ videoId, userId }) => {
  const existingList = await MyList.findOne({
    where: {
      posts: videoId,
      userId,
    },
  });
  if (!existingList) throw new Error("VIDEO NOT IN LIST");
  await existingList.destroy();
};
