import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user'
  protected tableName_1 = 'blog'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned().primary()
      table.string('email')
      table.string('password')
    })

    this.schema.createTable(this.tableName_1, (table) => {
      table.increments('id').unsigned().primary()
      table.string('title')
      table.string('label')
      table.string('preface')
      table.string('title')
      table.string('author')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
