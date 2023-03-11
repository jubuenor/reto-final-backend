import { DateTime } from 'luxon'
import { BaseModel, column,hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form'

export default class User extends BaseModel {
  @column({ isPrimary: true }) public Id: number
  @column() public first_name:string
  @column() public second_name:string
  @column() public surname:string
  @column() public second_surname:string
  @column() public type_document:number
  @column() public document_number:number
  @column() public email:string
  @column() public password:string
  @column() public rol_id:number
  @column() public phone:string
  @column() public state:boolean

  @hasOne(()=>Form,{
    localKey:'Id',
    foreignKey:'student_id'
  })
  public student_id:HasOne<typeof Form>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
