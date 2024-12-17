const mongoose = require("mongoose");

//primoCarthage / primoCarthage!!

const connectDB = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://primoCarthage:12345@cluster0.oymhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {}
    );
    console.log("Connect to DB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
