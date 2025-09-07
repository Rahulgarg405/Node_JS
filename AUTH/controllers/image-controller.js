const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");

const uploadImage = async (req, res) => {
  try {
    // check if file is missing  :
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required, plaese upload an Image.",
      });
    }

    // upload to cloudinary :
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    // store the image url and public id along with the uploaded user id :
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });

    await newlyUploadedImage.save();

    res.status(201).json({
      success: true,
      message: "Image Uploaded Successfully!!!",
      image: newlyUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, Please try Again!!!",
    });
  }
};

module.exports = { uploadImage };
