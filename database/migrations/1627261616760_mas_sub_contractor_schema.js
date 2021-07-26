'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MasSubContractorSchema extends Schema {
  up () {
    this.create('mas_sub_contractors', (table) => {
      table.increments()
      table.string('kode').notNullable()
      table.string('name').notNullable()
      table.string('email').defaultTo('')
      table.string('phone').defaultTo('')
      table.string('address').defaultTo('')
      table.enu('aktif', ['Y', 'N']).defaultTo('Y')
      table.timestamps()
    })
  }

  down () {
    this.drop('mas_sub_contractors')
  }
}

module.exports = MasSubContractorSchema
