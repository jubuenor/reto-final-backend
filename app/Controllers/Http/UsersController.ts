import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import jwt from 'jsonwebtoken';
import Env from "@ioc:Adonis/Core/Env";


const bcryptjs = require('bcryptjs');

export default class UsersController {
    public async registerUser({request,response}:HttpContextContract){
        const {firstName,secondName,surname,secondSurName,typeDocument,documentNumber,email,phone,password,rol}=request.all();
        try{
            const emailExist = await User.findBy('email',email);
            if(emailExist) return response.status(400).json({"state":false,"message":"Email existente"});
            const docuExist = await User.findBy('document_number',documentNumber);
            if(docuExist) return response.status(400).json({"state":false,"message":"Numero de documento existente"});
            
            const user = new User();
            user.first_name=firstName;
            user.second_name=secondName;
            user.surname=surname;
            user.second_surname=secondSurName;
            user.id_typeDocument=typeDocument;
            user.document_number=documentNumber;
            user.email=email;
            user.phone=phone;
            user.password=bcryptjs.hashSync(password);
            user.id_rol=rol;
            if(await user.save()) return response.status(200).json({"state":true,"message":"Usuario creado correctamente"});
        }catch(error){
            console.log(error);
            return response.status(400).json({"state":false,"message":"Error en el servidor"})
        }
    }

    public async login({request,response}:HttpContextContract){
        const email = request.input('email');
        const password = request.input('password');
        try{
            const user = await User.findBy('email',email);
            if(!user) return response.status(400).json({"state":false,"message":"El usuario no existe"})
            
            const validaPassword = bcryptjs.compareSync(password,user.password);
            if(!validaPassword) return response.status(400).json({"state":false,"message":"Constraseña o email invalido"})
            
            const payload ={
                "id":user.id_user,
                "firstName": user.first_name,
                "secondName": user.second_name,
                "surname": user.surname,
                "secondSurName": user.second_surname,
                "typeDocument": user.id_typeDocument,
                "documentNumber": user.document_number,
                "email": user.email,
                "phone": user.phone,
                "role":user.id_rol
            }
            const token:string = this.generarToken(payload);
            response.status(200).json({
                "state":true,
                "id":user.id_user,
                "name":`${user.first_name} ${user.second_name} ${user.surname} ${user.second_name}`,
                "message":"Ingreso exitoso",
                token
            })
        }catch(error){
            console.log(error);
            response.status(400).json({"state":false,"message":"Error en el servidor"})
        }
    }

    private generarToken(payload: any):string{
        const opciones ={
            expiresIn:"30 min"
        }
        return jwt.sign(payload,Env.get('JWT_SECRET_KEY'),opciones)
    }

    public verificarToken(authorizationHeader:string){
        let token = authorizationHeader.split(' ')[1];
        jwt.verify(token,Env.get('JWT_SECRET_KEY'),(error:any)=>{
            if(error){
                throw new Error("Token expirado")
            }
        })
        return true;
    }

    public async listUsers({request,response}:HttpContextContract){
        const perPage = request.input('perPage');
        const page = request.input('page');
        const filter = request.input('filter');
        try{
            const users = await User.query().select( 
            'first_name',
            'second_name',
            'surname',
            'second_surname',
            'id_type_document',
            'document_number',
            'email',
            'phone'
            ).where(filter).where('id_rol',2).orderBy('id_user').paginate(page,perPage);
            response.status(200).json({
                "state":true,
                "message":"Listado de estuidantes",
                users:users.toJSON().data
            })
        }catch(error){
            console.log(error)
            response.status(400).json({
                "state":false,
                "message":"Fallo en el listado de estudiantes",
            })
        }
    }

    public async updateUser({request,response}:HttpContextContract){
        const id = request.param('id');
        const user = await User.find(id);
        if(user){
            const {firstName,secondName,surname,secondSurname,typeDocument,documentNumber,email,phone}=request.all();
            user.first_name=firstName;
            user.second_name=secondName;
            user.surname=surname;
            user.second_surname=secondSurname;
            user.id_typeDocument=typeDocument;
            user.document_number=documentNumber;
            user.email=email;
            user.phone=phone;
            if(await user.save()){
                return response.status(200).json({"state":true,"message":"Usuario actualizado correctamente"}) 
            }
            return response.status(400).json({"state":false,"message":"Usuario no se pudo actualizar"}) 
        }
        return response.status(404).json({"state":false,"message":"Usuario no encontrado"}) 
    }

    public async getUser({request,response}:HttpContextContract){
        const id = request.param('id');
        const user = await User.find(id);
        if(user){
            return response.status(200).json({
                "firstName": user.first_name,
                "secondName": user.second_name,
                "surname": user.surname,
                "secondSurName": user.second_surname,
                "typeDocument": user.id_typeDocument,
                "documentNumber": user.document_number,
                "email": user.email,
                "phone": user.phone
            }) 
        }else{
            return response.status(404).json({"state":false,"message":"Usuario no encontrado"}) 
        }
    }

    // public async deleteUser({request,response}:HttpContextContract){
    //     const id = request.param('id');
    //     const user = await User.find(id);
    //     if(user){
    //         user.delete();
    //         return response.status(200).json({"state":true,"message":"Usuario eliminado correctamente"}) 
    //     }else{
    //         return response.status(404).json({"state":false,"message":"Usuario no encontrado"}) 
    //     }
    // }

}
