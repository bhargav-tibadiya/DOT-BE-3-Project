const express = require('express');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const port = process.env.PORT || 3000;


// Adding Middleware
const app = express();
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

//  Connecting to Database
const db = require('./config/db')
db.connect()

// Connecting to Clodinary
const cloudinary = require('./config/cloudinary')
cloudinary.connect()

// Mounting API Routes
const upload = require("./routes/FileUpload")
app.use('/api/v1/upload', upload)

// Acitivate Server 
app.listen(port, () => {
  console.log(`Server is Listening on Port : ${port}`);
})