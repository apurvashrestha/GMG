const router = require('express').Router()
const { response } = require('express')
const log = require('log4js').getLogger("users");
const request = require('request')

router.get('/findLocation2/:location', async(req, res) => {
    var localLocation = req.params.location
    try {
        if (!localLocation) {
            log.debug('Location not found')
            res.status(406).send(`Passed Inital letters ${localLocation}`)
        }
        res.setHeader('Content-Type', 'application/json')

        var requestOptions = {
            'method': "GET",
            'url': `https://citizenatlas.dc.gov/newwebservices/locationverifier.asmx/findLocation2?str=${localLocation}&f=json`,
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
                if (obj.returnDataset != null) {
                    log.debug('Address record list pulled')
                    res.status(200).send(obj.returnDataset.Table1) 
                } else {
                    log.debug('Address record list can not be pulled')
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