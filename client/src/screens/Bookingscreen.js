import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import { confirmAlert } from 'react-confirm-alert'; // Import the library
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the CSS

function Bookingscreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState(null);
  const { roomid, startDate, endDate } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if(!localStorage.getItem('currentUser')){
        window.location.href='/login'
      }
      try {
        setLoading(true);
        const response = await axios.post('/api/rooms/getroombyid', { roomid });
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchData();
  }, [roomid]);

  const parsedStartDate = startDate ? moment(startDate) : null;
  const parsedEndDate = endDate ? moment(endDate) : null;

  const isValidDate = (date) => date && !isNaN(date.valueOf());
  const totalDays = isValidDate(parsedStartDate) && isValidDate(parsedEndDate) ? parsedEndDate.diff(parsedStartDate, 'days') : null;

  const bookRoom = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(currentUser);
      if (!currentUser || !currentUser._id || !room) {
        throw new Error("User or room data is missing.");
      }
      const totalamount = totalDays !== null ? totalDays * room.rentperday : null;
      const bookingDetails = {
        room,
        userId: currentUser._id,
        startDate,
        endDate,
        totalamount,
        totalDays
      };

      confirmAlert({
        title: 'Confirm Booking',
        message: 'Are you sure you want to book this room?',
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              await axios.post('http://localhost:5000/api/bookings/bookroom', bookingDetails);
              // Handle success
              console.log("success");
              alert('Your booking is confirmed');
            }
          },
          {
            label: 'No',
            onClick: async() => {
              await axios.post('http://localhost:5000/api/bookings/bookroom', bookingDetails);
              // Handle success
              console.log("Error");
              alert('Oops your Booking is not confirmed')
            }
          }
        ]
      });
    } catch (error) {
      // Handle error
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div>
      <div className='m-5'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : room ? (
          <div className='row bs'>
            <div className='col-md-5'>
              <h1>{room.name}</h1>
              {room.imageurls && room.imageurls.length > 0 && (
                <img src={room.imageurls[0]} className='bigimg' alt='Room' />
              )}
            </div>
            <div className='col-md-5 '></div>
            <h1>Booking Details</h1>
            <hr />
            <div>
              <b>
                <p>Name: {JSON.parse(localStorage.getItem('currentUser')).name} </p>
                <p>From Date : {moment(startDate).format('DD-MM-YYYY')} </p>
                <p>To Date: {moment(endDate).format('DD-MM-YYYY')}</p>
                <p>Max Count : {room.maxcount}</p>
              </b>
            </div>
            <div>
              <h1>Amount</h1>
              <hr />
              <b>
                <p>Total days: {totalDays !== null ? totalDays : 'Invalid Dates'}</p>
                <p>Rent per day : {room.rentperday}</p>
                <p>Total Amount : {totalDays !== null ? totalDays * room.rentperday : 'N/A'}</p>
              </b>
            </div>
            <div style={{ textAlign: 'left' }}>
              <button className='btn btn-primary' onClick={bookRoom}>Pay Now</button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Bookingscreen;
