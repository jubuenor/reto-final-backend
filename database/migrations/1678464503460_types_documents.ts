import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TypesDocuments extends BaseSchema {
  protected tableName = 'types_documents'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id_type_document').primary();
      table.string('name').notNullable();
      table.boolean('state').defaultTo(true);
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
