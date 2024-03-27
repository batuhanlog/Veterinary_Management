import React, { useState, useEffect } from 'react';
import { VaccineService } from '../../services/VaccineService';
import VaccineForm from '../Vaccine/VaccineForm';
import '../Vaccine/VaccineList.css';

function VaccineList() {
    const [vaccines, setVaccines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingVaccine, setEditingVaccine] = useState(null);


        // Function to set the vaccine to be edited
    const handleEdit = (vaccine) => {
        setEditingVaccine(vaccine);
    };

    const fetchVaccines = async () => {
        setLoading(true);
        try {
            const response = await VaccineService.getAllVaccines();
            setVaccines(response || []);
        } catch (error) {
            setError('Error fetching vaccines: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateVaccine = async (vaccineData) => {
        try {
            await VaccineService.updateVaccine(vaccineData.id, vaccineData);
            setEditingVaccine(null); // Clear edit state
            fetchVaccines(); // Refresh list
        } catch (error) {
            setError('Error updating vaccine: ' + error.message);
        }
    };

    // Function to handle the deletion of a vaccine
    const handleDelete = async (id) => {
        try {
            await VaccineService.deleteVaccine(id);
            // Fetch the updated list of vaccines
            fetchVaccines();
        } catch (error) {
            setError('Error deleting vaccine: ' + error.message);
        }
    };

    useEffect(() => {
        fetchVaccines();
    }, []);

    // Define addVaccineToList function
    const addVaccineToList = (newVaccine) => {
        setVaccines([...vaccines, newVaccine]);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="vaccine-list-container">
            <h2 className="list-heading">Vaccine List</h2>
            {vaccines.length > 0 ? (
                <table className='vaccine-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Protection Start Date</th>
                            <th>Protection Finish Date</th>
                            <th>Report ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {vaccines.map((vaccine) => (
                    <tr key={vaccine.id}>
                        <td>{vaccine.id}</td>
                        <td>{vaccine.name}</td>
                        <td>{vaccine.code}</td>
                        <td>{vaccine.protectionStartDate}</td>
                        <td>{vaccine.protectionFinishDate}</td>
                        <td>{vaccine.reportId}</td>
                        <td>
                            <button className="edit-button" onClick={() => handleEdit(vaccine)}>Edit</button>
                            <button className="delete-button" onClick={() => handleDelete(vaccine.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                    </tbody>
                </table>
            ) : (
                <p>No vaccines found.</p>
            )}


            {/* Include VaccineForm if it's being used /}
            {/ <VaccineForm /> /}

            <h2 className="form-heading">Add Vaccine</h2>
            {/ Pass addVaccineToList as a prop to VaccineForm */}
            <VaccineForm className="vaccine-form" onVaccineAdd={addVaccineToList} 
         
            onVaccineUpdate={handleUpdateVaccine}
            isUpdate={Boolean(editingVaccine)}
            editingVaccine={editingVaccine}
            
            />

        </div>
    );
}

export default VaccineList;
