import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from '../src/components/Navbar/Navbar';
import Home from '../src/components/Home/Home';
import AnimalList from '../src/components/Animal/AnimalList';
import DoctorList from '../src/components/Doctor/DoctorList';
import CustomerList from '../src/components/Customer/CustomerList';
import AppointmentList from '../src/components/Appointment/AppointmentList';
import VaccineList from '../src/components/Vaccine/VaccineList';
import AvailableDateList from '../src/components/Available_Date/AvailableDateList';
import ReportList from '../src/components/Report/ReportList';

function App() {
    return (
        <Router>
            <div>
                {/* Navbar */}
                <Navbar />
                
                {/* Navbar Linkleri */}
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/animals" element={<AnimalList />} />
                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/customers" element={<CustomerList />} />
                    <Route path="/appointments" element={<AppointmentList />} />
                    <Route path="/vaccines" element={<VaccineList />} />
                    <Route path="/available-dates" element={<AvailableDateList />} /> 
                    <Route path="/reports" element={<ReportList />} /> {/* Güncellenmiş satır */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
