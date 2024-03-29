import {test} from '@japa/runner';
import { obtenerTokenAutorizacion } from './getToken';

test('registrar usuario ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body={
        "firstName": "Daniel",
        "secondName": "jose",
        "surname": "cruz",
        "secondSurName": "casallas",
        "typeDocument": 1,
        "documentNumber": "1216545hh7",
        "email": "daasdasais8121@gmail.co",
        "password":"32jdkdi",
        "rol":1,
        "phone": "32123122314"
    }
    const response = await client.post('api/v1/user/register').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('registrar usuario fail',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body={
        "firstName": "daniel",
        "secondName": "jose",
        "surname": "cruz",
        "secondSurName": "casallas",
        "typeDocument": 1,
        "documentNumber": "123456789",
        "email": "danielc88@gmail.co",
        "password":"32jdkdi",
        "rol":2,
        "phone": "32123122314",
    }
    
    const response = await client.post('api/v1/user/register').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})

test('listar usuarios ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body={
        "perPage": 10,
        "page": 1,
         "filter": {
            "first_name": "daniel"
        }
    }
    const response = await client.post('api/v1/user/getUsers').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('listar usuarios fail',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body={
        "perPage": 10,
        "page": 1,
         "filter": {
            "name": ""
        }
    }
    const response = await client.post('api/v1/user/getUsers').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(400)
    assert.isObject(response.body())
})


test('actualizar usuarios ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body={
        "firstName": "daniel",
        "secondName": "jose",
        "surname": "cruz",
        "secondSurName": "casallas",
        "typeDocument": 1,
        "documentNumber": "123456789",
        "email": "danielc88@gmail.co,",
        "phone": "32123122314"
    }
    
    const response = await client.put('api/v1/user/update/1').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('actualizar usuarios fail',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body={
        "firstName": "daniel",
        "secondName": "jose",
        "surname": "cruz",
        "secondSurName": "casallas",
        "typeDocument": 1,
        "documentNumber": "123456789",
        "email": "danielc88@gmail.co,",
        "phone": "32123122314"
    }
    
    const response = await client.put('api/v1/user/update/1321321').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(404)
    assert.isObject(response.body())
})

test('detalle usuarios ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    
    const response = await client.get('api/v1/user/getUser/1').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('detalle usuarios fail',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    
    const response = await client.get('api/v1/user/getUser/1132165454').header('Authorization', `Bearer ${token}`)
    response.assertStatus(404)
    assert.isObject(response.body())
})