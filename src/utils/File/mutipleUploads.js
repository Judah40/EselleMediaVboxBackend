const multer = require("multer");

// Setup Multer to handle the file uploads
const upload = multer().fields([
  { name: "thumbnails", maxCount: 1 },
  { name: "banner", maxCount: 1 },
  { name: "fullVideo", maxCount: 1 },
]);

// Multer middleware
const uploadMediaMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }
    next();
  });
};

module.exports = {uploadMediaMiddleware};
