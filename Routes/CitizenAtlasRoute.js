const router = require('express').Router()
const { response } = require('express')
const log = require('log4js').getLogger("users");
const request = require('request')

router.get('/locationverifier/initialetters/:initals', async(req, res) => {
    var initailsLetters = req.params.initals
    try {
        if (!initailsLetters) {
            log.debug('initailsLetters not found')
            res.status(406).send(`Passed Inital letters ${initailsLetters}`)
        }
        res.setHeader('Content-Type', 'application/json')

        var requestOptions = {
            'method': "GET",
            'url': `https://citizenatlas.dc.gov/newwebservices/locationverifier.asmx/getDCAddresses2?initialetters=${initailsLetters}&f=json`,
            'headers': {
                "User-Agent": "NodeServer/14.13.0"
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