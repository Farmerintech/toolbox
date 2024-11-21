import mongoose from "mongoose";


const QuestionSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    options:[{
        type:String,
    }],
    questionnaire_id:{
       type:  mongoose.Schema.Types.ObjectId,
        ref:"Questionnaire"
    },
    response:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Question"
        }
    ],
    createdBy:{
        type:  mongoose.Schema.Types.ObjectId,
    },

})

const QuestionModel = mongoose.model("Question", QuestionSchema)
export default QuestionModel