import QuestionModel from "../models/Question.model.js"
import QuestionnaireModel from "../models/Questionaire.js"
import mongoose from "mongoose"
export const createQuestnnaire = async (req, res) =>{
    try {
        const {title, description} = req.body
        if(!title || ! description){
            return res.status(400).json({message:"Title and Description are required"})
        }
        const newQuestnnaire = await QuestionnaireModel.create({
            title,
            description,
            createdBy: req.user.id

        })
        return res.status(200).json({message:"New questionnaire created..", newQuestnnaire})
    } catch (error) {
        return res.status(500).json({error})  
    }

}

export const getAllQuestnnaire = async (req, res) =>{
    //in this case, i only want to get all questionnaire particular to the loggedIn user
    try {
        const user_id = new mongoose.Types.ObjectId(req.user.id)
        const Questnnairs = await QuestionnaireModel.find({createdBy:user_id}).populate("questions");
        if(Questnnairs.length===0){
            return res.status(404).json({message:"No Questionnaire Found"})
        }
        return res.status(200).json({message:"Questionnaire", Questnnairs})
    } catch (error) {
        console.error(error);
        return res.status(500).json({error})  
    }
}

export const getAQuestnnaire = async (req, res) =>{
    //in this case, i only want to get a questionnaire particular to the loggedIn user
    try {
        const user_id = new mongoose.Types.ObjectId(req.user.id)
        const _id = new mongoose.Types.ObjectId(req.params.id)
        const Questnnair = await QuestionnaireModel.findOne({_id, createdBy:user_id }).populate("questions");
        if(!Questnnair){
            return res.status(404).json({message:"No Questionnaire with that id"})
        }
        return res.status(200).json({message:"Questionnaire ", Questnnair})
    } catch (error) {        
        return res.status(500).json({error})    
    }
}

export const updateQuestnnaire = async (req, res) =>{
    //in this case, i only want to update questionnaire particular to the loggedIn user
    try {
        const user_id = new mongoose.Types.ObjectId(req.user.id)
        const _id = new mongoose.Types.ObjectId(req.params.id)
        const Questnnair = await QuestionnaireModel.findOneAndUpdate({_id, createdBy:user_id },
            Questnnair._id, 
            req.params,
            {
                new:true

           }
        );
        if(!Questnnair){
            return res.status(404).json({message:"No Questionnaire with that id"})
        }
        return res.status(200).json({message:"Questionnaire Updated ", Questnnair})
    } catch (error) {        
        return res.status(500).json({error})    
    }
}


export const deleteQuestnnaire = async (req, res) =>{
    //in this case, i only want to delete questionnaire particular to the loggedIn user
    try {
        const user_id = new mongoose.Types.ObjectId(req.user.id)
        const _id = new mongoose.Types.ObjectId(req.params.id)
        const Questnnair = await QuestionnaireModel.findOne({_id, createdBy:user_id });
        if(!Questnnair){
            return res.status(404).json({message:"No Questionnaire with that id"})
        }
        const Quests = await QuestionModel.find({questionnaire_id:Questnnair._id});
        const toDelete = await QuestionnaireModel.findByIdAndDelete(req.params.id);
        for (const Ques of Quests) {
          await QuestionModel.findByIdAndDelete(Ques._id);
        }
        return res.status(200).json({message:"Questionnaire deleted...", toDelete, Quests})
    } catch (error) { 
        console.log(error)       
        return res.status(500).json({error})    
    }

}