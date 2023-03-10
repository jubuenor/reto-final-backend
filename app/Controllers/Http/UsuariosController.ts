import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import  Usuario  from 'App/Models/Usuario';
import jwt from 'jsonwebtoken';
const bcryptjs = require('bcryptjs');
import Env from "@ioc:Adonis/Core/Env";

export default class UsuariosController {
    public async registrarUsuario({request}:HttpContextContract){
        const {nombres,correo,contrasena} = request.all();
        const salt = bcryptjs.genSaltSync();
        const usuario = new Usuario();
        usuario.nombres=nombres;
        usuario.correo=correo;
        usuario.contrasena=bcryptjs.hashSync(contrasena,salt);
        await usuario.save();
        return {
            usuario,
            "msg":"Usuario registrado"
        }

    }
    public async login({request,response}:HttpContextContract){
        const correo = request.input('correo');
        const contrasena = request.input('contrasena');
        try{
            //consultar si existe el usuario
            const user= await Usuario.findBy('correo',correo);
            if(!user){
                return response.status(400).json({"msg":"El usuario no existe"})
            }
            const validaPassword = bcryptjs.compareSync(contrasena,user.contrasena);
            if(!validaPassword){
                return response.status(400).json({"msg":"La contraseña es invalida"})
            }
            const payload ={
                "nombres":user.nombres,
                "id":user.id
            }
            const token:string = this.generarToken(payload);
            response.status(200).json({
                token,
                user,
                "msg":"Usuario logueado"
            })
        }catch(error){
            console.log(error);
            response.json({"msg":"Credenciales invalidas"})

        }
    }

    private generarToken(payload: any):string{
        const opciones ={
            expiresIn:"5 min"
        }
        return jwt.sign(payload,Env.get('JWT_SECRET_KEY'),opciones)
    }
    public verificarToken(authorizationHeader:string){
        let token = authorizationHeader.split(' ')[1];
        token = jwt.verify(token,Env.get('JWT_SECRET_KEY'),(error)=>{
            if(error){
                throw new Error("Token expirado")
            }
        })
        return true;
    }



}
