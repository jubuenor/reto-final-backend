import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Questions extends BaseSchema {
  protected tableName = 'questions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_question').primary();
      table.string('question').notNullable();
      table.boolean('state').defaultTo(true);
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
