import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Form from './Form';

export default class Answer extends BaseModel {
  @column({ isPrimary: true }) public id_answer: number
  @column() public answer:string
  @column() public is_correct:boolean
  @column() public question_id:number
  @column() public state:boolean

  @hasOne(()=> Form,{
    localKey:'id_answer',
    foreignKey:'id_answer'
  })
  public id_form:HasOne<typeof Form>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
