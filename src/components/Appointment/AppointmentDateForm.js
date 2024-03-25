import React, { useState } from 'react';
import axios from 'axios';

const AppointmentDateForm = () => {
    const [appointmentDate, setAppointmentDate] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [animalId, setAnimalId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/appointmentDate/create-with-doctor-and-animal/' + doctorId + '/' + animalId, {
                appointmentDate
            });
            console.log(response.data);
  
        } catch (error) {
            console.error('AppointmentDate kaydedilemedi:', error);
       
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="datetime-local"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <input
                type="text"
                value={doctorId}
                placeholder="Doctor ID"
                onChange={(e) => setDoctorId(e.target.value)}
            />
            <input
                type="text"
                value={animalId}
                placeholder="Animal ID"
                onChange={(e) => setAnimalId(e.target.value)}
            />
            <button type="submit">Randevu Kaydet</button>
        </form>
    );
};

export default AppointmentDateForm;
