import mongoose from "mongoose";


const QuestionnaireSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
    },
    questions:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Question"
        }
    ],
},
{}
)

const QuestionnaireModel = mongoose.model("Questionnaire", QuestionnaireSchema)
export default QuestionnaireModel