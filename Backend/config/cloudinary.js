const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: "deffm8g7g",
  api_key: "644617639796428",
  api_secret: "3BwBm43dPWheLi8xOI2yvgbm6tA",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'instaMERN_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };

