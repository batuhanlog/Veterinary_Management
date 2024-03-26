import React, { useState, useEffect } from 'react';
import { AvailableDateService } from '../../services/AvailableDateService';
import './AvailableDate.css';
import axios from 'axios';

function AvailableDateList() {
    const [dates, setDates] = useState([]);
    const [newDate, setNewDate] = useState({ date: '' });
    const [dateId, setDateId] = useState('');
    const [editingDate, setEditingDate] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [availableDate, setAvailableDate] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [doctors, setDoctors] = useState([]); 
    



    useEffect(() => {
        fetchDates();
        fetchDoctors();
    }, []);

    const fetchDates = async () => {
        try {
            const fetchedDates = await AvailableDateService.getAllDates();
            setDates(fetchedDates);
        } catch (error) {
            console.error('Müsait günler alınırken bir hata oluştu:', error);
        }
    };

    const handleAddDate = async () => {

        try {
            await AvailableDateService.createDateWithDoctor(newDate, newDate.doctorId);
            setNewDate({ date: '', doctorId: '' });
            fetchDates();
        } catch (error) {
            console.error('Müsait gün eklenirken hata:', error);
        }
    };
    

    const handleUpdateDate = async () => {
        try {
            await AvailableDateService.updateDate(editingDate.id, editingDate);
            setEditingDate(null);
            setEditMode(false);
            fetchDates();
        } catch (error) {
            console.error('Müsait gün güncellenirken bir hata oluştu:', error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('/api/v1/doctor');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/available_date/create-with-doctor', {
                availableDate: newDate,
                doctorId: doctorId,
            });
            console.log(response.data);
            setNewDate('');
            setDoctorId('');
            // Optionally, refresh the list of dates
            fetchDates();
        } catch (error) {
            console.error('Error creating available date', error);
        }
    };
    

    const handleEditClick = (date) => {
        setEditingDate({ ...date });
        setEditMode(true);
    };

    const handleDelete = async (id) => {
        try {
            await AvailableDateService.deleteDate(id);
            fetchDates();
        } catch (error) {
            console.error('Müsait gün silinirken bir hata oluştu:', error);
        }
    };

    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        
        <div className="available-date-list-container">

            <h1 className="mt-3 text-center">Müsait Günler Listesi</h1>
   
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tarih</th>
                        <th>Doktor ID</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
               <tbody>
                    {dates.map(date => (
                        <tr key={date.id}>
                            <td>{date.id}</td>
                            <td>{editMode && editingDate && editingDate.id === date.id ? (
                                <input
                                    type="date"
                                    value={editingDate.date}
                                    onChange={(e) => setEditingDate({ ...editingDate, date: e.target.value })}
                                />
                            ) : (
                                parseDate(date.availableDate)
                            )}</td>
                            <td>{date.doctorId ? date.doctorId : 'Doktor Bilgisi Yok'}</td>
                            <td>
                                {!editMode || (editMode && editingDate && editingDate.id !== date.id) ? (
                                    <button className="btn btn-warning" style={{backgroundColor : "#E36414", color: "white"}} onClick={() => handleEditClick(date)}>Düzenle</button>
                                ) : (
                                    <>
                                        <button className="btn btn-success" onClick={handleUpdateDate}>Kaydet</button>
                                        <button className="btn btn-secondary mx-2" style={{backgroundColor : "#4F4A45", color: "white"}} onClick={() => setEditMode(false)}>İptal</button>
                                    </>
                                )}
                                <button className="btn btn-danger" style={{backgroundColor : "#4F4A45", color: "white"}}  onClick={() => handleDelete(date.id)}>Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>



<div className="mb-3">
    <input 
        type="date" 
        value={newDate.date} 
        onChange={(e) => setNewDate({ ...newDate, date: e.target.value })} 
        placeholder="Tarih" 
    />
    <input 
        type="number" 
        value={doctorId} 
        onChange={(e) => setDoctorId(e.target.value)}
        placeholder="Doktor ID" 
    />
    <button className="btn btn-primary mx-2"  style={{ backgroundColor:  "green" }} onClick={handleAddDate}>Ekle</button>
</div>

            <div className="mb-3">
                <input 
                    type="date" 
                    value={newDate.date} 
                    onChange={(e) => setNewDate({ ...newDate, date: e.target.value })} 
                    placeholder="Tarih" 
                />
                <input 
                    type="number" 
                    value={newDate.doctorId} 
                    onChange={(e) => setNewDate({ ...newDate, doctorId: e.target.value })}
                    placeholder="Doktor ID" 
                />
                <button className="btn btn-primary mx-2" style={{ backgroundColor:  "#2D9596" }} onClick={handleAddDate}>Ekle</button>
            </div>

             {/* New Form for Adding Available Dates */}
        <div>
        <h2>Add New Available Date</h2>
    <form onSubmit={handleSubmit}>
    <input 
        type="number" 
        value={doctorId} 
        onChange={(e) => setDoctorId(e.target.value)}
        placeholder="Doktor ID" 
    />
        <div>
        <label>Doctor:</label>
        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
            <option value="">Select a Doctor</option>
            {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                </option>
            ))}
            </select>
        </div>
        <div>
            <label>Date:</label>
            <input 
                type="date" 
                value={newDate} 
                onChange={(e) => setNewDate(e.target.value)} 
            />
        </div>
        <button type="submit">Add Date</button>
    </form>
        </div>


        </div>
    );

}

export default AvailableDateList;
