import {test} from '@japa/runner';
import { obtenerTokenAutorizacion } from './getToken';

test('almacenar respuesta formulario ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()
    let body={
        "estudianteId": 1,
        "answers": [4, 1, 3, 2]
    }
    
    const response = await client.post('api/v1/form/postquestions').json(body).header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

test('listar formulario ok',async ({client,assert}) => {
    const token = await obtenerTokenAutorizacion()

    const response = await client.get('api/v1/form/getquestions').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    assert.isObject(response.body())
})

