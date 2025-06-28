const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Database connected Successfully"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

async function runQueryExample() {
  try {
    // const newUser = await User.create({
    //   name: "john doe",
    //   email: "john@gmail.com",
    //   age: "69",
    //   isActive: false,
    //   tags: ["designer", "developer"],
    // });
    // console.log(newUser);

    // const users = await User.find({ isActive: false });

    // It will give all users name and email only :
    // const selectedFields = await User.find().select("name email -_id");

    const limitedUsers = await User.find().limit(3).skip(1);

    // it will give users in sorted order by age in descending order,
    // if we give {age : 1} => order will be ascending;
    // const sortedUsers = await User.find().sort({ age: -1 });

    // console.log(sortedUsers);

    const count = await User.countDocuments({ isActive: true });
    console.log(count);
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExample();
