import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        if(connect){
            console.log("Connected to MongoBD successfully...")
        }
        return
    } catch (error) {
        console.log("error connecting to mongoDB", error);
        process.exit(1)  
    }
}