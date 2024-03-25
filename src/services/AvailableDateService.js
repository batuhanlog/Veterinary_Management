const BASE_URL = "http://vett-backend.onrender.com/api/v1/available_date";

export const AvailableDateService = {
    getAllDates: async () => {
        const response = await fetch(`${BASE_URL}`);
        if (!response.ok) {
            throw new Error('Müsait günler alınamadı.');
        }
        const dates = await response.json();
        return dates.map(date => ({
            ...date,
            doctorName: date.doctor ? date.doctor.name : 'Doktor Bilgisi Yok'
        }));
    },
    

    getDateById: async (id) => {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Müsait gün bilgisi alınamadı.');
        }
        const date = await response.json();
        return {
            ...date,
            doctorName: date.doctor ? date.doctor.name : 'Doktor Bilgisi Yok'
        };
    },

    createDate: async (dateData, doctorId) => {
        const response = await fetch(`${BASE_URL}/create-with-doctor/${doctorId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...dateData,
                availableDate: new Date(dateData.date).toISOString().split('T')[0]
            }),
        });
        if (!response.ok) {
            throw new Error('Müsait gün oluşturma başarısız.');
        }
        return await response.json();
    },

    updateDate: async (id, dateData) => {
        const response = await fetch(`${BASE_URL}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...dateData,
                availableDate: new Date(dateData.date).toISOString().split('T')[0]  // yyyy-MM-dd formatına dönüştür
            }),
        });
        if (!response.ok) {
            throw new Error('Müsait gün güncelleme başarısız.');
        }
        return await response.json();
    },

    createDateWithDoctor: async (dateData, doctorId) => {
    
        const formattedDateData = {
            ...dateData,
            availableDate: new Date(dateData.date).toISOString().split('T')[0]
        };
    

        const response = await fetch(`${BASE_URL}/create-with-doctor/${doctorId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedDateData),
        });
        if (!response.ok) {
            throw new Error('Müsait gün oluşturma başarısız.');
        }
        return await response.json();
    },
    

    deleteDate: async (id) => {
        const response = await fetch(`${BASE_URL}/delete/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Müsait gün silme başarısız.');
        }
        return response.ok;
    }
};
