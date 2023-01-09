const residente = require('../components/residente/interface')
const usuario = require('../components/usuario/interface')

const routes = function(server) {
    server.use('/residente', residente)
    server.use('/usuario', usuario)
}

module.exports = routes