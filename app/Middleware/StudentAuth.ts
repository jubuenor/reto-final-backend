import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken';

export default class StudentAuth {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const authorizationHeader:any =  request.header('Authorization');

    let token = authorizationHeader.split(' ')[1];
    const rol= jwt.decode(token).role;
    if(rol===1||rol===2){//rol de admin o estudiante
      await next()
    }else{
      response.unauthorized({"state":false,"message":"No estas autorizado"});
    }

  }
}
