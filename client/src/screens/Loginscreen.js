import React, { useState } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    async function loginUser() {
        const user = {
            email,
            password,
        };

        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log(response.data);
            setLoading(false);

            localStorage.setItem('currentUser', JSON.stringify(response.data));
            
            window.location.href = '/home';
        } catch (error) {
            console.error(error);
            setLoading(false);
            setError(true);
        }
    }

    return (
        <div>
            {loading && <Loader />}
        
            <div className='row mt-5' style={{ justifyContent: 'center' }}>
                <div className='col-md-5 mt-5'>
                {error && <Error message='Invalid Login' />}
                    <div className='bs'>
                        <h2>Login</h2>
                        <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='text' className='form-control' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className='btn btn-primary mt-3' onClick={loginUser}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
