const sharp = require("sharp");

exports.resizedImage = async (height, width, image) => {
  const imageResize = await sharp(image.buffer).resize({
    width: width,
    height: height,
    fit: "contain",
    background: { r: 255, g: 255, b: 255, alpha: 1 },
  });
  return imageResize.toBuffer();
};
