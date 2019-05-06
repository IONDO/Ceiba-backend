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
    inboundFlightId: Schema.Types.ObjectId
});

tripSchema.index({owner: 1});

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip;