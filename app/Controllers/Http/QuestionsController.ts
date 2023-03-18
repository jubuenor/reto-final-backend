import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Question from 'App/Models/Question';
import Answer from 'App/Models/Answer';

export default class QuestionsController {

    public async createQuestion({request,response}:HttpContextContract){
        const questionInput = request.input('question');
        const optionsInput:[] = request.input('options');
        const question = new Question();
        try{
            question.question=questionInput;
            await question.save();
            if(await this.createAnswers(optionsInput,question.id_question)){
                response.status(200).json({"state":true,"message":"Pregunta creada exitosamente"})
            }else{
                response.status(400).json({"state":false,"message":"Error al crear la pregunta"})
            }
        }catch(error){
            console.log(error)
            response.status(400).json({"state":false,"message":"Error en el servidor"})
        }
    }

    private async createAnswers(options:any,id:any){
        try{
            options.forEach(async (option:any)=>{
                const answer = new Answer();
                answer.id_question=id;
                answer.answer=option.opcion;
                answer.is_correct=option.iscorrect;
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
            const questions = await Question.query().select('id_question','question');
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
        const id = request.param('id');
        const question = await Question.find(id);
        if(question){
            await question.delete();
            response.status(200).json({"state":true,"message":"Pregunta eliminada con exito"})
        }else{
            response.status(400).json({"state":false,"message":"Error al eliminar pregunta"})
        }
        
    }
}