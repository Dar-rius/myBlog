import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user'
  protected tableName_1 = 'blog'
  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary()
      table.string('username').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.date('created_at').defaultTo(this.now())
    })

    this.schema.createTable(this.tableName_1, (table) => {
      table.increments('id').unsigned().primary()
      table.integer('author_id').unsigned().references('user.id').onDelete('CASCADE')
      table.string('title', 20).notNullable()
      table.string('label').notNullable()
      table.string('preface', 200).notNullable()
      table.string('content').notNullable()
      table.date('created_at').notNullable()
      table.date('updated_at').defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName_1)
    this.schema.dropTable(this.tableName)
  }
}
