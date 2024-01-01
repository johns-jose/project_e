const User = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

//add user (registration)
// const addUser = async (req, res) => {

//    const { username, email, password } = req.body
//    console.log('username', username);

//    try {

//       // check whether the email is existing in the db or not
//       const isExisting = await User.findOne({ email: email })
//       console.log('result of search', isExisting)
//       if (!isExisting) {

//          // create bcrypted password
//          const Password = await bcrypt.hash(password, 10)

//          // create new user
//          const newuser = new User({
//             username: username,
//             email: email,
//             password: Password
//          })

//          // save user in db and return reaponse
//          const user = await newuser.save();

//          // Create a new object excluding the password
//          const userinfo = {
//            username: user.username,
//            email: user.email,
//            createdAt: user.createdAt,
//            updatedAt: user.updatedAt,
//            // Add any other properties you want to include in the response
//          };

//          console.log("user log--------------------: ", userinfo);

//          res.status(200).json({ data: userinfo, success: 1, message: "User registered successfully" });
//                } else {
//          res.status(400).json({ data: null, success: 0, message: "Email already exists", error: "Email already registered" });
//       }
//    } catch (error) {
//       console.log("error log: ", error)
//       res.send(error)
//    }
// }

const addUser = async (req, res) => {
  const { username, email, phone, password } = req.body;

  try {
    // Check whether the email exists in the db
    const isExisting = await User.findOne({ email: email });

    if (!isExisting) {
      // Create bcrypted password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newuser = new User({
        username: username,
        email: email,
        phone: phone,
        password: hashedPassword,
      });

      // Save user in db and return response
      const user = await newuser.save();

      // Create userinfo by spreading user properties excluding the password
      const userinfo = {
        ...user._doc,
        password: undefined, // Exclude the password property
      };

      // console.log("user log--------------------: ", userinfo);

      res.status(200).json({
        data: userinfo,
        success: 1,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        data: null,
        success: 0,
        message: "Email already registered",
      });
    }
  } catch (error) {
    console.log("error log: ", error);
    res.json(error);
  }
};

// login

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  // console.log("emailllllllllllllllllll", email);
  try {
    // Check whether the user exists in the db
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      res.json({ success: 0, message: "user not found" });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    // console.log('validPassword', validPassword);

    if (!validPassword) {
      res.json({ success: 0, message: "wrong password" });
    } else {
      const userinfo = { ...user._doc, password: undefined };

      //jwt token creation

      const Token = jwt.sign({}, "key", { expiresIn: 300 });
      res
        .status(200)
        .json({
          data: userinfo,
          success: 1,
          Token,
          message: "login completed successfully",
        });
    }
  } catch (error) {
    res.json(error);
  }
};

module.exports = { addUser, postLogin };
