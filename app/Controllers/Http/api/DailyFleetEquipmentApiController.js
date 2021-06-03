'use strict'
const { performance } = require('perf_hooks')
const db = use('Database')
const DailyFleetEquip = use("App/Models/DailyFleetEquip")

const moment = require('moment')
const diagnoticTime = use("App/Controllers/Http/customClass/diagnoticTime")

class DailyFleetEquipmentApiController {
    async index ({ auth, request, response }) {
        var t0 = performance.now()
        const req = request.only(['keyword', 'page'])
        const limit = 10
        const page = req.page === undefined ? 1:parseInt(req.page)
        try {
            await auth.authenticator('jwt').getUser()
        } catch (error) {
            console.log(error)
            let durasi = await diagnoticTime.durasi(t0)
            return response.status(403).json({
                diagnostic: {
                    times: durasi, 
                    error: true,
                    message: error.message
                },
                data: []
            })
        }

        let dailyFleet
        if(req.keyword){
            dailyFleet = await DailyFleetEquip
                .query()
                .with('dailyFleet')
                .with('equipment', e => {
                    e.where('kode', 'like', `%${req.keyword}%`)
                    e.orWhere('tipe', 'like', `%${req.keyword}%`)
                    e.orWhere('brand', 'like', `%${req.keyword}%`)
                    e.orWhere('unit_model', 'like', `%${req.keyword}%`)
                })
                .paginate(page, limit)
        }else{
            dailyFleet = await DailyFleetEquip
                .query()
                .with('dailyFleet')
                .with('equipment')
                .paginate(page, limit)
        }

        let durasi = await diagnoticTime.durasi(t0)
        return response.status(200).json({
            diagnostic: {
                times: durasi, 
                error: false
            },
            data: dailyFleet
        })
    }

    async show ({ auth, params, response }) {
        const { id } = params
        // const req = request.only(['keyword'])
        var t0 = performance.now()
        try {
            await auth.authenticator('jwt').getUser()
        } catch (error) {
            console.log(error)
            let durasi = await diagnoticTime.durasi(t0)
            return response.status(403).json({
                diagnostic: {
                    times: durasi, 
                    error: true,
                    message: error.message
                },
                data: []
            })
        }

        let dailyFleet = await DailyFleetEquip.query()
            .with('dailyFleet')
            .with('equipment')
            .where('id', id)
            .first()
        let durasi = await diagnoticTime.durasi(t0)
        return response.status(200).json({
            diagnostic: {
                times: durasi, 
                error: false
            },
            data: dailyFleet
        })
    }

    async update ({ auth, params, request, response }) {
        const { id } = params
        const req = request.only(['equip_id', 'datetime'])
        var t0 = performance.now()
        const { equip_id, datetime } = req
        let durasi

        try {
            await auth.authenticator('jwt').getUser()
        } catch (error) {
            console.log(error)
            let durasi = await diagnoticTime.durasi(t0)
            return response.status(403).json({
                diagnostic: {
                    times: durasi, 
                    error: true,
                    message: error.message
                },
                data: []
            })
        }

        const trx = await db.beginTransaction()
        try {
            const dailyFleetEquip = await DailyFleetEquip.findOrFail(id)
            dailyFleetEquip.merge({ equip_id, datetime })
            await dailyFleetEquip.save(trx)
            await trx.commit(trx)
            let durasi = await diagnoticTime.durasi(t0)
            return response.status(201).json({
                diagnostic: {
                    times: durasi, 
                    error: false
                },
                data: dailyFleetEquip
            })
        } catch (error) {
            console.log(error)
            await trx.rollback(trx)
            return response.status(403).json({
                diagnostic: {
                    times: durasi, 
                    error: false,
                    message: error.message
                },
                data: []
            })
        }
    }

    async destroy ({auth, params, response}) {
        const { id } = params
        var t0 = performance.now()

        try {
            await auth.authenticator('jwt').getUser()
        } catch (error) {
            console.log(error)
            let durasi = await diagnoticTime.durasi(t0)
            return response.status(403).json({
                diagnostic: {
                    times: durasi, 
                    error: true,
                    message: error.message
                },
                data: []
            })
        }

        const trx = await db.beginTransaction()
        try {
            const dailyFleetEquip = await DailyFleetEquip.findOrFail(id)
            await dailyFleetEquip.delete(trx)
            await trx.commit(trx)
            let durasi = await diagnoticTime.durasi(t0)
            return response.status(201).json({
                diagnostic: {
                    times: durasi, 
                    error: false,
                    message: 'success delete data...'
                },
                data: []
            })
        } catch (error) {
            console.log(error)
            await trx.rollback(trx)
            let durasi = await diagnoticTime.durasi(t0)
            return response.status(403).json({
                diagnostic: {
                    times: durasi, 
                    error: false,
                    message: error.message
                },
                data: []
            })
        }
    }
}

module.exports = DailyFleetEquipmentApiController