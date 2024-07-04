const mongoose = require('mongoose')

const BidSchema = new mongoose.Schema({
    companyName: {
        type: String,
        Required: true
    },
    bidCost: {
        type: Number,
        Required: true
    },
    flag: {
        type: String,
        default: "No"
    },

    bidTime: {
        type: Date,
        default: Date.now
    }


}, { timestamps: true })
const BidModel = mongoose.model('userbid', BidSchema)

module.exports = BidModel