const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const handleUploadImage = upload.single("profile_picture");
const handleUploadImages = upload.array("images");
module.exports = {handleUploadImage};

