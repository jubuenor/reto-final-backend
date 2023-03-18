import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Role extends BaseModel {
  @column({ isPrimary: true }) public id_rol:number
  @column() public name:string
  @column() public state:boolean

  @hasMany(()=>User,{
    localKey:'id_rol',
    foreignKey:'id_rol'
  })
  public id_user:HasMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
