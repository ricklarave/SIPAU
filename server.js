const express = require('express')
const bodyParser = require('body-parser')

const config = require('./config')
const router = require('./network/router')

var app = express()

app.use( bodyParser.json() )
app.use( bodyParser.urlencoded({extended:false}) )

router( app )

app.use(config.CLIENT_URL, express.static(config.CIENT_DIR))

app.listen( config.PORT )
console.log( `La aplicación está escuchando en http://${config.HOST}:${config.PORT}`)