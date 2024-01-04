import { DateTime } from 'luxon'
import { beforeSave, BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Blog from './Blog'

export default class User extends BaseModel {
  public static table = 'user'

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

  @beforeSave()
  public static async hasPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
