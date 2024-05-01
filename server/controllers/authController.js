import User from "../models/user.model.js";
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ username : username });
    if(userExist){
        return res.status(500).json({ message : "Username exist"})
    }
    const hashedpassword = await bcrypt.hash(password, 10)
    
    const newUser = new User({ username , email , password : hashedpassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error.message)
    res.status(501).json({ message : error.message })
  }
};
