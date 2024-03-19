import React, { useState, useEffect } from 'react';

function VaccineList() {
    const [vaccines, setVaccines] = useState([]);
    const [newVaccine, setNewVaccine] = useState({
        name: '',
        code: '',
        protectionStartDate: '',
        protectionFinishDate: '',
        animalId: ''
    });
    const [editingVaccine, setEditingVaccine] = useState(null);

    useEffect(() => {
        fetchVaccines();
    }, []);

    const fetchVaccines = async () => {
        try {
            const response = await fetch('/api/v1/vaccine');
            if (!response.ok) throw new Error('Failed to fetch vaccines');
            const data = await response.json();
            setVaccines(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    const handleInputChange = (e) => {
        setNewVaccine({ ...newVaccine, [e.target.name]: e.target.value });
    };

    const handleAddVaccine = async () => {
        try {
            const response = await fetch('/api/v1/vaccine/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newVaccine)
            });
            if (!response.ok) throw new Error('Failed to add vaccine');
            await fetchVaccines();
            setNewVaccine({ name: '', code: '', protectionStartDate: '', protectionFinishDate: '', animalId: '' });
        } catch (error) {
            console.error('Add error:', error);
        }
    };
    const startEdit = (vaccine) => {
        setEditingVaccine({ ...vaccine });
    };

    const handleEditChange = (e) => {
        setEditingVaccine({ ...editingVaccine, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/vaccine/update/${editingVaccine.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingVaccine)
            });
            if (!response.ok) throw new Error('Failed to update vaccine');
            setEditingVaccine(null);
            await fetchVaccines();
        } catch (error) {
            console.error('Edit error:', error);
        }
    };

    

    const handleDeleteVaccine = async (vaccineId) => {
        try {
            const response = await fetch(`/api/v1/vaccine/delete/${vaccineId}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete vaccine');
            await fetchVaccines();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    return (
        <div>

            <div>
            <h1>Vaccine List</h1>
            {/* Form for adding new vaccine */}
            {/* ... */}

            {/* Table to display vaccines */}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Protection Start Date</th>
                        <th>Protection Finish Date</th>
                        <th>Animal ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vaccines.map((vaccine) => (
                        <tr key={vaccine.id}>
                            <td>{vaccine.name}</td>
                            <td>{vaccine.code}</td>
                            <td>{vaccine.protectionStartDate}</td>
                            <td>{vaccine.protectionFinishDate}</td>
                            <td>{vaccine.animalId}</td>
                            <td>
                                <button onClick={() => {/* Add logic to edit vaccine */}}>Edit</button>
                                <button onClick={() => handleDeleteVaccine(vaccine.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div>
        <h1>Vaccine List</h1>
        {/* Yeni aşı ekleme formu */}
        {/* ... */}

        {/* Düzenleme formu */}
        {editingVaccine && (
            <form onSubmit={handleEditSubmit}>
                <input type="text" name="name" placeholder="Name" value={editingVaccine.name} onChange={handleEditChange} />
                <input type="text" name="code" placeholder="Code" value={editingVaccine.code} onChange={handleEditChange} />
                {/* Diğer input alanları */}
                <button type="submit">Update Vaccine</button>
            </form>
        )}

        {/* Aşı listesi tablosu */}
        {/* ... */}
    </div>

            <h1>Vaccine List</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleAddVaccine(); }}>
                <input type="text" name="name" placeholder="Name" value={newVaccine.name} onChange={handleInputChange} required />
                <input type="text" name="code" placeholder="Code" value={newVaccine.code} onChange={handleInputChange} required />
                <input type="date" name="protectionStartDate" placeholder="Start Date" value={newVaccine.protectionStartDate} onChange={handleInputChange} required />
                <input type="date" name="protectionFinishDate" placeholder="Finish Date" value={newVaccine.protectionFinishDate} onChange={handleInputChange} required />
                <input type="number" name="animalId" placeholder="Animal ID" value={newVaccine.animalId} onChange={handleInputChange} required />
                <button type="submit">Add Vaccine</button>
            </form>
            <ul>
                {vaccines.map((vaccine) => (
                    <li key={vaccine.id}>
                        {vaccine.name} - {vaccine.code}
                        <button onClick={() => handleDeleteVaccine(vaccine.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            
        </div>

        

        
    );
}

export default VaccineList;
