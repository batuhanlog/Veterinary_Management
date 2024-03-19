const BASE_URL = "http://localhost:3000/api/v1/vaccine";

export const VaccineService = {
    getAllVaccines: () => {
        return fetch(`${BASE_URL}`)
            .then(response => response.json())
            .catch(error => console.error('Hata:', error));
    },

    getVaccineById: (id) => {
        return fetch(`${BASE_URL}/${id}`)
            .then(response => response.json())
            .catch(error => console.error('Hata:', error));
    },

    createVaccine: (vaccineData) => {
        return fetch(`${BASE_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vaccineData),
        }).then(response => response.json())
          .catch(error => console.error('Hata:', error));
    },

    updateVaccine: (id, vaccineData) => {
        return fetch(`${BASE_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vaccineData),
        }).then(response => response.json())
          .catch(error => console.error('Hata:', error));
    },

    deleteVaccine: (id) => {
        return fetch(`${BASE_URL}/delete/${id}`, {
            method: 'DELETE',
        }).then(response => {
            if (!response.ok) {
                throw new Error('Silme işlemi başarısız.');
            }
        }).catch(error => console.error('Hata:', error));
    }
};