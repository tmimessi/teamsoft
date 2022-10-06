exports.up = knex =>
  knex.schema.createTable('clients', table => {
    table.text('cnpj')
    table.increments('id')
    table.text('razao_social')
    table.text('nome')
    table.text('telefone')
  })

exports.down = knex => knex.schema.dropTable('clients')
