import React, { useState, useEffect } from 'react';
import { AvailableDateService } from '../../services/AvailableDateService';
import './AvailableDate.css';

function AvailableDateList() {
    const [dates, setDates] = useState([]);
    const [newDate, setNewDate] = useState({ date: '' });
    const [dateId, setDateId] = useState('');
    const [editingDate, setEditingDate] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [doctorId, setDoctorId] = useState('');

    useEffect(() => {
        fetchDates();
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
            await AvailableDateService.createDateWithDoctor({ date: newDate.date }, doctorId);
            // Form sıfırlama ve tarihleri tekrar çekme
            setNewDate({ date: '' });
            setDoctorId('');
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

            {/* Yeni müsait gün ekleme formu */}
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
                    placeholder="Doctor ID" 
                />
                <button className="btn btn-primary mx-2" onClick={handleAddDate}>Ekle</button>
            </div>

            {/* Müsait Günler Listesi */}
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
                            <td>{date.doctor ? date.doctor.name : 'Doktor Bilgisi Yok'}</td>
                            <td>
                                {!editMode || (editMode && editingDate && editingDate.id !== date.id) ? (
                                    <button className="btn btn-warning" onClick={() => handleEditClick(date)}>Düzenle</button>
                                ) : (
                                    <>
                                        <button className="btn btn-success" onClick={handleUpdateDate}>Kaydet</button>
                                        <button className="btn btn-secondary mx-2" onClick={() => setEditMode(false)}>İptal</button>
                                    </>
                                )}
                                <button className="btn btn-danger" onClick={() => handleDelete(date.id)}>Sil</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default AvailableDateList;
