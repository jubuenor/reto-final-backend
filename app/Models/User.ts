import { DateTime } from 'luxon'
import { BaseModel, column,hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form'

export default class User extends BaseModel {
  @column({ isPrimary: true }) public id_user:number
  @column() public first_name:string
  @column() public second_name:string
  @column() public surname:string
  @column() public second_surname:string
  @column() public id_typeDocument:number
  @column() public document_number:string
  @column() public email:string
  @column() public password:string
  @column() public id_rol:number
  @column() public phone:string
  @column() public state:boolean

  @hasOne(()=>Form,{
    localKey:'id_user',
    foreignKey:'id_user'
  })
  public id_form:HasOne<typeof Form>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
