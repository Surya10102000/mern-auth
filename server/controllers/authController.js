import { errorHandler } from "../middlewares/error.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ username: username });
    if (userExist) {
      return res.status(500).json({ message: "Username exist" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedpassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(401, "User not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong password"));
    const token = jwt.sign({ id: validPassword._id }, process.env.JWT_SECRET);
    const { password: hashedpassword, ...rest } = validUser._doc;

    const expiryDate = new Date(Date.now() + 3600000); //1 hour

    res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
