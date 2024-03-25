const BASE_URL = "http://localhost:3000/api/v1/vaccine";

export const VaccineService = {
    getAllVaccines: async () => {
        try {
            const response = await fetch(`${BASE_URL}`);
            if (!response.ok) throw new Error('Error fetching vaccines.');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    getVaccineById: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);
            if (!response.ok) throw new Error('Error fetching vaccine details.');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    createVaccine: async (vaccineData) => {
        try {
            const response = await fetch(`${BASE_URL}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vaccineData)
            });
            if (!response.ok) throw new Error('Error creating vaccine.');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    updateVaccine: async (id, vaccineData) => {
        try {
            const response = await fetch(`${BASE_URL}/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vaccineData)
            });
            if (!response.ok) throw new Error('Error updating vaccine.');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    deleteVaccine: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/delete/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error deleting vaccine.');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    getAll: async () => {
        try {
            const response = await fetch(`${BASE_URL}`);
            if (!response.ok) throw new Error('Error fetching vaccines.');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    getById: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);
            if (!response.ok) throw new Error('Error fetching vaccine details.');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    create: async (vaccineData) => {
        try {
            const response = await fetch(`${BASE_URL}/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vaccineData)
            });
            if (!response.ok) throw new Error('Error creating vaccine.');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    update: async (id, vaccineData) => {
        try {
            const response = await fetch(`${BASE_URL}/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vaccineData)
            });
            if (!response.ok) throw new Error('Error updating vaccine.');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    },

    delete: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/delete/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Error deleting vaccine.');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    }

};
