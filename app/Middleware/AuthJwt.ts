import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsersController from 'App/Controllers/Http/UsersController'

export default class AuthJwt {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    // ctx=context
    const authorizationHeader =  request.header('Authorization')
    if(authorizationHeader===undefined){
      return response.status(400).send({
        mensaje:"Falta el token de autorizacion",
        estado:401
      })
    }
    const token = authorizationHeader;
    try{
      const usuariosController = new UsersController();
      usuariosController.verificarToken(token);
      await next() //continua con la peticion
    }catch(error){
      response.status(400).send({"msg":"Falla en el token"});

    }
  }
}
