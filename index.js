var config = require('./server/config/config')
var app = require('./server/server')
var logger = require('./server/utils/logger')
var functions = require('firebase-functions')
exports.app=functions.https.onRequest(app)
app.listen(config.port)
logger.log("listening on http://localhost:" + config.port)

