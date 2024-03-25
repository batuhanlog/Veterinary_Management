

import React, { useState } from 'react';
import axios from 'axios';

const AnimalForm = () => {
    const [animal, setAnimal] = useState({
        name: '',
        species: '',
        breed: '',
        gender: '',
        colour: '',
        dateOfBirth: '',
        customerId: ''  
    });

    const handleChange = (e) => {
        setAnimal({ ...animal, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/v1/animal/create-with-customer/${animal.customerId}`, animal);
            console.log(response.data);
            alert('Hayvan başarıyla kaydedildi!');
        } catch (error) {
            console.error('Hayvan kaydedilemedi:', error);
            alert('Hayvan kaydedilemedi!');
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={animal.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="species" value={animal.species} onChange={handleChange} placeholder="Species" required />
            <input type="text" name="breed" value={animal.breed} onChange={handleChange} placeholder="Breed" required />
            <input type="text" name="gender" value={animal.gender} onChange={handleChange} placeholder="Gender" required />
            <input type="text" name="colour" value={animal.colour} onChange={handleChange} placeholder="Colour" required />
            <input type="date" name="dateOfBirth" value={animal.dateOfBirth} onChange={handleChange} required />
            <input type="number" name="customerId" value={animal.customerId} onChange={handleChange} placeholder="Customer ID" required />
            <button type="submit">Hayvanı Kaydet</button>
        
        </form>
        
    );
};

export default AnimalForm;
