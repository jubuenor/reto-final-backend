import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Answer from 'App/Models/Answer';
import Form from 'App/Models/Form';
import Question from 'App/Models/Question';
export default class FormsController {

    public async createForm({request,response}:HttpContextContract){
        const estudianteId = request.input('estudianteId');
        const answers = request.input('answers');
        
        try{
            answers.forEach(async (ans:any)=>{
                const form = new Form();
                form.id_student=estudianteId;
                form.id_answer=ans;
                await form.save();
            })
            return response.status(200).json({"state":true,"message":"Respuestas almacenadas con exito"}) 
        }catch(error){
            console.log(error);
            return response.status(400).json({"state":false,"message":"No se pudieron almacenar las respuestas"}) 
        }
    }

    public async listForm({response}:HttpContextContract){
        try{
            const answers:Answer[] = await Answer.query().select('answers.id_question').distinct().join('forms','answers.id_answer','=','forms.id_answer');
            const idQuestions= answers.map(ans=>ans.id_question);
            const questions = await Question.query().select('id_question','question').whereIn('id_question',idQuestions).preload('id_answer',sql=>sql.select('id_answer','answer','id_question'));

            return response.status(200).json({"state":true,questions}) 
        }catch(error){
            console.log(error);
            return response.status(400).json({"state":false,"message":"Error al obtener el listado"}) 
        }
    }
}
