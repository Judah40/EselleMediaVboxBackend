const multer = require("multer");

// Setup Multer to handle the file uploads
const upload = multer().fields([
  { name: "leagueLogo", maxCount: 1 },
  { name: "HomeTeamLogo", maxCount: 1 },
  { name: "AwayTeamLogo", maxCount: 1 },
]);

// Multer middleware
const footBallUploadMediaMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }
    next();
  });
};

module.exports = { footBallUploadMediaMiddleware };
