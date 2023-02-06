import mongoose from 'mongoose'
import Question from '../models/Question.js'

export const postAnswer = async (req,res)=>{
    const { id: _id } = req.params;
    const { noOfAnswers , answersBody, userAnswered ,userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }
    updatedQuestions(_id,noOfAnswers)
    try {
        const updatedQuestions = await Question.findByIdAndUpdate(_id,{$addToSet:{'answer':[{ answersBody,userAnswered,userId }]}})
        res.status(200).json(updatedQuestions)
    }catch (error){
        res.status(400).json(error)
    }
}

export const updatedQuestions = async (_id, noOfAnswers) =>{
    try{
        await Question.findByIdAndUpdate(_id,{$set: {'noOfAnswers': noOfAnswers}})
    }catch (error){
        console.log(error)
    }
}

export const deleteAnswer = async (req,res ) => {
    const { id : _id} = req.params;
    const {answerId , noOfAnswers} = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json('Question unavailable...');
    }
    if(!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).json('Answer unavailable...');
    }
    updatedQuestions( _id, noOfAnswers)
    try{
        await Question.updateOne(
            { _id},
            {$pull: {'answer': {_id: answerId}}}
        )
        res.status(200).json({message : "Successfully deleted"})
    }catch (error){
       console.log(error)  
    }
}