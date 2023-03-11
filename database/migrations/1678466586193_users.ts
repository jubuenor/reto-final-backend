import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('Id');
      table.string('first_name').notNullable();
      table.string('second_name').notNullable();
      table.string('surname').notNullable();
      table.string('second_surname').notNullable();
      table.integer('type_document').references('Id').inTable('types_documents');
      table.integer('document_number').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.integer('rol_id').references('Id').inTable('roles');
      table.string('phone').notNullable();
      table.boolean('state').notNullable();
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
