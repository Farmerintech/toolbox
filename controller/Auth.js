import UserModel from "../models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const Register = async (req, res) => {
    try {
        const {
            fullName, 
            username, 
            matricNumber,
            role,
            password 
        } = req.body
        console.log(req.body)
    //check if the request body contain neccessary user data
    if(!fullName || ! username || ! matricNumber | !password){
        return res.status(400).json({message:"fullName, Username, MatricNumber and password is missing"})
    }
    //check if usernam exists to ensure uniqueness
    const userExists = await UserModel.findOne({username});
    if(userExists){
        return res.status(400).json({message:"Username already exist, try another name."})
    }
    const saltRound = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, saltRound);
    const newUser = await UserModel.create({
        fullName, 
        username, 
        matricNumber, 
        role,
        password:hashedPassword
    })
        return res.status(201).json({message:"Registration successful", newUser})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export const Login = async (req, res) => {
    try {
        const {username, password} = req.body
        if(!username || ! password){
            return res.status(400).json({message:"Username and password is required"})
        }
        const user = await UserModel.findOne({username});
        if(!user){
            return res.status(400).json({message:"Username does not exist"})
        }
        const realPassword = await bcrypt.compare(password, user.password)
        if(!realPassword){
            return res.status(400).json({message:"Incorrect password"})
        }
        const token = jwt.sign(
            {
               id:user.id,
               role:user.role 
            },
            process.env.SECRET_KEY,
            {
                expiresIn: process.env.LIFE_TIME
            }
        )
        return res.status(200).json({message:"Login successful", token})
    } catch (error) {                
        return res.status(500).json({message:error})
    }
}