const File = require('../models/File');
const cloudinary = require('cloudinary').v2

// Functions

const isFileTypeSuppported = (currentType, supportedTypes) => {
  return supportedTypes.includes(currentType)
}

const uploadFileToCloudinary = async (file, folder, quality) => {
  console.log("Uploading To CodeHelp Folder");
  const options = { folder }

  if (quality) {
    options.quality = quality;
  }

  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.localFileUpload = async (req, res) => {
  try {

    // Fething Files
    const file = req.files.file;
    console.log('Here is File', file);

    // let path = __dirname + "/LBWD/BE3/FileUpload/" + Date.now();
    let path = __dirname + "/Files/" + Date.now() + `.${file.name.split('.')[1]}`;
    console.log('path ||', path)

    file.mv(path, (err) => {
      console.log('Error in Moving File ||', err)
    });

    res.json({
      success: true,
      message: 'Local File Upload Successful'
    })

  } catch (error) {
    console.error(err)
  }
}

exports.imageUpload = async (req, res) => {
  try {

    const { name, tags, email } = req.body;

    const file = req.files.imageFile;

    const supportedTypes = ['jpg', 'jpeg', 'png']
    const fileType = file.name.split('.')[1].toLowerCase();

    if (!isFileTypeSuppported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Invalid File Formate"
      })
    }

    const response = await uploadFileToCloudinary(file, "CodeHelp")

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    })

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Uploaded SuccessFully"
    })

  } catch (error) {
    console.error(error)
    return res.status(400).json({
      success: false,
      message: "Something Went wrong while uplpoding Image"
    })
  }
}

exports.videoUpload = async (req, res) => {
  try {

    const { name, tags, email } = req.body;

    const file = req.files.videoFile;

    console.log('file', file)

    const supportedTypes = ['mp4', 'avi', 'mki']
    const fileType = file.name.split('.')[1].toLowerCase();

    if (!isFileTypeSuppported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Invalid File Formate"
      })
    }

    console.log("++++Uploading File ++++ \n");
    const response = await uploadFileToCloudinary(file, "CodeHelp")
    console.log("++++File Uploaded ++++ \n");
    console.log('response', response)

    const fileData = await File.create({
      name,
      tags,
      email,
      videoUrl: response.secure_url,
    })

    res.json({
      success: true,
      videoUrl: response.secure_url,
      message: "Video Uploaded SuccessFully"
    })


  } catch (error) {
    console.error(error)
    return res.status(400).json({
      success: false,
      message: "Something Went wrong while uplpoding Video"
    })
  }
}

exports.imageReducerUpload = async (req, res) => {
  try {

    const { name, tags, email } = req.body;

    const file = req.files.imageFile;

    const supportedTypes = ['jpg', 'jpeg', 'png']
    const fileType = file.name.split('.')[1].toLowerCase();

    if (!isFileTypeSuppported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "Invalid File Formate"
      })
    }

    const response = await uploadFileToCloudinary(file, "CodeHelp", 50)

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    })

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Reduced and Uploaded SuccessFully"
    })

  } catch (error) {
    console.error(error)
    return res.status(400).json({
      success: false,
      message: "Something Went wrong while Image Reduction"
    })
  }
}