// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import TypesDocument from 'App/Models/TypesDocument';

// export default class TypesDocumentsController {
//     public async registerTypeDocument({request,response}:HttpContextContract){
//         const name = request.input('name');
//         try{
//             const typeDocument = new TypesDocument();
//             typeDocument.name=name;
//             if(await typeDocument.save()) return response.status(200).json({"state":true,"message":"Tipo de documento creado correactamente"});
//         }catch(error){
//             console.log(error);
//             return response.status(400).json({"state":false,"message":"Error en el servidor"})
//         }
//     }

//     // public async listTypeDocuments():Promise<TypesDocument[]>{
//     //     const typeDocuments = await TypesDocument.all();
//     //     return typeDocuments;
//     // }

//     // public async updateTypeDocument({request,response}:HttpContextContract){
//     //     const id = request.param('id');
//     //     const typeDocument = await TypesDocument.find(id);
//     //     if(typeDocument){
//     //         typeDocument.name=request.input('name');
//     //         if(await typeDocument.save())
//     //             return response.status(200).json({
//     //                 "state":true,
//     //                 "message":"Tipo de documento actualizado correctamente"
//     //             })
//     //         return response.status(400).json({"state":false,"message":"Tipo de documento no se pudo actualizar"}) 
//     //     }else{
//     //         return response.status(404).json({"state":false,"message":"Tipo de documento no encontrado"})  
//     //     }
//     // }

//     // public async deleteTypeDocument({request,response}:HttpContextContract){
//     //     const id = request.param('id');
//     //     const typeDocument = await TypesDocument.find(id);
//     //     if(typeDocument){
//     //         typeDocument.delete();
//     //         return response.status(200).json({
//     //             "state":true,
//     //             "message":"Tipo de documento eliminado correctamente"
//     //         })
//     //     }else{
//     //         return response.status(404).json({
//     //             "state":false,
//     //             "message":"Tipo de documento no encontrado"
//     //         })
//     //     }
//     // }
// }
