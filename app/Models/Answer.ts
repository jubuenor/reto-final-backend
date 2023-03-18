import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form';

export default class Answer extends BaseModel {
  @column({ isPrimary: true }) public id_answer: number
  @column() public answer:string
  @column() public is_correct:boolean
  @column() public id_question:number
  @column() public state:boolean

  @hasMany(()=> Form,{
    localKey:'id_answer',
    foreignKey:'id_answer'
  })
  public id_form:HasMany<typeof Form>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
