const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    outboundFlight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight',
        required: true
    },
    departureDate: Date,
    inboundFlight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight'
    },
    returnDate: Date
});

tripSchema.index({
    owner: 1
});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;