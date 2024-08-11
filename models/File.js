const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
})


// Middleware
fileSchema.post('save', async (doc) => {
  try {
    console.log('------ doc ------\n', doc)

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    let info = await transporter.sendMail({
      from: "Demo NodeMailer Bhargav",
      to: doc.email,
      subject: "New File Uploaded on Cloudinary",
      html: `
        <h2>Hello There Bhargav Here</h2>
        <p>File Uploaded SuccessFully</p>
        <a href=${doc.imageUrl}> Click Here to see </a>
      `,
    })

    console.log('info', info);

  } catch (error) {
    console.error(error)
  }
})

const File = mongoose.model("File", fileSchema)
module.exports = File;