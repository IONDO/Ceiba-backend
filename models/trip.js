const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    outboundFlightId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    departureDate: Date,
    inboundFlightId: {
        type: Schema.Types.ObjectId,
        date: Date
    },
    returnDate: Date
});

tripSchema.index({
    owner: 1
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;