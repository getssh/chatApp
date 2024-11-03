import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const {fullName, userName, password, confirmPassword, gender} = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({error: "Password doesn't match"});
    }

    const user = await User.findOne({userName});

    if (user) return res.status(400).json({error: "Username already exists"});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const manProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
    const womanProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePic: gender === "Male" ? manProfilePic : womanProfilePic,
    })

    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json("Invlid user data")
    }
  } catch (error) {
    console.log("Signup error", error.message)
    res.status(500).json({error: "Internal server error"})
  }
}

export const login = (req, res) => {
  res.send('singin')
}

export const logout = (req, res) => {
  res.send('logout')
}

