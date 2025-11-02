const { PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");
const { fileTypeFromBuffer } = require("file-type");
const {
  supabaseUrl,
  supabaseBucket,
  supabaseKey,
  cloudfareBucketName,
} = require("../../config/default.config");
const { R2Client } = require("../../config/r2.config");
const userModel = require("../../models/user.model");
const { Post } = require("../../models/post.model");

exports.profilePicturemigrateData = async () => {
  const banerUrl = await Post.findAll();
  for (const profilePic of banerUrl) {
    const res = await fetch(
      `${supabaseUrl}/storage/v1/object/${supabaseBucket}/posts/${profilePic.videoUrl}`,
      {
        headers: { Authorization: `Bearer ${supabaseKey}` },
      }
    );

    const buffer = await res.arrayBuffer();
    const fileTypeResult = await fileTypeFromBuffer(Buffer.from(buffer));
    const contentType = fileTypeResult?.mime;

    console.log(contentType);
    await R2Client.send(
      new PutObjectCommand({
        Bucket: cloudfareBucketName,
        Key: `posts/video/${profilePic.videoUrl}`,
        Body: Buffer.from(buffer),
        ContentType: contentType,
      })
    );
    console.log(`Migrated ${profilePic.videoUrl}`);
  }
};
