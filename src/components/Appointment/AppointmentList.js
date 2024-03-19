import React, { useState, useEffect } from 'react';
import { AppointmentService } from '../../services/AppointmentService';
import './Appointment.css';



function AppointmentList() {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({ appointmentDate: '', animalId: '', doctorId: '' });
    const [updateAppointment, setUpdateAppointment] = useState({ id: null, appointmentDate: '', animalId: '', doctorId: '' });

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await AppointmentService.getAllAppointments();
    
                const appointmentsWithDetails = await Promise.all(data.map(async (appointment) => {
                    const doctorName = await fetchDoctorById(appointment.doctorId);
                    const animalName = await fetchAnimalById(appointment.animalId);
                    return { ...appointment, doctorName, animalName };
                }));
    
                setAppointments(appointmentsWithDetails);
            } catch (error) {
                // ... hata yönetimi
            }
        };
    
        fetchAppointments();
    }, []);
    



    const fetchDoctorById = async (doctorId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/doctor/${doctorId}`);
            if (!response.ok) {
                throw new Error('Doktor bilgisi alınamadı');
            }
            const doctorData = await response.json(); 
            return doctorData.name; // Doktor ismini döndür
        } catch (error) {
            console.error('Doktor bilgisi alınırken hata:', error);
            return 'Doktor Bilinmiyor'; // Hata durumunda varsayılan değer
        }
    };
    
    
    const fetchAnimalById = async (animalId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/animals/${animalId}`);
            if (!response.ok) {
                throw new Error('Hayvan bilgisi alınamadı');
            }
            const animalData = await response.json(); 
            return animalData.name; // Hayvan ismini döndür
        } catch (error) {
            console.error('Hayvan bilgisi alınırken hata:', error);
            return 'Hayvan Bilinmiyor'; // Hata durumunda varsayılan değer
        }
    };

    const handleInputChange = (e) => {
        setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/v1/appointmentDate/create-with-doctor-and-animal/' + newAppointment.doctorId + '/' + newAppointment.animalId, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ appointmentDate: newAppointment.appointmentDate })
        })
            .then(() => {
                // Refresh appointments list after adding
                fetchAppointments(); 
            })
            .catch(error => console.error('Error adding appointment', error));
    };
    
    
    const handleNewAppointmentSubmit = async (e) => {
        e.preventDefault();
        try {
            await AppointmentService.createAppointment(newAppointment.doctorId, newAppointment.animalId, newAppointment.appointmentDate);
            await fetchAppointments();
            setNewAppointment({ appointmentDate: '', animalId: '', doctorId: '' }); // Reset form
        } catch (error) {
            console.error('Error creating new appointment:', error);
        }
    };
    
    const fetchAppointments = async () => {
        try {
            const data = await AppointmentService.getAllAppointments();
            const appointmentsWithDetails = await Promise.all(data.map(async (appointment) => {
                const doctorName = await fetchDoctorById(appointment.doctorId);
                const animalName = await fetchAnimalById(appointment.animalId);
                return { ...appointment, doctorName, animalName };
            }));
    
            console.log("Randevular ve Detayları:", appointmentsWithDetails); // Bu satırı ekleyin
            setAppointments(appointmentsWithDetails);
        } catch (error) {
            console.error('Randevu listesi alınırken hata oluştu:', error);
        }
    };
    
    const handleDelete = (id) => {
        fetch('/api/v1/appointmentDate/delete/' + id, {
            method: 'DELETE'
        })
            .then(() => {
                // Refresh appointments list after deletion
                setAppointments(appointments.filter(appointment => appointment.id !== id));
            })
            .catch(error => console.error('Error deleting appointment', error));
    };

    const handleUpdateAppointmentSubmit = async (e) => {
        e.preventDefault();
        try {
            await AppointmentService.updateAppointment(updateAppointment.id, updateAppointment.appointmentDate, updateAppointment.doctorId, updateAppointment.animalId);
            await fetchAppointments();
            setUpdateAppointment({ id: null, appointmentDate: '', animalId: '', doctorId: '' }); // Reset form
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const setAppointmentToUpdate = (appointment) => {
        setUpdateAppointment({ ...appointment });
    };


    const fetchAdditionalDetails = async (appointment) => {
        try {
            console.log('Fetching details for appointment:', appointment);
    
            const doctor = appointment.doctorId ? await fetchDoctorById(appointment.doctorId) : { name: 'Bilinmiyor' };
            const animal = appointment.animalId ? await fetchAnimalById(appointment.animalId) : { name: 'Bilinmiyor' };
    
            console.log('Fetched doctor:', doctor, 'Fetched animal:', animal);
    
            return { ...appointment, doctorName: doctor.name, animalName: animal.name };
        } catch (error) {
            console.error('Ek bilgiler alınırken hata oluştu:', error);
            return appointment;
        }
    };
    


    const parseDate = (dateTime) => {
        if (!dateTime) {
            return { valid: false, date: null };
        }

        try {
            const [datePart, timePart] = dateTime.split(' ');
            const [day, month, year] = datePart.split('/');
            return { valid: true, date: new Date(`${year}-${month}-${day}T${timePart}`) };
        } catch (error) {
            console.error('Tarih parse edilirken hata:', error);
            return { valid: false, date: null };
        }
    };

    return (
        <div className="appointment-container">
            <h1>Randevu Listesi</h1>

            {/* Add New Appointment Form */}
            <form onSubmit={handleNewAppointmentSubmit}>
                {/* Form fields for newAppointment */}
                {/* Submit button */}
            </form>

            {/* Update Appointment Form */}
            <form onSubmit={handleUpdateAppointmentSubmit}>
                {/* Form fields for updateAppointment */}
                {/* Submit button */}
            </form>
            
            <div>
            <h2>Appointment List</h2>
            <form onSubmit={handleSubmit}>
                <input type="datetime-local" name="appointmentDate" value={newAppointment.appointmentDate} onChange={handleInputChange} required />
                <input type="number" name="animalId" placeholder="Animal ID" value={newAppointment.animalId} onChange={handleInputChange} required />
                <input type="number" name="doctorId" placeholder="Doctor ID" value={newAppointment.doctorId} onChange={handleInputChange} required />
                <button type="submit">Add Appointment</button>
            </form>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment.id}>
                        {appointment.appointmentDate} - Animal ID: {appointment.animalId}, Doctor ID: {appointment.doctorId}
                        <button onClick={() => handleDelete(appointment.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>

            <table className="appointment-table">
                <thead>
                    <tr>
                        <th>Appointment ID</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Doktor ID</th>
                        <th>Doktor Name</th>
                        <th>Animal ID</th>
                        <th>Animal Name</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        const { valid, date } = parseDate(appointment.appointmentDate); // API'deki alan adı kullanılıyor
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{valid ? date.toLocaleDateString() : 'Geçersiz Tarih'}</td>
                                <td>{valid ? date.toLocaleTimeString() : 'Geçersiz Saat'}</td>
                                <td>{appointment.doctorId}</td>
                                <td>{appointment.doctorName}</td> 
                                <td>{appointment.animalId}</td>
                                <td>{appointment.animalName}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentList;
