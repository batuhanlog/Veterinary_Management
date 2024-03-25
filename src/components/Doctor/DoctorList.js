import React, { useState, useEffect } from 'react';
import { DoctorService } from '../../services/DoctorService';

function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({ name: '', mail: '', address: '', city: '', phone: '' });
    const [doctorId, setDoctorId] = useState('');
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [editMode, setEditMode] = useState(false); 
    const [doctorDetails, setDoctorDetails] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const fetchedDoctors = await DoctorService.getAllDoctors();
            setDoctors(fetchedDoctors);
        } catch (error) {
            console.error('Doktorlar alınırken bir hata oluştu:', error);
        }
    };

    const handleAddDoctor = async () => {
        try {
            await DoctorService.createDoctor(newDoctor);
         
            setNewDoctor({ name: '', phone: '', mail: '', address: '', city: '' });
        
            fetchDoctors();
        } catch (error) {
            console.error('Doktor eklenirken bir hata oluştu:', error);
        }
    };

    const handleUpdateDoctor = async () => {
        try {
            await DoctorService.updateDoctor(editingDoctor.id, editingDoctor);
            fetchDoctors(); 
            setEditingDoctor(null);
            setEditMode(false); 
        } catch (error) {
            console.error('Doktor güncellenirken bir hata oluştu:', error);
        }
    };
    

    const handleEditClick = (doctor) => {
        setEditingDoctor({ ...doctor });
        setEditMode(true); 
    };

    const handleDelete = async (id) => {
        try {
            await DoctorService.deleteDoctor(id);
            fetchDoctors();
        } catch (error) {
            console.error('Doktor silinirken bir hata oluştu:', error);
        }
    };


    const handleGetByIdSubmit = async () => {
        try {
            const doctor = await DoctorService.getDoctorById(doctorId);
            setDoctorDetails(doctor);
        } catch (error) {
            console.error('Doktor alınırken bir hata oluştu:', error);

        }
    };


    return (
        <div className="container">
            <h1 className="mt-3 text-center" style={{ color: "#4F4A45" }}>Doktor İşlemleri</h1>
            
 
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">İsim</th>
                        <th scope="col">Email</th>
                        <th scope="col">Adres</th>
                        <th scope="col">Şehir</th>
                        <th scope="col">Telefon</th>
                        <th scope="col">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors && doctors.map(doctor => (
                        <tr key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{editMode && editingDoctor && editingDoctor.id === doctor.id ? (
                                <input
                                    type="text"
                                    value={editingDoctor.name}
                                    onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })}
                                />
                            ) : (
                                doctor.name
                            )}</td>
                            <td>{editMode && editingDoctor && editingDoctor.id === doctor.id ? (
                                <input
                                    type="text"
                                    value={editingDoctor.mail}
                                    onChange={(e) => setEditingDoctor({ ...editingDoctor, mail: e.target.value })}
                                />
                            ) : (
                                doctor.mail
                            )}</td>
                            <td>{editMode && editingDoctor && editingDoctor.id === doctor.id ? (
                                <input
                                    type="text"
                                    value={editingDoctor.address}
                                    onChange={(e) => setEditingDoctor({ ...editingDoctor, address: e.target.value })}
                                />
                            ) : (
                                doctor.address
                            )}</td>
                            <td>{editMode && editingDoctor && editingDoctor.id === doctor.id ? (
                                <input
                                    type="text"
                                    value={editingDoctor.city}
                                    onChange={(e) => setEditingDoctor({ ...editingDoctor, city: e.target.value })}
                                />
                            ) : (
                                doctor.city
                            )}</td>
                            <td>{editMode && editingDoctor && editingDoctor.id === doctor.id ? (
                                <input
                                    type="text"
                                    value={editingDoctor.phone}
                                    onChange={(e) => setEditingDoctor({ ...editingDoctor, phone: e.target.value })}
                                />
                            ) : (
                                doctor.phone
                            )}</td>
                            <td>
                                {!editMode || (editMode && editingDoctor && editingDoctor.id !== doctor.id) ? (
                                    <button 
                                    className="btn btn-warning" 
                                    onClick={() => handleEditClick(doctor)}
                                    style={{
                                        backgroundColor: '#E36414', 
                                        color: '#ffffff' 
                                    }}
                                >
                                    Değiştir
                                </button>
                                
                                ) : (
                                    <>
                                        <button className="btn btn-success" onClick={handleUpdateDoctor}>Save</button>
                                        <button className="btn btn-secondary mx-2" onClick={() => setEditMode(false)}>Cancel</button>
                                    </>
                                )}
                                <button 
                                className="btn btn-danger" 
                                onClick={() => handleDelete(doctor.id)}
                                style={{
                                    backgroundColor: '#4F4A45', 
                                    color: '#ffffff'
                                }}
                                >
                                Sil
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mb-3">
                <input type="text" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} placeholder="Doctor ID" />
                <button 
                className="btn btn-primary mx-2" 
                onClick={handleGetByIdSubmit}
                style={{ 
                    backgroundColor: '#2D9596', 
                  
    }}
>
    ID no ile ara
</button>
            </div>

            {doctorDetails && (
                <div>
                    <h2>Doktor Detayları:</h2>
                    <p><strong>ID:</strong> {doctorDetails.id}</p>
                    <p><strong>İsim:</strong> {doctorDetails.name}</p>
                    <p><strong>Email:</strong> {doctorDetails.mail}</p>
                    <p><strong>Adres:</strong> {doctorDetails.address}</p>
                    <p><strong>Şehir:</strong> {doctorDetails.city}</p>
                    <p><strong>Telefon:</strong> {doctorDetails.phone}</p>
                </div>
            )}

                        {/* Yeni doktor ekleme formu */}
                        <h2>Doktor Ekle</h2>
                        <div className="mb-3">
                <input type="text" value={newDoctor.name} onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })} placeholder="İsim" />
                <input type="text" value={newDoctor.mail} onChange={(e) => setNewDoctor({ ...newDoctor, mail: e.target.value })} placeholder="Email" />
                <br></br>
                <br></br>
                <input type="text" value={newDoctor.address} onChange={(e) => setNewDoctor({ ...newDoctor, address: e.target.value })} placeholder="Adres" />
                <input type="text" value={newDoctor.city} onChange={(e) => setNewDoctor({ ...newDoctor, city: e.target.value })} placeholder="Şehir" />
                <br></br>
                <br></br>
                <input type="text" value={newDoctor.phone} onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })} placeholder="Telefon" />
            
                
                <button 
                className="btn btn-primary mx-2" 
                onClick={handleAddDoctor}
                style={{ 
                    backgroundColor: '#2D9596', 
                  
            }}
            >
            Doktor Ekle
            </button>


            </div>

        </div>

        
    );
}

export default DoctorList;