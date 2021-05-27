'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DailyFleetEquip extends Model {
    equipment () {
        return this.belongsTo("App/Models/MasEquipment", "equip_id", "id")
    }
}

module.exports = DailyFleetEquip
