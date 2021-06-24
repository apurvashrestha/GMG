const router = require('express').Router()
const { response } = require('express')
const log = require('log4js').getLogger("users");
const request = require('request')

router.get('/getBBL/:initals', async(req, res) => {
    var initailsLetters = req.params.initals
    try {
        if (!initailsLetters) {
            log.debug('BBL not found')
            res.status(406).send(`Passed BBL value ${initailsLetters}`)
        }
        res.setHeader('Content-Type', 'application/json')

        var requestOptions = {
            'method': "GET",
            //'url': `https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/DCRA/MapServer/0/query?f=json&where=CUSTOMER_NUMBER=${initialLetters}&outFields=*`,
            'url': `https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/DCRA/MapServer/0/query?f=json&where=CUSTOMER_NUMBER=${initailsLetters}&outFields=*`,
            'headers': {
                "User-Agent": "NodeServer/14.13.1"
            }
        }

        request(requestOptions, function (error, response) {
            if (error) {
                log.debug(error.message())
                res.status(406).send(error)
            } else {
                // const externalUriResp = JSON.stringify(response.body)
                const externalUriResp = response.body
                const obj = JSON.parse(externalUriResp)
                if (obj.features != null) {
                    log.debug('BBL record list pulled')
                    res.status(200).send(obj.features) 
                } else {
                    log.debug('BBL record list can not be pulled')
                    res.status(406).send(error)
                }
            }
        });
    } catch (err) {
        log.debug(err.message())
        res.status(406).send(err)
    }
})

module.exports = router