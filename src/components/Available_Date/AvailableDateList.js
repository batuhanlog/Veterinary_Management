import React, { useState, useEffect } from 'react';
import AvailableDateService from '../../services/AvailableDateService';
import './AvailableDate.css'; // Yeni CSS dosyasını dahil edin

function AvailableDateList() {
  const [availableDates, setAvailableDates] = useState([]);
  const [newAvailableDate, setNewAvailableDate] = useState({
    availableDate: '',
    doctorId: '',
  });

  useEffect(() => {
    fetchAvailableDates();
  }, []);

  const fetchAvailableDates = async () => {
    try {
      const data = await AvailableDateService.getAvailableDates();
      setAvailableDates(data);
    } catch (error) {
      console.error('Error fetching available dates:', error);
    }
  };

  const handleCreate = async () => {
    try {
      await AvailableDateService.createAvailableDate(newAvailableDate);
      fetchAvailableDates();
      setNewAvailableDate({ availableDate: '', doctorId: '' });
    } catch (error) {
      console.error('Error creating available date:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await AvailableDateService.updateAvailableDate(id, newAvailableDate);
      fetchAvailableDates();
    } catch (error) {
      console.error('Error updating available date:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await AvailableDateService.deleteAvailableDate(id);
      fetchAvailableDates();
    } catch (error) {
      console.error('Error deleting available date:', error);
    }
  };

  return (
    <div className="available-date-list-container"> {/* Class adını değiştirin */}
      <h2>Available Dates</h2>
      <div>
        <input
          type="date"
          value={newAvailableDate.availableDate}
          onChange={(e) => setNewAvailableDate({ ...newAvailableDate, availableDate: e.target.value })}
        />
        <input
          type="number"
          value={newAvailableDate.doctorId}
          onChange={(e) => setNewAvailableDate({ ...newAvailableDate, doctorId: e.target.value })}
          placeholder="Doctor ID"
        />
        <button className="add-new-available-date-button" onClick={handleCreate}>Add New Available Date</button> {/* Class adını değiştirin */}
      </div>
      <ul className="available-date-list"> {/* Class adını değiştirin */}
        {availableDates.map((date) => (
          <li key={date.id}>
            {date.availableDate} - Doctor ID: {date.doctorId}
            <button className="edit-available-date-button" onClick={() => handleUpdate(date.id)}>Edit</button> {/* Class adını değiştirin */}
            <button className="delete-available-date-button" onClick={() => handleDelete(date.id)}>Delete</button> {/* Class adını değiştirin */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableDateList;
