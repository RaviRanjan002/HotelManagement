import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

function Homescreen() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [duplicateRooms, setDuplicateRooms] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [type, setType] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response;
                if (startDate && endDate) {
                    response = await axios.post('/api/rooms/getavailablerooms', {
                        startDate: moment(startDate).format('DD-MM-YYYY'),
                        endDate: moment(endDate).format('DD-MM-YYYY')
                    });
                } else {
                    response = await axios.get('/api/rooms/getallrooms');
                }
                const data = response.data;
                console.log("Fetched data:", data);
                if (Array.isArray(data)) {
                    console.log("Data is an array:", data);
                    setRooms(data);
                    setDuplicateRooms(data); // Initialize duplicateRooms with fetched data
                } else {
                    console.log("Data is not an array. Setting rooms to empty array.");
                    setRooms([]);
                    setDuplicateRooms([]);
                }
                setLoading(false);
            } catch (error) {
                setError(true);
                console.error('Error fetching rooms:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);

        if (startDate && endDate) {
            const start = moment(startDate).format('DD-MM-YYYY');
            const end = moment(endDate).format('DD-MM-YYYY');

            console.log('Start Date:', start);
            console.log('End Date:', end);

            if (start === end) {
                console.error('Start and end dates cannot be the same:', start);
            }
        }
    };

    const filterByType = (selectedType) => {
        setType(selectedType);
        if (selectedType === 'all') {
            setRooms(duplicateRooms); // Reset rooms to original state
        } else {
            const filteredRooms = duplicateRooms.filter(room => room.type.toLowerCase() === selectedType.toLowerCase());
            setRooms(filteredRooms);
        }
    };

    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-md-3'>
                    <DateRangePicker
                        startDate={startDate}
                        startDateId="startDate"
                        endDate={endDate}
                        endDateId="endDate"
                        onDatesChange={handleDatesChange}
                        focusedInput={focusedInput}
                        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                    />
                </div>
                <div className='col-md-3'>
                    <select className='form-control' value={type} onChange={(e) => filterByType(e.target.value)}>
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option value="non-delux">Non-Delux</option>
                    </select>
                </div>
            </div>
            <div className='row justify-content-center mt-5'>
                {loading ? (<Loader />) : error ? (<Error />) :
                    (rooms.map((room, index) => (
                        <div key={index} className='col-md-9 mt-2'>
                            <Room room={room} startDate={startDate} endDate={endDate} />
                        </div>
                    )))}
            </div>
        </div>
    );
}

export default Homescreen;
