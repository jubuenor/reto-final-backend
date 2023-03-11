import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Answer from './Answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true }) public Id: number
  @column() public question:string
  @column() public state:boolean
  
  @hasOne(()=>Answer,{
    localKey:'Id',
    foreignKey:'question_id'
  })
  public question_id:HasOne<typeof Answer>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
