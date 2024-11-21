import QuestionModel from "../models/Question.model.js";
import QuestionnaireModel from "../models/Questionaire.js"
import mongoose from "mongoose";
export const createQuestn = async (req, res) =>{
    try {
        //const {title, description} = req.body
        const data = Array.isArray(req.body) ? req.body : [req.body]; // Ensure `data` is always an array
        const newQuestions = [];

        for (const item of data) {
        const {text, options} = item; // 
        const Questionaire_id = new mongoose.Types.ObjectId(req.params.id)
        const user_id = new mongoose.Types.ObjectId(req.user.id)
        const userQuestnnaire = await QuestionnaireModel.findOne({_id:Questionaire_id, createdBy:user_id});
        if(!userQuestnnaire){
            return res.status(400).json({message:"Questionnaire not found"})  
        }
        if(!text){
            return res.status(400).json({message:"Question require at least a text"})
        }
        const newQuest = await QuestionModel.create({
            text,
            questionnaire_id:Questionaire_id ,
            options,
            createdBy: req.user.id

        })
        newQuestions.push(newQuest)
        for (let newQuest of newQuestions){
        const ques = await QuestionnaireModel.findById(req.params.id);
         await QuestionnaireModel.findByIdAndUpdate(req.params.id, 
            {questions:[...(ques.questions), newQuest.id]},  
            {
                new:true
            })
        }
    }
        return res.status(200).json({message:"New questionnaire created..", newQuestions})
    } catch (error) {        
        return res.status(500).json({error})  
    }

}

export const getAllQuestns = async (req, res) =>{
    //in this case, i only want to get all question particular to the questionnaire and loggedIn user.
    try {
        const user_id = new mongoose.Types.ObjectId(req.user.id)
        const Questionaire_id = new mongoose.Types.ObjectId(req.params.id)
        const userQuestnnaire = await QuestionnaireModel.findOne({_id:Questionaire_id, createdBy:user_id});
        if(!userQuestnnaire){
            return res.status(404).json({message:"Questionnaire not Found"})
        }
        const fiter={
            questionnaire_id:Questionaire_id
        }
        const Quests = await QuestionModel.find(fiter);
        if(!Quests){
            return res.status(404).json({message:"No Question Found"})
        }
        return res.status(200).json({message:"Questions", Quests})
    } catch (error) {
        return res.status(500).json({error})  
    }
}

export const getAQuestn = async (req, res) =>{
    //in this case, i only want to get a question particular to the loggedIn user, to the questaionnaire and to the question whose id is passed
    try {
        const user_id = new mongoose.Types.ObjectId(req.user.id)
        const Questionaire_id = new mongoose.Types.ObjectId(req.params.quesnId)
        const Question_Id = new mongoose.Types.ObjectId(req.params.quesId)
        const userQuestnnaire = await QuestionnaireModel.findOne({_id:Questionaire_id, createdBy:user_id});
        if(!userQuestnnaire){
            return res.status(404).json({message:"No Questionnaire with that id "})
        }
        const Quest = await QuestionModel.findOne({_id:Question_Id, questionnaire_id:Questionaire_id})
        if(!Quest){
            return res.status(404).json({message:"No Question with that id"})
        }
        return res.status(200).json({message:"Questionnaire ", Quest})
    } catch (error) {
        console.log(error)   
        return res.status(500).json({error}) 
    }
}

export const updateQuestn = async (req, res) =>{
    //in this case, i only want to update questionnaire particular to the loggedIn user
    try {
        const user_id = new mongoose.Types.ObjectId(req.user.id)
        const Questionaire_id = new mongoose.Types.ObjectId(req.params.quesnId)
        const Question_Id = new mongoose.Types.ObjectId(req.params.quesId)
        const userQuestnnaire = await QuestionnaireModel.findOne({_id:Questionaire_id, createdBy:user_id});
        if(!userQuestnnaire){
            return res.status(404).json({message:"No Questionnaire with that id "})
        }
        const Quest = await QuestionModel.findOneAndUpdate({_id:Question_Id, questionnaire_id:Questionaire_id}, 
            req.body,
            {
                new:true
            }
        )
        if(!Quest){
            return res.status(404).json({message:"No Question with that id"})
        }
        return res.status(200).json({message:"Questionnaire ", Quest})
    } catch (error) {
        console.log(error)   
        return res.status(500).json({error}) 
    }
}


export const deleteQuestn = async (req, res) =>{
    //in this case, i only want to delete questionnaire particular to the loggedIn user
    try {
        const user = req.user
        const _id = new mongoose.Types.ObjectId(req.params.id)
        const Questnnair = await QuestionnaireModel.findOne({createdBy:user._Id, _id});
        if(!Questnnair){
            return res.status(404).json({message:"No Questionnaire with that id"})
        }
        const Questnnaire = await QuestionnaireModel.findByIdAndDelete(Questnnair._id);
        return res.status(200).json({message:"Questionnaire deleted", Questnnaire})
    } catch (error) {
        return res.status(500).json({error})  
    }
}