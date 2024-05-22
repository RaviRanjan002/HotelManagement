import React, { useState } from 'react';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success'; 

import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState()
    const [success , setsuccess] = useState()

    async function register() {
        if (password === cpassword) {
            const user = { name, email, password, cpassword };

            try {
                setLoading(true);
                const response = await axios.post('/api/users/register', user);
                setLoading(false);
                setsuccess(true);
                console.log(response.data);
            } catch (error) {
                console.error(error);
                setLoading(false);
                setError(true);
            }
        } else {
            alert('Passwords do not match');
        }
    }

    return (
        <div>


        {loading && (<Loader/>)}
        {error && (<Error/>)}

            <div className='row mt-5' style={{ justifyContent: 'center' }}>
                <div className='col-md-5 mt-5'>
                {success && <Success message="Registration success" />}
                    <div className='bs'>
                        <h2>Register</h2>
                        <input type='text' className='form-control' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='text' className='form-control' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input type='text' className='form-control' placeholder='confirm password' value={cpassword} onChange={(e) => setCPassword(e.target.value)} />
                        <button className='btn btn-primary mt-3' onClick={register}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
