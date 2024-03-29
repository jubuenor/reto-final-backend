/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
}).middleware('auth')

Route.group(()=>{
  Route.group(()=>{
    Route.post('/user/create','UsersController.registerUser')
    Route.post('/login','UsersController.login')
  })

  Route.group(()=>{
    
    Route.group(()=>{
      Route.post('/getUsers','UsersController.listUsers')
      Route.put('/update/:id','UsersController.updateUser')
      Route.get('/getUser/:id','UsersController.getUser')
      //Route.delete('/delete/:id','UsersController.deleteUser')
    }).prefix('/user').middleware('adminAuth')
  
    // Route.group(()=>{
    //   Route.post('/create','TypesDocumentsController.registerTypeDocument')
    //   // Route.get('/getTypeDocuments','TypesDocumentsController.listTypeDocuments')
    //   // Route.put('/update/:id','TypesDocumentsController.updateTypeDocument')
    //   // Route.delete('/delete/:id','TypesDocumentsController.deleteTypeDocument')
    // }).prefix('/typeDocuments').middleware('adminAuth')
  
    // Route.group(()=>{
    //   Route.post('/create','RolesController.registerRole')
    //   // Route.get('/getRoles','RolesController.listRoles')
    //   // Route.put('/update/:id','RolesController.updateRole')
    //   // Route.delete('/delete/:id','RolesController.deleteRole')
    // }).prefix('/roles').middleware('adminAuth')

    Route.group(()=>{
      Route.post('/create','QuestionsController.createQuestion')
      Route.put('/updateQuestion/:id','QuestionsController.updateQuestion')
      Route.get('/getQuestions/','QuestionsController.getQuestions')
      Route.delete('/deleteQuestion/:id','QuestionsController.deleteQuestion')
      Route.put('/updateAnswer/:id','AnswersController.updateAnswer')
      Route.get('/getOptions/:id','AnswersController.listAnswers')
    }).prefix('/questions').middleware('adminAuth')
    
    Route.group(()=>{
      Route.get('/getquestions','FormsController.listForm')
      Route.post('/postquestions','FormsController.createForm')
    }).prefix('/form').middleware('studentAuth')

  }).middleware('auth')

}).prefix('/api/v1')
