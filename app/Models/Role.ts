import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Role extends BaseModel {
  @column({ isPrimary: true }) public Id: number
  @column() public name:string
  @column() public state:boolean
  @hasOne(()=>User,{
    localKey:'Id',
    foreignKey:'rol_id'
  })
  public rol_id:HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
