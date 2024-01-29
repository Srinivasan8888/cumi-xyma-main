const mongoose = require("mongoose");
const { Schema } = mongoose;

const assetSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    thickness: {
        type: String,
    },
    devicetemp: {
        type: Number,
    },
    signal: {
        type: Number,
    },
    batterylevel: {
        type: Number,
    }
});

const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;