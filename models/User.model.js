import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    matricNumber:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user', 'admin', 'supervisor'],
        default:"user"
    },
    password:{
        type:String,
        required:true
    }
})

const UserModel = mongoose.model("User", UserSchema);
export default UserModel