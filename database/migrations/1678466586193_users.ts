import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_user').primary();
      table.string('first_name').notNullable();
      table.string('second_name').notNullable();
      table.string('surname').notNullable();
      table.string('second_surname').notNullable();
      table.integer('id_type_document').references('id_type_document').inTable('types_documents');
      table.string('document_number').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.integer('id_rol').references('id_rol').inTable('roles');
      table.string('phone').notNullable();
      table.boolean('state').defaultTo(true);
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
