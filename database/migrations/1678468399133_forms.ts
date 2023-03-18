import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Forms extends BaseSchema {
  protected tableName = 'forms'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_form').primary();
      table.integer('id_student').references('id_user').inTable('users');
      table.integer('id_answer').references('id_answer').inTable('answers').onDelete('CASCADE');
      table.boolean('state').defaultTo(true);
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
