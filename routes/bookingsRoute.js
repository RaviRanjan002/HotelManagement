const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room"); // Import the Room model
const moment = require("moment");

router.post("/bookroom", async (req, res) => {
    const {
      room,
      userId,
      startDate,
      endDate,
      totalamount,
      totalDays
    } = req.body;
  
    // Check if room is not null before proceeding
    if (!room || !room._id) {
      return res.status(400).json({
        error: "Room object is missing or invalid."
      });
    }
  
    try {
      // Format the start and end dates using moment after destructuring
      const formattedStartDate = moment(startDate).format("DD-MM-YYYY");
      const formattedEndDate = moment(endDate).format("DD-MM-YYYY");

      const newbooking = new Booking({
        room: room.name,
        roomid: room._id,
        userid: userId,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        totalamount,
        totalDays,
        status: "booked", // Add status field
        totaldays: totalDays, // Add totaldays field
        transactionId: '1234'
      });
  
      const booking = await newbooking.save();

      const roomtemp = await Room.findOne({_id : room._id})
      roomtemp.currentbookings.push({
        bookingid : booking._id ,
         startDate : formattedStartDate ,
          endDate : formattedEndDate,
          userid : userId,
          status : booking.status
         })

         await roomtemp.save()
      res.send('Room Booked Successfully');
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        error: error.message
      });
    }
});

router.post("/getbookingsbyuserid", async(req,res) => {
  const userid = req.body.userid

  try{
    const bookings = await Booking.find({userid : userid})
    res.send(bookings)
  } catch(error){
      return res.status(400).json({ error });
  }
})


router.post("/cancelbooking", async(req, res)=>{
  const {bookingid , roomid} = req.body
  try{
    const bookingitem = await Booking.findOne({_id : bookingid})
    bookingitem.status = 'cancelled'
    await bookingitem.save()

    const room = await Room.findOne({_id : roomid})
    let tempBookings = room.currentbookings.filter(booking => booking.bookingid.toString() !== bookingid)
    room.currentbookings = tempBookings
    await room.save()

    res.send('Your booking cancelled Successfully')
  } catch(error){
     return res.status(400).json({ error });
  }
})

module.exports = router;
