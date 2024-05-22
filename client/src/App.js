import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import Routes component
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Register';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Landingscreen from './screens/Landingscreen';





function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes> {/* Wrap Route components inside Routes */}
          <Route path="/home"  element={<Homescreen />} /> {/* Use element prop to render component */}
          <Route path = "/book/:roomid/:startDate/:endDate" Component={Bookingscreen}/>
          <Route path='/register' Component={Registerscreen}/>
          <Route path='/login' Component={Loginscreen}/>
          <Route path='/profile' Component={Profilescreen}/>
          <Route path='/' Component={Landingscreen}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
