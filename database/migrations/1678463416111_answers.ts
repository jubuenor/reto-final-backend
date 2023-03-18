import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Answers extends BaseSchema {
  protected tableName = 'answers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_answer').primary();
      table.string('answer').notNullable();
      table.boolean('is_correct').notNullable();
      table.integer('id_question').references('id_question').inTable('questions').onDelete('CASCADE');
      table.boolean('state').defaultTo(true);
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
