const AppError = require('../utils/AppError');
const cloudinary = require('../config/cloudinary')

function uploadBufferToCloudinary(buffer, folder, publicId) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "image",
        format: "webp",
        transformation: [
          { width: 1280, height: 720, crop: "fill" },
          { quality: "auto:good" },
        ],
        tags: ["thumbnail", "ai-generated", "clipdrop"],
      },
      (error, result) => {
        if (error) return reject(new AppError("Cloudinary upload failed", 500));
        resolve(result);
      },
    );

    uploadStream.end(buffer);
  });
}

module.exports = uploadBufferToCloudinary
