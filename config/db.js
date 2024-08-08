const mongoose = require('mongoose')
require('dotenv').config()

exports.connect = () => {
  mongoose.connect(process.env.DB_URL)
    .then(console.log("Database Connection Successful"))
    .catch((error) => {
      console.log("Issue While Connecting to Database");
      console.error(error)
      process.exit(1)
    })
}