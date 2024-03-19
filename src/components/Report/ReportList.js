import React, { useState, useEffect } from 'react';
import './ReportList.css';


function ReportList() {
    const [reports, setReports] = useState([]);
    const [newReport, setNewReport] = useState({
        title: '',
        diagnosis: '',
        price: 0,
        appointmentId: ''
    });

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        const response = await fetch('/api/v1/report');
        if (response.ok) {
            const data = await response.json();
            setReports(data);
        } else {
            console.error('Failed to fetch reports');
        }
    };

    const handleInputChange = (e) => {
        setNewReport({ ...newReport, [e.target.name]: e.target.value });
    };

    const handleAddReport = async () => {
        const response = await fetch('/api/v1/report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReport)
        });
        if (response.ok) {
            await fetchReports();
        } else {
            console.error('Failed to add report');
        }
    };

    // Implement update and delete functionalities here

    return (
        <div>
            <h1>Report List</h1>
            {/* Add report form */}
            {/* Report list display */}
            {/* ... */}
        </div>
    );
}

export default ReportList;