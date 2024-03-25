const ANIMAL_BASE_URL = "http://vett-backend.onrender.com/api/v1/animal";

export const AnimalService = {
    getAllAnimals: async () => {
        const response = await fetch(`${ANIMAL_BASE_URL}`);
        if (!response.ok) {
            throw new Error('Hayvan verileri alınamadı.');
        }
        return await response.json();
    },

    getAnimalById: async (id) => {
        const response = await fetch(`${ANIMAL_BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Hayvan bilgileri alınamadı.');
        }
        return await response.json();
    },

    getAnimalsByName: async (name) => {
        const response = await fetch(`${ANIMAL_BASE_URL}/filter-by-name?name=${encodeURIComponent(name)}`);
        if (!response.ok) {
            throw new Error('Hayvanları filtrelerken bir hata oluştu.');
        }
        return await response.json();
    },

    createAnimal: async (animalData, customerId) => {
        const response = await fetch(`${ANIMAL_BASE_URL}/create-with-customer/${customerId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(animalData),
        });
        if (!response.ok) {
            throw new Error('Hayvan oluşturma başarısız.');
        }
        return await response.json();
    },
    

    updateAnimal: async (id, animalData) => {
        const response = await fetch(`${ANIMAL_BASE_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(animalData),
        });
        if (!response.ok) {
            throw new Error('Hayvan güncelleme başarısız.');
        }
        return await response.json();
    },

    deleteAnimal: async (id) => {
        const response = await fetch(`${ANIMAL_BASE_URL}/delete/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Hayvan silme başarısız.');
        }
        return response.ok;
    },
};
