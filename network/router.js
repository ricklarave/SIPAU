const residente = require('../components/residente/interface')
const administrador = require('../components/administrador/interface')
const usuario = require('../components/usuario/interface')
const pagoAlicuota = require('../components/pagoAlicuota/interface')
const verificarPagos = require('../components/verificarPagos/interface')




const routes = function(server) {
    server.use('/residente', residente)
    server.use('/administrador', administrador)
    server.use('/usuario', usuario)
    server.use('/pagoAlicuota', pagoAlicuota)
    server.use('/verificarPagos', verificarPagos)
    

}


module.exports = routes