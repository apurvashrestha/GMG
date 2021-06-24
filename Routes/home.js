const router = require('express').Router()
var log = require('log4js').getLogger("home");

router.get('/', async(req, res) => {
    log.debug("Health Check Successfull");
    await res.json({
        status: {
            errorCode: '0',
            message: 'Successful Connection Established.'
        }
    })
})

module.exports = router