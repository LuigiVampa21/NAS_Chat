const multer = require("multer");
const CustomError = require("../errors/index");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("multermiddleware");
    // console.log(req.user);
    // console.log(file);
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new CustomError.BadRequestError("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "../Client/src/assets/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

exports.uploadPhoto = multer({ storage: storage }).single("image");
