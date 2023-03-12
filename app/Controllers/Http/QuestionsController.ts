import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question';
import Answer from 'App/Models/Answer';

export default class QuestionsController {

    public async createQuestion({request,response}:HttpContextContract){
        const questionInput = request.input('question');
        const optionsInput = request.input('options');
        const question = new Question();
        try{
            question.question=questionInput;
            question.state=false;
            await question.save();
            if(this.createAnswers(optionsInput,question.Id)){
                response.status(200).json({"state":true,"message":"Pregunta creada exitosamente"})
            }

        }catch(error){
            console.log(error)
            response.status(400).json({"state":false,"message":"Error al crear la pregunta"})
        }
    }

    private createAnswers(options:any,id:any){
        try{
            options.forEach(async (option:any)=>{
                const answer = new Answer();
                answer.question_id=id;
                answer.answer=option.opcion;
                answer.is_correct=option.isCorrect;
                answer.state=false;
                await answer.save();
            })
            return true;

        }catch(error){
            console.log(error)
            return false;
        }
    }

    public async getQuestions({response}:HttpContextContract){
        try{
            const questions = await Question.all();
            response.status(200).json({
                "state":true,
                "questions":questions
            });
        }catch(error){
            console.log(error);
            response.status(400).json({"state":false,"message":"Error al listar las preguntas"})
        }
    }

    public async updateQuestion({request,response}:HttpContextContract){
        const id = request.param('id');
        const question = await Question.find(id);
        if(question){
            question.question=request.input('question');
            if(await question.save()){
                return response.status(200).json({"state":true,"message":"Pregunta actualizado correctamente"}) 
            }
            return response.status(400).json({"state":false,"message":"Error al editar la pregunta"}) 
        }
        return response.status(404).json({"state":false,"message":"Pregunta no encontrado"}) 
    }

    public async deleteQuestion({request,response}:HttpContextContract){
        const id = request.input('id');

        if(await Question.query().where('Id',id).delete()){
            if(await Answer.query().where('question_id',id).delete()){
                response.status(200).json({"state":true,"message":"Pregunta eliminada con exito"})
            }
        }else{
            response.status(400).json({"state":false,"message":"Error al eliminar pregunta"})
        }

    }


}