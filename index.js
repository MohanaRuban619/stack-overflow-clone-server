import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import usersRouter from './routes/users.js';
import askquestionRouter from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import dotenv from 'dotenv'

const app = express();  
dotenv.config()
app.use(express.json({limit:"30mb",extended :true}))
app.use(express.urlencoded({limit:"30mb" ,extended: true}))
app.use(cors())


app.get('/',(req,res) =>{
    res.send("This is an stack overflow clone API")
})

app.use('/user',usersRouter)
app.use('/AskQuestions',askquestionRouter)   
app.use('/answer',answerRoutes)

const PORT = process.env.PORT || 5000

const DB_URL = process.env.CONNECTION_URL

mongoose.connect( DB_URL , { useNewUrlParser : true ,useUnifiedTopology: true})
    .then(()=> app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)}))
    .catch((err) => console.log(err.message))  