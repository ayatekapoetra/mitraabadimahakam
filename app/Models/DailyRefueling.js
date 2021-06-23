'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DailyRefueling extends Model {
    timesheet () {
        return this.belongsTo("App/Models/DailyChecklist", "timesheet_id", "id")
    }

    equipment () {
        return this.belongsTo("App/Models/MasEquipment", "equip_id", "id")
    }

    operator_unit () {
        return this.belongsTo("App/Models/MasEmployee", "operator", "id")
    }
}

module.exports = DailyRefueling
