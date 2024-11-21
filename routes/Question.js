import express from "express"
import { Authorization } from "../middlewares/Auth.js";
import { createQuestn, getAllQuestns, getAQuestn } from "../controller/Question.js";
const Questroute = express.Router();

Questroute.post("/:id", Authorization, createQuestn)
.get("/:id", Authorization, getAllQuestns).get("/:quesnId/questions/:quesId", Authorization, getAQuestn);

export default Questroute;