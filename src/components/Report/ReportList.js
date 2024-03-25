import React, { useState, useEffect } from 'react';
import './ReportList.css';
import axios from 'axios';

import { getReports, createReport, updateReport, deleteReport } from '../../services/ReportService';

const BASE_URL = 'http://localhost:3000/api/v1/report'; 

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentReport, setCurrentReport] = useState({ id: '', title: '', diagnosis: '', price: '', appointmentId: '' });
 

  useEffect(() => {
    loadReports();
    fetch('http://localhost:3000/api/v1/report') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setReports(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);




  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentReport({ ...currentReport, [name]: value });
  };

  const createReport = async (reportData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, reportData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

 /* const createReport = async (reportData) => {
    try {
      await fetch(`${BASE_URL}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      });
      loadReports();
    } catch (error) {
      console.error('Failed to create report:', error);
    }
  }; */

  const updateReport = async (id, reportData) => {
    try {
      await fetch(`${BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData)
      });
      loadReports();
    } catch (error) {
      console.error('Failed to update report:', error);
    }
  };

  const deleteReport = async (id) => {
    try {
        await fetch(`${BASE_URL}/delete/${id}`, { method: 'DELETE' });
      loadReports();
    } catch (error) {
      console.error('Failed to delete report:', error);
    }
  };

  const editReport = (report) => {
    setEditing(true);
    setCurrentReport({ ...report });
  };

  

  
  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await getReports();
      setReports(data);
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    }
    setLoading(false);
  };
  
  /*const handleSubmit = async (event) => {
    event.preventDefault();
    if (editing) {
      try {
        await updateReport(currentReport.id, currentReport);
        setEditing(false);
        setCurrentReport({ id: '', title: '', diagnosis: '', price: '', appointmentId: '' });
        loadReports();
      } catch (error) {
        console.error('Failed to update report:', error);
      }
    } else {
      try {
        await createReport(currentReport);
        setCurrentReport({ id: '', title: '', diagnosis: '', price: '', appointmentId: '' });
        loadReports();
      } catch (error) {
        console.error('Failed to create report:', error);
      }
    }
  }; */

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editing) {
      try {
        await updateReport(currentReport.id, currentReport);
        setEditing(false);
        setCurrentReport({ id: '', title: '', diagnosis: '', price: '', appointmentId: '' });
        loadReports();
      } catch (error) {
        console.error('Failed to update report:', error);
      }
    } else {
      try {
        await createReport(currentReport);
        setCurrentReport({ id: '', title: '', diagnosis: '', price: '', appointmentId: '' });
        loadReports();
      } catch (error) {
        console.error('Failed to create report:', error);
      }
    }
  };
  
  
  const deleteReportHandler = async (id) => {
    try {
      setLoading(true);
      await deleteReport(id);
      loadReports(); 
    } catch (error) {
      console.error('Failed to delete report:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    
    <div className="report-list">

<h1>Reports</h1>

{loading ? (
        <p>Loading reports...</p>
      ) : (
        <table>
          <thead>
            <tr>
            <th>Report ID</th>
              <th>Title</th>
              <th>Diagnosis</th>
              <th>Price</th>
              <th>Appointment ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
                        {reports.map((report) => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.title}</td>
                            <td>{report.diagnosis}</td>
                            <td>{report.price}</td>
                            <td>{report.appointmentId}</td>
                            <td>
                      
                            <button onClick={() => editReport(report)}>Edit</button>
                            <button onClick={() => deleteReportHandler(report.id)}>Delete</button>
                            </td>
                            </tr>
                           
                              ))}
                            </tbody>
                          </table>
                        )}

<h2>{editing ? 'Edit Report' : 'Add Report'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={currentReport.title}
          onChange={handleInputChange}
        />

        <label>Diagnosis</label>
        <input
          type="text"
          name="diagnosis"
          value={currentReport.diagnosis}
          onChange={handleInputChange}
        />

        <label>Price</label>
        <input
          type="text"
          name="price"
          value={currentReport.price}
          onChange={handleInputChange}
        />

        <label>Appointment ID</label>
        <input
          type="text"
          name="appointmentId"
          value={currentReport.appointmentId}
          onChange={handleInputChange}
        />

        {editing && (
          <>
            <label>Report ID</label>
            <input
              type="text"
              name="id"
              value={currentReport.id}
              onChange={handleInputChange}
              disabled={true}
            />
          </>
        )}

        <button type="submit">{editing ? 'Update' : 'Create'}</button>
        
      </form>
    </div>
  );
};
                  
export default ReportList;