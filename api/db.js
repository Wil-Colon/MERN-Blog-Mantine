const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongodb connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
