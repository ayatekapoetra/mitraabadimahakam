'use strict'

const Options = use("App/Models/SysOption")

class AjaxOptionController {
    async index ({request}) {
        const req = request.all()
        const options = (await Options.query().where({group: req.group}).fetch()).toJSON()
        const list = options.map(el => el.nilai === req.selected ? {...el, selected: 'selected'} : {...el, selected: ''})
        // console.log(list)
        return list
    }

    
}

module.exports = AjaxOptionController
