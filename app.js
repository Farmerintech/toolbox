import express from "express"
import Questnnairroute from "./routes/Questionaire.js";
import {connectDB} from "./config/db.js"
import Authroute from "./routes/Auth.js";
import Questroute from "./routes/Question.js";
const PORT = process.env.PORT || 8000
const app = express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use("/questionnaire", Questnnairroute)
app.use("/auth", Authroute)
app.use("/questionnaire", Questroute)

connectDB()


app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
})