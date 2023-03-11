import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class TypeDocument extends BaseModel {
  @column({ isPrimary: true }) public Id: number
  @column() public name:string
  @column() public state:boolean

  @hasOne(()=>User,{
    localKey:'Id',
    foreignKey:'type_document'
  })
  public type_documen:HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
