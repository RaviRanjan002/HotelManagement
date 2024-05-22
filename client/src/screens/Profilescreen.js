import React, { useEffect, useState } from 'react';
import { Input, Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import swal from 'sweetalert2'
import { Divider, Flex, Tag } from 'antd';
const { TabPane } = Tabs;

const onChange = (key: string) => {
  console.log(key);
};

function Profilescreen() {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      const result = await axios.post("/api/bookings/cancelbooking", { bookingid, roomid });
      console.log(result.data);
      setLoading(false);
      swal.fire('congrats' , 'your Booking has been cancelled' , 'success').then(result=>{
        window.location.reload()
      })
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal.fire('Oops', 'something went wrong' , 'error')
    }
  }

  return (
    <div className='ml-3 mt-3'>
      <Tabs defaultActiveKey="1" onChange={onChange}>
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? 'YES' : 'NO'}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings cancelBooking={cancelBooking} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings({ cancelBooking }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id });
        console.log(response.data);
        setLoading(false);
        setBookings(response.data); // Assuming response is an array of bookings
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          {loading && (<Loader />)}
          {bookings && (bookings.map(booking => {
            return <div className='bs' key={booking._id}>
              <h1>{booking.room}</h1>
              <p><b>BookingId</b>: {booking._id}</p>
              <p><b>CheckIn</b>: {booking.startDate}</p>
              <p><b>Check Out</b>: {booking.endDate}</p>
              <p><b>Amount</b>: {booking.totalamount}</p>
              <p><b>Status</b>: {" "}
              {booking.status=='cancelled' ?  (<Tag color="red">CANCELLED</Tag>) : ( <Tag color="green">CONFIRMED</Tag>)}
               </p>
              {booking.status !== 'cancelled' && <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomid) }}>CANCEL BOOKING</button>}
            </div>
          }))}
        </div>
      </div>
    </div>
  );
}
