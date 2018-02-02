var router = require('express').Router()
var logger = require('../../utils/logger')
var controller = require('./smsController')
router.route('/')
    .post(controller.post)

module.exports=router