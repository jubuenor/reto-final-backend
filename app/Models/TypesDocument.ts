import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class TypesDocument extends BaseModel {
  @column({ isPrimary: true }) public id_typeDocument: number
  @column() public name:string
  @column() public state:boolean

  @hasOne(()=>User,{
    localKey:'id_typeDocument',
    foreignKey:'id_typeDocument'
  })
  public id_user:HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
