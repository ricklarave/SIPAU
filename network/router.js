const residente = require('../components/residente/interface')

const routes = function(server) {
    server.use('/residente', residente)
}

module.exports = routes