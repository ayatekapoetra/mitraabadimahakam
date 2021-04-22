'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const v_Akses = use("App/Models/VPrivilege")


class AksesResourceDelete {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, auth }, next) {
    const uri = (request.url()).split('/')
    const usr = await auth.getUser()
    const name = uri[uri.length - 1]
    
    const akses = await v_Akses.query().where({usertipe: usr.user_tipe, nm_module: name, method: 'D'}).first()
    if(akses){
      await next()
    }else{
      // response.redirect('back')
      response.status(404).json({success: false, message: 'You not authorized....'})
    }
  }
}

module.exports = AksesResourceDelete