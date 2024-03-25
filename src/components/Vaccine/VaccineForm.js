import React, { useState } from 'react';
import { VaccineService } from '../../services/VaccineService'; 

function VaccineForm({ onVaccineAdd }) {
    
    const [vaccine, setVaccine] = useState({
        name: '',
        code: '',
        protectionStartDate: '',
        protectionFinishDate: '',
        reportId: ''
    });

    const handleChange = (e) => {
        setVaccine({ ...vaccine, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const addedVaccine = await VaccineService.createVaccine(vaccine); 
            if(onVaccineAdd) {
                onVaccineAdd(addedVaccine);
            }
            setVaccine({ name: '', code: '', protectionStartDate: '', protectionFinishDate: '', reportId: '' });
        } catch (error) {
            console.error('Error adding vaccine:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Vaccine</h2>
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
            <button type="submit">Add Vaccine</button>
        </form>
    );
}

export default VaccineForm;
