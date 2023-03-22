import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken';
import User from 'App/Models/User';

export default class AdminAuth {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const authorizationHeader:any =  request.header('Authorization');

    let token = authorizationHeader.split(' ')[1];
    const id = jwt.decode(token).id;
    const user = await User.find(id);

    if(user?.id_rol===1){//rol de admin
      await next()
    }else{
      response.unauthorized({"state":false,"message":"No estas autorizado"});
    }

  }
}
