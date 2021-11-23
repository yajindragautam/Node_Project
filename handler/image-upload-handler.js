const multer = require("multer");
const mkdirp = require("mkdirp");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Storing Image Into Uploads Folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../public/uploads');
    mkdirp(dir)
      .then((made) => cb(null, dir))
      .catch((err) => cb(err));
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const uploadImageHandler = multer({
   storage,
  fileFilter: function (req, file, cb) {
    /* Another Way Of Doing  
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"), false);
    }

    cb(null, true);
    */

    // Similar to fileFilter
    const ext = path.extname(file.originalname);
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    if (!validExtensions.includes(ext)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
   limits : {
      fileSize: 1024 * 1024 * 5, // 5MB
    },
});

// Export
module.exports = {
    uploadImageHandler,
}
