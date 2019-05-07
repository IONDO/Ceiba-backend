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

router.get('/flights', (req, res, next) => {
  Flight.find({})
    .then(flights => {
      res.status(200).json({ flights })
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
  const { outboundFlightId, departureDate, inboundFlightId, returnDate } = req.body.data;
  const owner = req.session.currentUser._id;
  const newTrip = await Trip.create({ owner, outboundFlightId, departureDate, inboundFlightId, returnDate });
  res.status(201).json(newTrip);
})


router.get('/trips', (req, res, next) => {
  const owner = req.session.currentUser._id;
  Trip.find({ owner })
    .then(trips => {
      res.status(200).json({ trips })
    })
    .catch(next)
}) 

router.get('/trips/:tripId', async (req, res, next) => {
  const {tripId} = req.params;
  try {
    const trip = await Trip.findById(tripId);
    const outboundFlight = await Flight.findById(trip.outboundFlightId)
    const inboundFlight = trip.inboundFlightId ? await Flight.findById(trip.inboundFlightId) : undefined
    return res.status(200).json({ outboundFlight, inboundFlight});
  } catch(error) {
    next(error);
  }
})


module.exports = router;
