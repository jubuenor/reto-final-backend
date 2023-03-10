import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsuariosController from 'App/Controllers/Http/UsuariosController'

export default class AuthJwt {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    // ctx=context
    const authorizationHeader =  ctx.request.header('athorization')
    if(authorizationHeader===undefined){
      return ctx.response.status(400).send({
        mensaje:"Falta el token de autorizacion",
        estado:401
      })
    }
    const token = authorizationHeader;
    try{
      const usuariosController = new UsuariosController();
      usuariosController.verificarToken(token);
      await next() //continua con la peticion
    }catch(error){
      ctx.response.status(400).send({"msg":"Falla en el token"});

    }
  }
}
