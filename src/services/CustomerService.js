const BASE_URL = "http://localhost:3000/api/v1/customer";

export const CustomerService = {
    getAllCustomers: async () => {
        try {
            const response = await fetch(`${BASE_URL}`);
            if (!response.ok) {
                throw new Error('Müşteri verileri alınamadı.');
            }
            return await response.json();
        } catch (error) {
            console.error('Hata:', error);
            throw error;
        }
    },

    getCustomerById: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}`);
            if (!response.ok) {
                throw new Error('Müşteri bilgileri alınamadı.');
            }
            return await response.json();
        } catch (error) {
            console.error('Hata:', error);
            throw error;
        }
    },

    getCustomerWithAnimals: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/${id}/with-animals`);
            if (!response.ok) {
                throw new Error('Müşteri ve hayvan bilgileri alınamadı.');
            }
            return await response.json();
        } catch (error) {
            console.error('Hata:', error);
            throw error;
        }
    },

    createCustomer: async (customerData) => {
        try {
            const response = await fetch(`${BASE_URL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });
            if (!response.ok) {
                throw new Error('Müşteri oluşturma başarısız.');
            }
            return await response.json();
        } catch (error) {
            console.error('Hata:', error);
            throw error;
        }
    },

    updateCustomer: async (id, customerData) => {
        try {
            const response = await fetch(`${BASE_URL}/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerData),
            });
            if (!response.ok) {
            
                throw new Error('Müşteri güncelleme başarısız.');
            }
            return await response.json(); 
        } catch (error) {
            console.error('Hata:', error);
            throw error;
        }
    },
    

    deleteCustomer: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/delete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Müşteri silme başarısız.');
            }
            return response.ok;
        } catch (error) {
            console.error('Hata:', error);
            throw error;
        }
    }
};
