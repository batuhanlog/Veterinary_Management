const BASE_URL = "http://localhost:3000/api/v1/doctor";

export const DoctorService = {
    getAllDoctors: async () => {
        try {
            const response = await fetch(`${BASE_URL}`);
            if (!response.ok) {
                throw new Error('Doktor verileri alınamadı.');
            }
            return await response.json();
        } catch (error) {
            console.error('Hata:', error);

        }
    },

    getDoctorById: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Doktor bilgileri alınamadı.');
            }
            return await response.json();
        } catch (error) {
            console.error('Hata:', error);
     
        }
    },

    createDoctor: async (doctorData) => {
        try {
            const response = await fetch(`${BASE_URL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(doctorData),
            });
            if (!response.ok) {
                throw new Error('Doktor oluşturma başarısız.');
            }
            return await response.json();
        } catch (error) {
            console.error('Hata:', error);
   
        }
    },

    updateDoctor: async (id, doctorData) => {
        try {
            const response = await fetch(`${BASE_URL}/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(doctorData),
            });
            if (!response.ok) {
                throw new Error('Doktor güncelleme başarısız.');
            }
            return await response.json();
        } catch (error) {
            console.error('Hata:', error);
           
        }
    },

    deleteDoctor: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Doktor silme başarısız.');
            }
            return response.ok;
        } catch (error) {
            console.error('Hata:', error);
     
        }
    }
};
