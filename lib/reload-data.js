require('dotenv').config()
const dumpData = require('./dump-data')
const loadData = require('./load-data')
const confirmUrl = process.env.DATO_CONFIRM_URL

const reloadData = () => dumpData().then(loadData)

module.exports = reloadData
