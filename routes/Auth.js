import express from "express"
import { Login, Register } from "../controller/Auth.js";
const Authroute = express.Router();

Authroute.post("/register", Register)
.post("/login", Login);

export default Authroute;