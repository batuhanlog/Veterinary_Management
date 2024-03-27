import React, { useState } from 'react';
import { VaccineService } from '../../services/VaccineService'; 

function VaccineForm({ onVaccineAdd, isUpdate, editingVaccine, onVaccineUpdate }) {
    // Initial state will now depend on whether we are updating an existing vaccine
    const initialState = isUpdate && editingVaccine ? editingVaccine : {
        name: '',
        code: '',
        protectionStartDate: '',
        protectionFinishDate: '',
        reportId: ''
    };

    const [vaccine, setVaccine] = useState(initialState);

    const handleChange = (e) => {
        setVaccine({ ...vaccine, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isUpdate) {
                // Ensure we have the vaccine's ID for the update
                const updatedVaccineData = { ...vaccine, id: editingVaccine.id };
                response = await VaccineService.updateVaccine(updatedVaccineData.id, updatedVaccineData);
                if (onVaccineUpdate) {
                    onVaccineUpdate(response);
                }
            } else {
                response = await VaccineService.createVaccine(vaccine);
                if (onVaccineAdd) {
                    onVaccineAdd(response);
                }
            }
            setVaccine(initialState);
        } catch (error) {
            console.error('Error in form submission:', error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isUpdate ? 'Update Vaccine' : 'Add Vaccine'}</h2>

            {isUpdate && (
                <div>
                    <label>Vaccine ID:</label>
                    <input
                        type="text"
                        name="id"
                        value={editingVaccine.id}
                        readOnly
                    />
                </div>
            )}

            <div>
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={vaccine.name} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>Code:</label>
                <input 
                    type="text" 
                    name="code" 
                    value={vaccine.code} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>Protection Start Date:</label>
                <input 
                    type="date" 
                    name="protectionStartDate" 
                    value={vaccine.protectionStartDate} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>Protection Finish Date:</label>
                <input 
                    type="date" 
                    name="protectionFinishDate" 
                    value={vaccine.protectionFinishDate} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>Report ID:</label>
                <input 
                    type="number" 
                    name="reportId" 
                    value={vaccine.reportId} 
                    onChange={handleChange} 
                />
            </div>
            <button type="submit">{isUpdate ? 'Update Vaccine' : 'Add Vaccine'}</button>

        </form>
    );
}

export default VaccineForm;
