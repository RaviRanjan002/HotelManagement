const express = require("express");
const router = express.Router();



const Room = require('../models/room')


router.get("/getallrooms", async(req,res) =>{

    try{
        const rooms = await Room.find({})
        res.send(rooms)
    }catch (error){
        return res.status(400).json({ message: error});
    }
});
router.post("/getavailablerooms", async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        // Implement logic to find available rooms based on start and end dates
        // For example, you can query the database for rooms that are not booked during the specified period
        const availableRooms = await Room.find({
            currentbookings: {
                $not: {
                    $elemMatch: {
                        startDate: { $lte: endDate },
                        endDate: { $gte: startDate }
                    }
                }
            }
        });
        res.send(availableRooms);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});



router.post("/getroombyid", async(req,res) =>{
    const roomid = req.body.roomid;
    console.log("Room ID:", roomid); // Add this line to check if roomid is received

    try{
        const room = await Room.findOne({_id : roomid}); // Corrected 'findone' to 'findOne'

        res.send(room);
        console.log(room);
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

module.exports = router;