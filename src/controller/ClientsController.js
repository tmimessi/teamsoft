const knex = require('../database/knex')

class ClientsController {
  async create(req, res) {
    const { cnpj, razao_social, nome, telefone, enderecos } = req.body

    const client_id = await knex('clients').insert({
      cnpj,
      razao_social,
      nome,
      telefone
    })

    if (enderecos.length > 0) {
      const addressesInsert = enderecos.map(endereco => {
        return {
          client_id,
          ...endereco
        }
      })

      await knex('addresses').insert(addressesInsert)
    }

    const client = await knex('clients').where('id', client_id).first()
    const clientAddresses = await knex('addresses').where(
      'client_id',
      client_id
    )

    return res.status(201).json({ ...client, addresses: clientAddresses })
  }

  async update(req, res) {
    const { cnpj, razao_social, nome, telefone, enderecos } = req.body
    const { id } = req.params
    const client = await knex('clients').where({ id }).first()

    client.cnpj = cnpj ?? client.cnpj
    client.razao_social = razao_social ?? client.razao_social
    client.nome = nome ?? client.nome
    client.telefone = telefone ?? client.telefone

    await knex('clients').where({ id }).update(client)

    if (enderecos.length > 0) {
      enderecos.map(async ({ id, ...rest }) => {
        await knex('addresses').where({ id }).update(rest)
      })
    }

    return res.json({client, addresses: enderecos})
  }

  async index(req, res) {
    const clients = await knex('clients')
    const addresses = await knex('addresses')

    const clientsWithAddresses = clients.map(client => {
      const clientAddresses = addresses.filter(
        address => address.client_id === client.id
      )

      return {
        ...client,
        addresses: clientAddresses
      }
    })

    return res.json(clientsWithAddresses)
  }

  async delete(req, res) {
    const { id } = req.params
    await knex('clients').where({ id }).delete()
    return res.json()
  }
}

module.exports = ClientsController
