import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Blog from './Blog'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public password: string

  @hasMany(() => Blog, {
    foreignKey: 'author_id',
  })
  public user: HasMany<typeof Blog>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime
}
