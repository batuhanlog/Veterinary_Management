const BASE_URL = "https://vet-backend-3gew.onrender.com/api/v1/available_date";


const AvailableDateService = {
  getAvailableDates: async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) {
        throw new Error('Error fetching available dates');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  createAvailableDate: async (availableDateData) => {
    try {
      const response = await fetch(`${BASE_URL}/create-with-doctor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(availableDateData),
      });
      if (!response.ok) {
        throw new Error('Error creating available date');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  updateAvailableDate: async (id, availableDateData) => {
    try {
      const response = await fetch(`${BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(availableDateData),
      });
      if (!response.ok) {
        throw new Error('Error updating available date');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  deleteAvailableDate: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error deleting available date');
      }
    } catch (error) {
      throw error;
    }
  }
};

export default AvailableDateService;
