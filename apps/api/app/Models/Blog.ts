import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Blog extends BaseModel {
  public static table = 'blog'

  @column({ isPrimary: true })
  public id: number

  @column()
  public author_id: number

  @belongsTo(() => User, {
    foreignKey: 'author_id',
  })
  public user: BelongsTo<typeof User>

  @column()
  public title: string

  @column()
  public label: string

  @column()
  public preface: string

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public updated_at: DateTime

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime
}
