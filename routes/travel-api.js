const express = require('express');
const router = express.Router();
const moment = require('moment');
const Flight = require('../models/flight');
const Route = require('../models/route');
const Trip = require('../models/trip');

router.get('/routes', (req, res, next) => {
  Route.find({})
    .then(routes => {
      res.status(200).json({ routes })
    })
    .catch(next)
})

router.get('/flights/search', (req, res, next) => {
  const from = req.query.from || { $exists: true }
  const to = req.query.to || { $exists: true }
  const departWeekday = req.query.depart 
    ? moment(req.query.depart, 'DD/MM/YYYY').format("dddd")
    : { $exists: true }
  Flight.find({ from_code: from, to_code: to, weekdays: departWeekday })
    .then(flights => {
      res.status(200).json({ flights })
    })
    .catch(next)
})

router.post('/trips', async (req, res, next) => {
  const { outboundFlightId, inboundFlightId } = req.body.data;
  const owner = req.session.currentUser._id;
  const newTrip = await Trip.create({ owner, outboundFlightId, inboundFlightId });
  res.status(201).json(newTrip);
})

module.exports = router;
