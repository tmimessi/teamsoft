exports.up = knex =>
  knex.schema.createTable('addresses', table => {
    table.increments('id')
    table.text('logradouro')
    table.integer('numero')
    table.text('complemento')
    table.text('bairro')
    table.text('cidade')
    table.text('estado')
    table.text('cep')
    table
      .integer('client_id')
      .unsigned()
      .references('clients.id')
      .onDelete('CASCADE')
  })

exports.down = knex => knex.schema.dropTable('addresses')
