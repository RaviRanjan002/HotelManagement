const mongoose = require('mongoose');


const bookingschema = mongoose.Schema ({

        room : {
            type: String,
            required: true
        },
        roomid : {
            type: String,
            required: true
        },
        userid : {
            type: String,
            required: true
        },
        startDate : {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        },
        totalamount : {
            type: Number,
            required: true
        },
        totaldays : {
            type: String,
            required: true
        },
        transactionId : {
            type: String,
            required: true
        },
        status : {
            type: String,
            required: true
        },

})

const bookingmodel = mongoose.model('bookings' , bookingschema);

module.exports = bookingmodel