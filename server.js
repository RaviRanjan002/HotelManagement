const express = require("express");
const cors = require("cors")
const app = express();

const dbconfig = require('./db');
const roomsRoute = require('./routes/roomsRoute')
const usersRoute = require('./routes/userRoute')
const bookingsRoute = require('./routes/bookingsRoute')
app.use(express.json())
app.use(cors());

app.use('/api/rooms' , roomsRoute)
app.use('/api/users' , usersRoute)
app.use('/api/bookings' , bookingsRoute)

const port = process.env.PORT  || 5000;

app.listen(port, () => console.log('node server started using nodemon'));
