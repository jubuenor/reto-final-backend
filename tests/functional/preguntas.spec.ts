import {test} from '@japa/runner';
import { obtenerTokenAutorizacion } from './getToken';

test('registrar pregunta ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body={
        "question": "¿que dia es hoy?",
        "options": [
            {
                "opcion":"esta es correcta",
                "iscorrect":true
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            } ]
    }
    
    const response = await client.post('api/v1/questions/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('registrar pregunta fail',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body={
        "question": "¿que dia es hoy?",
        "optikons": [
            {
                "opcion":"esta es correcta",
                "iscorrect":true
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            },{
                "opcion":"incorrecta",
                "iscorrect":false
            } ]
    }
    
    const response = await client.post('api/v1/questions/create').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('listar pregunta ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()

    const response = await client.get('api/v1/questions/getQuestions').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('editar pregunta ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    const body=  {
        "question": "¿que dia es hoy?"
    }

    const response = await client.put('api/v1/questions/updateQuestion/2').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('editar pregunta fail',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    const body=  {
        "question": "¿que dia es hoy?"
    }

    const response = await client.put('api/v1/questions/updateQuestion/6465454').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(404)
    assert.isObject(response.body())
})

test('eliminar pregunta ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()

    const response = await client.delete('api/v1/questions/deleteQuestion/4').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('eliminar pregunta fail',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()

    const response = await client.delete('api/v1/questions/deleteQuestion/665654654').header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})


test('editar respuesta ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    const body=  {
        "opcion": "correcta",
        "iscorrect":true
    }

    const response = await client.put('api/v1/questions/updateAnswer/5').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('editar respuesta fail',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    const body=  {
        "opcion": "correcta",
        "iscorrect":true
    }

    const response = await client.put('api/v1/questions/updateAnswer/54654654').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(404)
    assert.isObject(response.body())
})

test('listar opciones ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()

    const response = await client.get('api/v1/questions/getOptions/2').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})


test('listar opciones fail',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()

    const response = await client.get('api/v1/questions/getOptions/2654654654').header('Authorization', `Bearer ${token}`)
    response.assertStatus(404)
    assert.isObject(response.body())
})



