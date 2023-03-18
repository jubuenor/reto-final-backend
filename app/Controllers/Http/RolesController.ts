import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Role from 'App/Models/Role';

export default class RolesController {
    public async registerRole({request,response}:HttpContextContract){
        const name = request.input('name');
        try{
            const role = new Role();
            role.name=name;
            if(await role.save()) return response.status(200).json({"state":true,"message":"Rol creado correactamente"});
        }catch(error){
            console.log(error);
            return response.status(400).json({"state":false,"message":"Error en el servidor"})
        }
    }

    // public async listRoles():Promise<Role[]>{
    //     const roles = await Role.all();
    //     return roles;
    // }

    // public async updateRole({request,response}:HttpContextContract){
    //     const id = request.param('id');
    //     const role = await Role.find(id);
    //     if(role){
    //         role.name=request.input('name');
    //         if(await role.save())
    //             return response.status(200).json({
    //                 "state":true,
    //                 "message":"Rol actualizado correctamente"
    //             })
            
    //         return response.status(400).json({"state":false,"message":"Rol no se pudo actualizar"}) 
    //     }else{
    //         return response.status(404).json({"state":false,"message":"Rol no encontrado"})  
    //     }
    // }

    // public async deleteRole({request,response}:HttpContextContract){
    //     const id = request.param('id');
    //     const role = await Role.find(id);
    //     if(role){
    //         role.delete();
    //         return response.status(200).json({
    //             "state":true,
    //             "message":"Rol eliminado correctamente"
    //         })  
    //     }else{
    //         return response.status(404).json({
    //             "state":false,
    //             "message":"Rol no encontrado"
    //         })  
    //     }
    // }
}
