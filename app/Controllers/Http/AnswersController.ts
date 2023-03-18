import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Answer from 'App/Models/Answer';

export default class AnswersController {
    public async updateAnswer({request,response}:HttpContextContract){
        const id = request.param('id');
        const answer = await Answer.find(id);
        if(answer){
            answer.answer=request.input('opcion');
            if(await answer.save()){
                return response.status(200).json({"state":true,"message":"Opcion actualizado correctamente"}) 
            }
            return response.status(400).json({"state":false,"message":"Error al editar la opcion"}) 
        }
        return response.status(404).json({"state":false,"message":"Opcion no encontrada"}) 
    }

    public async listAnswers({request,response}:HttpContextContract){
        const id = request.param('id');
        try{
            const answers = await Answer.query().select('id_answer','answer').where('id_question',id);
            return response.status(200).json({
                "state":true,
                "message":"Listado de opciones",
                "options":answers
            }) 
        }catch(error){
            console.log(error);
            return response.status(404).json({"state":false,"message":"Pregunta no encontrada"}) 
        }
    }
}
