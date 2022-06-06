const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request");
const res = require("express/lib/response");
/* 
 @route/public  /api/user/register
 @desc  register the user
*/

async function registerUser(req, res) {
  // get the user from the request body

  const { username, email, password } = req.body;
  // create a hash
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  // create an instance of a user
  const newUser = new User({
    username,
    email,
    password: hash,
  });

  // save the user
  const user = await newUser.save();

  // send registered user back to the client
  return res.status(200).json({
    msg: "user registered",
    data: user,
  });
}

/*
@route/public   /api/user/signin

@desc sign in the user if registered
*/

async function SignIn(req, res) {
  const { email, password } = req.body;

  // check the user if exists

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json("user not found");
  } else {
    // compare the password if it matches with the one in the database

    const comparePassword = await bcrypt.compareSync(password, user.password);

    if (comparePassword) {
      //pass
      const payload = {
        user: {
          id: user.id,
          name: user.username,
        },
      };

      //   sign the token
      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: "30d" },
        (err, token) => {
          if (err) throw err;

          return res.status(200).json({ token: token });
        }
      );
    } else {
      return res.status(403).json("invalid credentials");
    }
  }
}

/*
@route/private   /api/user/update

@ update user
*/
async function updateUser(req, res) {
  try {
    const { id } = req.user.user;

    let newCopy = { ...req.body };

    const { password } = newCopy;

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    newCopy.password = hash;
    await User.findByIdAndUpdate(
      { _id: id },
      { $set: newCopy },
      { new: true },
      (err, data) => {
        if (err || !data) {
          return res.json(400, { msg: "could not update" });
        } else {
          return res.json(200, { msg: "user updated", user: data });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

/*
@route/private   /api/user/remove

@ delete a user account
*/

async function deleteUser(req, res) {
  const removedUser = User.findByIdAndRemove({ _id: req.user.user.id });

  return res.status(200).json("user account has been deleted", removedUser);
}

// read user

async function getUser(req, res) {
  const user = await User.findById(req.user.user.id).select("-password");

  if (!user) return res.json("user not found");

  return res.status(200).json(user);
}

module.exports = {
  registerUser: registerUser,
  SignIn,
  updateUser,
  deleteUser,
  getUser,
};
