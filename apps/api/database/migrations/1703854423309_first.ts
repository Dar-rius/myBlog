import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user'
  protected tableName_1 = 'blog'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary()
      table.string('username')
      table.string('email')
      table.string('password')
      table.datetime('created_at', { useTz: true }).defaultTo(this.now())
    })

    this.schema.createTable(this.tableName_1, (table) => {
      table.increments('id').unsigned().primary()
      table.integer('author_id').unsigned().references('user.id').onDelete('CASCADE')
      table.string('title')
      table.string('label')
      table.string('preface')
      table.string('content')
      table.datetime('created_at', { useTz: true })
      table.dateTime('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    this.schema.dropTable(this.tableName_1)
  }
}
