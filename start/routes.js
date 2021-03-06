'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'WelcomeController.index').as('home').middleware(['MM'])
Route.get('/json', 'WelcomeController.jsonData').as('home')
Route.get('/login', 'AuthController.show').as('auth.login')
Route.post('/login', 'AuthController.login')
Route.get('/logout', 'AuthController.loggingOut').as('auth.logout')

Route.get('/test/user-group', 'TestingDatumController.userGroup')
Route.get('/test/user-module', 'TestingDatumController.userModule')

// MASTER
Route.group(() => {
    // User
    Route.get('/user', 'UserController.index').as('mas.user.index').middleware('R')

    Route.post('/user', 'UserController.store').as('mas.user.store').middleware('C')

    Route.get('/user/search', 'UserController.list').as('mas.user.list')

    Route.get('/user/:id/show', 'UserController.show').as('mas.user.show').middleware('R')

    Route.post('/user/:id/update', 'UserController.update').as('mas.user.update').middleware('U')

    Route.post('/user/:id/delete', 'UserController.delete').as('mas.user.delete').middleware('D')

    // Equipment Unit
    Route.get('/equipment', 'MasEquipmentController.index').as('mas.equipment.index').middleware('R')
    
    Route.post('/equipment', 'MasEquipmentController.store').as('mas.equipment.store').validator('Equipment-Post').middleware('C')
    
    Route.get('/equipment/:id', 'MasEquipmentController.show').as('mas.equipment.show').middleware('R')

    Route.get('/equipment/search', 'MasEquipmentController.list').as('mas.equipment.list')

    Route.post('/equipment/:id/update', 'MasEquipmentController.update').as('mas.equipment.update').middleware('U')

    Route.post('/equipment/:id/delete', 'MasEquipmentController.delete').as('mas.equipment.delete').middleware('D')

    // Employee
    Route.get('/employee', 'MasEmployeeController.index').as('mas.employee.index').middleware('R')

    Route.post('/employee', 'MasEmployeeController.store').as('mas.employee.store').validator('Employee-Post').middleware('C')
    
    Route.get('/employee/search', 'MasEmployeeController.list').as('mas.employee.list')

    Route.get('/employee/:id/show', 'MasEmployeeController.show').as('mas.employee.show').middleware('R')

    Route.post('/employee/:id/update', 'MasEmployeeController.update').as('mas.employee.update').middleware('U')

    Route.post('/employee/:id/delete', 'MasEmployeeController.delete').as('mas.employee.delete').middleware('D')

    // Site
    Route.get('/site', 'MasSiteController.index').as('mas.site.index').middleware('R')

    Route.post('/site', 'MasSiteController.store').as('mas.site.store').middleware('C').validator('Site')

    Route.get('/site/list', 'MasSiteController.list').as('mas.site.list').middleware('R')

    Route.get('/site/:id/show', 'MasSiteController.show').as('mas.site.show').middleware('R')

    Route.post('/site/:id/update', 'MasSiteController.update').as('mas.site.update').middleware('U').validator('Site')

    Route.post('/site/:id/delete', 'MasSiteController.delete').as('mas.site.delete').middleware('D')

    // PIT
    Route.get('/pit', 'MasPitController.index').as('mas.pit.index').middleware('R')

    Route.post('/pit', 'MasPitController.store').as('mas.pit.store').middleware('C').validator('Pit')

    Route.get('/pit/list', 'MasPitController.list').as('mas.pit.list').middleware('R')

    Route.get('/pit/:id/show', 'MasPitController.show').as('mas.pit.show').middleware('R')

    Route.post('/pit/:id/update', 'MasPitController.update').as('mas.pit.update').middleware('U')

    Route.post('/pit/:id/delete', 'MasPitController.delete').as('mas.pit.delete').middleware('D')

    // Shift Schedule
    Route.get('/shift', 'MasShiftController.index').as('mas.shift.index').middleware('R')

    Route.post('/shift', 'MasShiftController.store').as('mas.shift.store').middleware('C').validator('Shift')

    Route.get('/shift/list', 'MasShiftController.list').as('mas.shift.list').middleware('R')

    Route.get('/shift/:id/show', 'MasShiftController.show').as('mas.shift.show').middleware('R')

    Route.post('/shift/:id/update', 'MasShiftController.update').as('mas.shift.update').middleware('U')

    Route.post('/shift/:id/delete', 'MasShiftController.delete').as('mas.shift.delete').middleware('D')

    // Activity
    Route.get('/activity', 'MasActivityController.index').as('mas.activity.index').middleware('R')

    Route.post('/activity', 'MasActivityController.store').as('mas.activity.store').middleware('C')

    Route.get('/activity/list', 'MasActivityController.list').as('mas.activity.list').middleware('R')

    Route.get('/activity/:id/show', 'MasActivityController.show').as('mas.activity.show').middleware('U')

    Route.post('/activity/:id/update', 'MasActivityController.update').as('mas.activity.update').middleware('U')

    Route.post('/activity/:id/delete', 'MasActivityController.delete').as('mas.activity.delete').middleware('D')

    // Fleet
    Route.get('/fleet', 'MasFleetController.index').as('mas.fleet.index').middleware('R')

    Route.post('/fleet', 'MasFleetController.store').as('mas.fleet.store').middleware('C')

    Route.get('/fleet/list', 'MasFleetController.list').as('mas.fleet.list').middleware('R')

    Route.get('/fleet/:id/show', 'MasFleetController.show').as('mas.fleet.show').middleware('U')

    Route.post('/fleet/:id/update', 'MasFleetController.update').as('mas.fleet.update').middleware('U')

    Route.post('/fleet/:id/delete', 'MasFleetController.delete').as('mas.fleet.delete').middleware('D')

}).prefix('master').namespace('master').middleware(['MM'])

// SETTING
Route.group(() => {
    Route.get('/sys-options', 'SysOptionController.index').as('set.sys-options.index').middleware('R')

    Route.post('/sys-options', 'SysOptionController.create').as('set.sys-options.create').validator('Options').middleware('C')

    Route.get('/sys-options/list', 'SysOptionController.list').as('set.sys-options.list').middleware('R')

    Route.get('/sys-options/:id/show', 'SysOptionController.show').as('set.sys-options.show').middleware('R')

    Route.post('/sys-options/:id/update', 'SysOptionController.update').as('set.sys-options.update').middleware('U')

    // User Akses
    Route.get('/usr-akses', 'SysUserAkseController.index').as('set.usr-akses.index').middleware('R')

    Route.post('/usr-akses', 'SysUserAkseController.store').as('set.usr-akses.store').middleware('C')

    Route.get('/usr-akses/list', 'SysUserAkseController.list').as('set.usr-akses.list')

    // User Menu
    Route.get('/usr-menu', 'SysMenuController.index').as('set.usr-menu.index').middleware('R')

    Route.get('/usr-menu/create', 'SysMenuController.create').as('set.usr-menu.create').middleware('R')

    Route.post('/usr-menu/create', 'SysMenuController.store').as('set.usr-menu.store').validator('UserMenu').middleware('C')


}).prefix('setting').namespace('setting').middleware(['MM'])

// OPERATION
Route.group(() => {

    Route.get('/daily-activity', 'DailyActivityController.index').as('opr.daily-activity.index')

    // Daily Fleet
    Route.get('/daily-fleet', 'DailyFleetController.index').as('opr.daily-fleet.index').middleware('R')

    Route.post('/daily-fleet', 'DailyFleetController.store').as('opr.daily-fleet.store').middleware('C')

    Route.get('/daily-fleet/list', 'DailyFleetController.list').as('opr.daily-fleet.list').middleware('R')

    Route.get('/daily-fleet/create', 'DailyFleetController.create').as('opr.daily-fleet.create').middleware('R')

    Route.get('/daily-fleet/:id/show', 'DailyFleetController.show').as('opr.daily-fleet.show').middleware('U')

    Route.post('/daily-fleet/:id/update', 'DailyFleetController.update').as('opr.daily-fleet.update').middleware('U')

    Route.post('/daily-fleet/:id/delete', 'DailyFleetController.delete').as('opr.daily-fleet.delete').middleware('D')

}).prefix('operation').namespace('operation').middleware(['MM'])

// AJAX
Route.group(() => {

    Route.get('/sys-options', 'AjaxOptionController.index').as('set.sys-options.index')

    Route.get('/usr-module', 'AjaxUserAkseController.getUserModule').as('set.sys-options.getUserModule')

    Route.get('/site', 'AjaxSiteController.getSites').as('site.getSites')

    Route.get('/pit', 'AjaxPitController.getPits').as('pit.getPits')

    Route.get('/fleet', 'AjaxFleetController.getFleets').as('fleet.getFleets')

    Route.get('/activity', 'AjaxActivityController.getActivities').as('actitivity.getActivities')
    
    Route.get('/activity/:id', 'AjaxActivityController.getActivitiesID').as('actitivity.getActivitiesID')
    
    Route.get('/shift', 'AjaxShiftController.getShift').as('shift.getShift')

    Route.get('/shift/:id', 'AjaxShiftController.getShiftID').as('shift.getShiftID')

    Route.get('/dealer', 'AjaxDealerController.getDealers').as('dealer.getDealers')

    Route.get('/dealer/:id', 'AjaxDealerController.getDealerId').as('dealer.getDealerId')

}).prefix('ajax').namespace('ajax').middleware(['MM'])

//  API MOBILE
Route.group(() => {

    // Route.post('/login', 'AuthApiController.login').middleware('auth:session,api')
    Route.post('/login', 'AuthApiController.login')

    Route.post('/logout', 'AuthApiController.logout')

    Route.get('/', async () => ({ greeting: 'Welcome to Restfull API with Adonis.js.....' }))

}).prefix('api').namespace('api')

Route.group(() => {

    Route.get('/', 'PitApiController.index')

    Route.get('/:id/show', 'PitApiController.show')

    Route.post('/:id/update', 'PitApiController.update')

}).prefix('api/pit').namespace('api')

Route.group(() => {

    Route.get('/', 'FleetApiController.index')

    Route.get('/:id/show', 'FleetApiController.show')

    Route.post('/:id/update', 'FleetApiController.update')

}).prefix('api/fleet').namespace('api')

Route.group(() => {

    Route.get('/', 'EquipmentApiController.index')

    Route.get('/:id/show', 'EquipmentApiController.show')

    Route.post('/:id/update', 'EquipmentApiController.update')

}).prefix('api/equipment').namespace('api')

Route.group(() => {

    Route.get('/', 'ActivitiesApiController.index')

    Route.get('/:id/show', 'ActivitiesApiController.show')

    Route.post('/:id/update', 'ActivitiesApiController.update')

}).prefix('api/activities').namespace('api')

Route.group(() => {

    Route.get('/', 'ShiftApiController.index')

    Route.get('/:id/show', 'ShiftApiController.show')

    Route.post('/:id/update', 'ShiftApiController.update')

}).prefix('api/shift').namespace('api')

Route.group(() => {

    Route.get('/', 'DailyFleetApiController.index')

    Route.post('/', 'DailyFleetApiController.create')

    Route.get('/:id/show', 'DailyFleetApiController.show')

    Route.post('/:id/update', 'DailyFleetApiController.update')

}).prefix('api/daily-fleet').namespace('api')


Route.get('/401', ({ view }) => view.render('401'))

Route.any('*', ({ view }) => view.render('404'))

