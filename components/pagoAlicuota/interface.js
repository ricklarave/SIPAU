const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')

const route = express.Router()

route.get('/', function (req, res) {
    const filtro_pagoAlicuota = req.query.parametro || "";
    controller.get_pagoAlicuota(filtro_pagoAlicuota)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 500))
})

route.post('/', function (req, res) {
    controller.add_pagoAlicuota(req.body)
        .then((data) => response.success(req, res, data, 201))
        .catch((error) => response.error(req, res, error, 500))
})

route.put('/', function (req, res) {
    controller.update_pagoAlicuota(req.body)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 500))
})

route.delete('/', function (req, res) {
    controller.delete_pagoAlicuota(req.body.idpago)
        .then((data) => response.success(req, res, data, 200))
        .catch((error) => response.error(req, res, error, 500))
})

module.exports = route