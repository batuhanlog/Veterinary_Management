import React, { useState, useEffect, useContext } from 'react';
import { AppointmentService } from '../../services/AppointmentService';
import axios from 'axios';
import './Appointment.css';
import { AnimalContext } from '../../components/Animal/AnimalContext';

import AppointmentDateForm from '../../components/Appointment/AppointmentDateForm';




function AppointmentList() {
    const [newAppointment, setNewAppointment] = useState({ appointmentDate: '', animalId: '', doctorId: '' });
    const [updateAppointment, setUpdateAppointment] = useState({ id: null, appointmentDate: '', animalId: '', doctorId: '' });
    const { animals, updateAnimals } = useContext(AnimalContext);
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermDoctor, setSearchTermDoctor] = useState('');
    const [newDate, setNewDate] = useState({ date: '' });
    const [doctorId, setDoctorId] = useState('');
    const [animalId, setAnimalId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    
    
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
 

// Tarih ve saati 'DD.MM.YYYY HH:MM:SS' formatından 'YYYY-MM-DDTHH:MM:SS' formatına dönüştüren fonksiyon
/*const convertDateTime = (dateStr, timeStr) => {
    const dateParts = dateStr.split('.');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timeStr}`;
};*/



    

   const filteredAppointments = appointments.filter(appointment => {
        const appointmentDateTime = parseDate(appointment.appointmentDate).date;

        const isWithinRange = startDate && endDate
      ? appointmentDateTime >= new Date(startDate) && appointmentDateTime <= new Date(endDate)
      : true; // Include all dates if no range is set


        const matchesDoctor = searchTermDoctor
          ? appointment.doctorName.toLowerCase().includes(searchTermDoctor.toLowerCase())
          : true;
        const matchesAnimal = searchTerm
          ? appointment.animalName.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        return matchesDoctor && matchesAnimal && isWithinRange;
      }); 
      
 


    const handleUpdate = (id) => {
        const appointmentToUpdate = appointments.find(appointment => appointment.id === id);

        setSelectedAppointment(appointmentToUpdate); 

        
    };


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
          console.error('Error fetching appointments:', error);
        }
      };

    const fetchAnimals = async () => {
        try {
            const response = await fetch('/api/v1/animal'); // Adjust as per your endpoint
            const data = await response.json();
            updateAnimals(data);
        } catch (error) {
            console.error('Error fetching animals:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
        fetchAnimals();
    }, []);

    const getAnimalNameById = (animalId) => {
        const animal = animals.find(animal => animal.id === animalId);
        return animal ? animal.name : 'Unknown';
    };



    const loadAppointments = async () => {
        try {
            const response = await axios.get('https://vet-backend-3gew.onrender.com/api/v1/appointmentDate');
            setAppointments(response.data);
        } catch (error) {
            console.error('Randevular yüklenemedi:', error);
        }
    };

    
    const handleUpdateInputChange = (e) => {
        setUpdateAppointment({ ...updateAppointment, [e.target.name]: e.target.value });
    };
    

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
      
        try {
          // Ensure updateAppointment has an ID
          if (!updateAppointment.id) return; 
      
          await AppointmentService.updateAppointment(updateAppointment);
          await fetchAppointments(); 
          
          setSelectedAppointment(null); 
          setUpdateAppointment({ id: null, appointmentDate: '', animalId: '', doctorId: '' }); // Reset form
        } catch (error) {
          console.error('Error updating appointment:', error);
        }
      };
      

    const fetchDoctorById = async (doctorId) => {
        try {
            const response = await fetch(`https://vet-backend-3gew.onrender.com/api/v1/doctor/${doctorId}`);
            if (!response.ok) {
                throw new Error('Doktor bilgisi alınamadı');
            }
            const doctorData = await response.json(); 
            return doctorData.name; 
        } catch (error) {
            console.error('Doktor bilgisi alınırken hata:', error);
            return 'Doktor Bilinmiyor'; 
        }
    };
    
    
    const fetchAnimalById = async (animalId) => {
        try {
            const response = await fetch(`https://vet-backend-3gew.onrender.com/api/v1/animal/${animalId}`);
            if (!response.ok) {
                throw new Error('Hayvan bilgisi alınamadı');
            }
            const animalData = await response.json(); 
            return animalData.name;
        } catch (error) {
            console.error('Hayvan bilgisi alınırken hata:', error);
            return 'Hayvan Bilinmiyor';
        }
    };



    const handleInputChange = (e) => {
        setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
    };



    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Convert appointmentDate to required format (assuming newAppointment.appointmentDate is in a format like "YYYY-MM-DDTHH:MM:SS")
        const formattedDate = newAppointment.appointmentDate.replace(/-/g, '/').replace('T', ' ');
    
        const payload = {
            appointmentDate: formattedDate,
            doctorId: parseInt(newAppointment.doctorId),
            animalId: parseInt(newAppointment.animalId)
        };
    
        console.log("Sending data:", payload);
    
        fetch(`/api/v1/appointmentDate/create-with-doctor-and-animal/${newAppointment.doctorId}/${newAppointment.animalId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create appointment');
            }
            return response.json();
        })
        .then(data => {
            console.log("Response:", data);
            fetchAppointments();
        })
        .catch(error => console.error('Error adding appointment:', error));
    };
    
    
    
    
    
    const handleNewAppointmentSubmit = async (e) => {
        e.preventDefault();
        try {
            await AppointmentService.createAppointment(newAppointment.doctorId, newAppointment.animalId, newAppointment.appointmentDate);
            await fetchAppointments();
            setNewAppointment({ appointmentDate: '', animalId: '', doctorId: '' });
        } catch (error) {
            console.error('Error creating new appointment:', error);
        }
    };
    

    const handleDelete = (id) => {
        fetch('/api/v1/appointmentDate/delete/' + id, {
            method: 'DELETE'
        })
            .then(() => {
             
                setAppointments(appointments.filter(appointment => appointment.id !== id));
            })
            .catch(error => console.error('Error deleting appointment', error));
    };
    

    return (
        <div className="appointment-container">

          {/* Search Input */}

          {/* Tarih filtresi için yeni inputlar */}
          <label htmlFor="start-date">Başlangıç Tarihi:</label>
            <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
            />

            <label htmlFor="end-date">Bitiş Tarihi:</label>
            <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
            />

          <label htmlFor="doctor-search">Search by Doctor Name:</label>
            <input
            type="text"
            id="doctor-search"
            placeholder="Enter doctor name"
            value={searchTermDoctor}
            onChange={(e) => setSearchTermDoctor(e.target.value)}
            />

            <label htmlFor="animal-search">Search by Animal Name:</label>
          <input
              type="text"
              placeholder="Search by Animal Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />



            <div>
                <h1 className="mt-3 text-center" style={{ color: "#4F4A45" }}>Randevu Listesi</h1>
                <br />
            </div>
    
            <table className="appointment-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tarih</th>
                        <th>Saat</th>
                        <th>Doktor ID</th>
                        <th>Doktor İsmi</th>
                        <th>Hayvan ID</th>
                        <th>Hayvan İsmi</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAppointments.map(appointment => {
                        const { valid, date } = parseDate(appointment.appointmentDate);
                        return (
                            <tr key={appointment.id}>
                                <td>{appointment.id}</td>
                                <td>{valid ? date.toLocaleDateString() : 'Geçersiz Tarih'}</td>
                                <td>{valid ? date.toLocaleTimeString() : 'Geçersiz Saat'}</td>
                                <td>{appointment.doctorId}</td>
                                <td>{appointment.doctorName}</td>
                                <td>{appointment.animalId}</td>
                                <td>{appointment.animalName}</td>
                                <td>
                                    <button onClick={() => handleDelete(appointment.id)}>Delete</button>
                                    <button onClick={() => handleUpdate(appointment.id)}>Edit</button> 
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
    
            <br /><br />
    
            <h2>Randevu Ekle </h2>
            <form onSubmit={handleSubmit}>
                <input type="datetime-local" name="appointmentDate" value={newAppointment.appointmentDate} onChange={handleInputChange} required />
                <input type="number" name="animalId" placeholder="Hayvan ID" value={newAppointment.animalId} onChange={handleInputChange} required />
                <input type="number" name="doctorId" placeholder="Doktor ID" value={newAppointment.doctorId} onChange={handleInputChange} required />
                <button type="submit">Ekle</button>
            </form>
            


        <h2>Update Appointment</h2>
        <form onSubmit={handleUpdateSubmit} className="appointment-update-form"> 
        <div className="form-group">
            <label htmlFor="id">Appointment ID:</label> 
            <input type="text" name="id" id="id" value={selectedAppointment?.id || ''} disabled />
        </div>


  



        <div className="form-group">
        <label htmlFor="appointmentDate">Date:</label> 
        <input type="date" name="appointmentDate" id="appointmentDate" 
        value={selectedAppointment?.appointmentDate?.slice(0, 10) || ''}  /> {/* Extract date part */}
    </div>

        <div className="form-group">
            <label htmlFor="appointmentTime">Time:</label> 
            <input type="time" name="appointmentTime" id="appointmentTime" value={selectedAppointment?.appointmentDate?.slice(11, 16) || ''} onChange={handleUpdateInputChange} required /> {/* Extract time part */}
        </div>

        <div className="form-group">
            <label htmlFor="animalId">Animal ID:</label> 
            <input type="number" name="animalId" id="animalId" value={selectedAppointment?.animalId || ''} onChange={handleUpdateInputChange} required />
        </div>

        <div className="form-group">
            <label htmlFor="doctorId">Doctor ID:</label> 
            <input type="number" name="doctorId" id="doctorId" value={selectedAppointment?.doctorId || ''} onChange={handleUpdateInputChange} required />
        </div>

        <div className="form-actions"> 
            <button type="submit" disabled={!selectedAppointment}>Update</button> 
            <button type="reset" onClick={() => setSelectedAppointment(null)}>Reset</button>
        </div>
        </form>


        </div>
    );
}


export default AppointmentList;
