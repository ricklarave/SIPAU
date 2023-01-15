const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const route = express.Router()

route.get('/', function(req, res) {
    console.log(req.query.parametro)
    const filtro_administrador = req.query.parametro;
    controller.get_administrador( filtro_administrador )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 500) )
})

route.post('/', function(req, res) {
    console.log('ADD')
    controller.add_administrador( req.body )
        .then( (data) => response.success(req, res, data, 201) )
        .catch( (error) => response.error(req, res, error, 500) )
})

route.put('/', function(req, res) {
    console.log("UPDATE")

    controller.update_administrador( req.body )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 500) )
})

route.delete('/', function(req, res) {
    controller.delete_administrador( req.body.idadministrador )
        .then( (data) => response.success(req, res, data, 200) )
        .catch( (error) => response.error(req, res, error, 500) )
})

module.exports = route
