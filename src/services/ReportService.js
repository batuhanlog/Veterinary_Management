import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/v1/report'; 

const getReports = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createReport = async (reportData) => {
  try {
    const response = await axios.post(BASE_URL, reportData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateReport = async (id, reportData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, reportData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteReport = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    throw error;
  }
};

export { getReports, createReport, updateReport, deleteReport };
