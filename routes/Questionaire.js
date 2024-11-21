import express from "express"
import { Authorization } from "../middlewares/Auth.js";
import { createQuestnnaire, deleteQuestnnaire, getAllQuestnnaire, getAQuestnnaire } from "../controller/Questnnaire.js";
const Questnnairroute = express.Router();

Questnnairroute.post("/", Authorization, createQuestnnaire)
.get("/", Authorization, getAllQuestnnaire)
.get("/:id", Authorization, getAQuestnnaire)
.delete("/:id", Authorization, deleteQuestnnaire)

export default Questnnairroute;