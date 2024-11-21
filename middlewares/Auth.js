import jwt from "jsonwebtoken"


export const Authorization = async (req, res, next) =>{
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
        return res.status(401).json({message:"Unauthorized, Please Login first"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded
    } catch (error) {
        return res.status(500).json({message:error})  
    }
    next()
}