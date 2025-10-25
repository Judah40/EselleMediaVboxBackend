const { MyList } = require("../../models/MyList.model");
const { Post } = require("../../models/post.model");
const { getFileUrl } = require("../../services/supabase");
const handleGetSingleVideoService = async (id) => {
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
      const [postData] = await Promise.all([
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
  return await existingList.destroy();
};

exports.videoIsPartOfList = async ({ userId, videoId }) => {
  if (!userId) return { isPartOfList: false };
  const existingList = await MyList.findOne({
    where: {
      posts: videoId,
      userId,
    },
  });

  if (!existingList) return { isPartOfList: false };
  return { isPartOfList: true };
};
