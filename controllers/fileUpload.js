const File = require('../models/File');

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