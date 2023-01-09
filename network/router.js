const residente = require('../components/residente/interface')
const administrador = require('../components/administrador/interface')


const routes = function(server) {
    server.use('/residente', residente)
    server.use('/administrador', administrador)

}

module.exports = routes