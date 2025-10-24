const multer = require("multer");

const storage = multer.memoryStorage();

// Enhanced file filter
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type: ${file.mimetype}. Only images are allowed.`
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 10, // max files for array uploads
  },
  fileFilter: fileFilter,
});

// Profile picture upload (single, required)
const handleUploadImage = upload.single("profile_picture");

// Multiple images upload (optional, max 10)
const handleUploadImages = upload.array("images", 10);

// Single image upload (optional)
const handleUploadImageOptional = upload.single("image");

// Wrapper with validation and error handling
const createUploadMiddleware = (uploadMethod, options = {}) => {
  return (req, res, next) => {
    uploadMethod(req, res, (err) => {
      if (err) {
        // Handle different types of errors
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              success: false,
              error: "File too large. Maximum size is 5MB.",
            });
          }
          if (err.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
              success: false,
              error: "Too many files. Maximum is 10 files.",
            });
          }
        }

        return res.status(400).json({
          success: false,
          error: err.message,
        });
      }

      // Additional validation for required files
      if (
        options.required &&
        (!req.file || (uploadMethod === handleUploadImages && !req.files))
      ) {
        return res.status(400).json({
          success: false,
          error: `${options.fieldName || "File"} is required`,
        });
      }

      next();
    });
  };
};

// Export validated middlewares
module.exports = {
  // For required profile picture
  uploadProfilePicture: createUploadMiddleware(handleUploadImage, {
    required: true,
    fieldName: "Profile picture",
  }),

  // For multiple images (optional)
  uploadImages: createUploadMiddleware(handleUploadImages),

  // For single optional image
  uploadSingleImage: createUploadMiddleware(handleUploadImageOptional),

  // Original handlers (if you still need them)
  handleUploadImage,
  handleUploadImages,
};
