import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true }) public id_question: number
  @column() public question:string
  @column() public options:object
  @column() public state:boolean
  
  @hasOne(()=>Answer,{
    localKey:'id_question',
    foreignKey:'id_question'
  })
  public id_answer:HasOne<typeof Answer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
