const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

//db connection

exports.mongo = async () => {
    await mongoose
    .connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connected'))
    .catch((err) => {
      console.log(`DB not : ${err.message}`)
    });
  mongoose.connection.on('error', (err) => {
    console.log(`DB connection error: ${err.message}`)
  })
}
