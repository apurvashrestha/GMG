const express = require('express')
const dotenv = require('dotenv')

const homeRoute = require('./Routes/home')
const unitRoute = require('./Routes/unit.js')
const condounitRoute = require('./Routes/CondoUnit.js')
const citizenAtlasRoute = require('./Routes/CitizenAtlasRoute')
const getBBL = require('./Routes/getBBL.js')
const findLocation2 = require('./Routes/findLocation2.js')

dotenv.config()

const PORT = process.env.PORT || 80

const app = express()

app.use(express.json())

app.use('/', homeRoute)
app.use('/citizenAtlas', citizenAtlasRoute)
app.use('/unitAtlas', unitRoute)
app.use('/condoUnitAtlas', condounitRoute)
app.use('/getBBL',getBBL)
app.use('/findLocation', findLocation2)

app.listen(PORT, () => console.log('Server Up at localhost:' + PORT))