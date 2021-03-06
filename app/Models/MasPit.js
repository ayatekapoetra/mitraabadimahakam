'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MasPit extends Model {
    site () {
        return this.belongsTo("App/Models/MasSite", "site_id", "id")
    }
}

module.exports = MasPit
