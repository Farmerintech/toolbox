import mongoose from "mongoose";


const ResponseSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    QuestionnaireId:{
       type: mongoose.Schema.Types.ObjectId,
        ref:"Questionnaire"
    },
    QuestionId:{
        type: mongoose.Schema.Types.ObjectId,
         ref:"Questionnaire"
     },
})

const ResponseModel = mongoose.model("Question", ResponseSchema);
export default ResponseModel