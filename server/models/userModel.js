const mongoose = require("mongoose");

const emailValidation = (email) => {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      validate: [emailValidation, "Please fill a valid email address"],
      required: [true, "email is required"],
      unique: true,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
      minlength: [5, "minimum 5 character required"],
      required: [true, "password is required"],
    },
    followers: {
      type: [],
    },
    followings: {
      type: [],
    },
    block: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
