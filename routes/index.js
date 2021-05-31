const express = require('express')
const moment = require('moment')
const _ = require('lodash')
const bodyParser = require('body-parser')
const router = express.Router()
const MuseumRecords = require('./controller')

const museumData = new MuseumRecords()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

// API which gets the visitors count based on the query from DB
router.get('/api/visitors', async (req, res, next) => {
  // Check if date is valid or not
  if (!_.isUndefined(req.query.date) && !_.isNull(req.query.date) && !_.isEmpty(req.query.date)) {
    const month = moment.unix(parseInt(req.query.date) / 1000).format('MMM')
    const year = moment.unix(parseInt(req.query.date) / 1000).format('YYYY')
    let ignore = null
    if (!_.isUndefined(req.query.ignore) && !_.isNull(req.query.ignore) && !_.isEmpty(req.query.ignore)) {
      ignore = req.query.ignore
    }
    // Sending normalised query values to execute the DB query in controller
    res.send(await museumData.getVisitorsCount(month, parseInt(year), ignore))
  } else {
    res.send('Invalid date passed')
  }
  next()
})

module.exports = router
