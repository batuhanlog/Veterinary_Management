import React, { useState, useEffect } from 'react';
import AvailableDateService from '../../services/AvailableDateService';

function AvailableDateList() {
  const [availableDates, setAvailableDates] = useState([]);
  const [editAvailableDate, setEditAvailableDate] = useState(null);
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

  const handleEditClick = (date) => {
    setEditAvailableDate({ ...date });
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



  const handleUpdate = async () => {
    try {
      await AvailableDateService.updateAvailableDate(editAvailableDate.id, editAvailableDate);
      fetchAvailableDates();
      setEditAvailableDate(null); // Edit modunu kapat
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
    <div>
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
        <button onClick={handleCreate}>Add New Available Date</button>
      </div>


      {/* Düzenleme formu */}
      {editAvailableDate && (
        <div>
          <input
            type="date"
            value={editAvailableDate.availableDate}
            onChange={(e) => setEditAvailableDate({ ...editAvailableDate, availableDate: e.target.value })}
          />
          <input
            type="number"
            value={editAvailableDate.doctorId}
            onChange={(e) => setEditAvailableDate({ ...editAvailableDate, doctorId: e.target.value })}
            placeholder="Doctor ID"
          />
          <button onClick={handleUpdate}>Update Available Date</button>
        </div>
      )}

      <ul>
        {availableDates.map((date) => (
          <li key={date.id}>
          ID: {date.id} - Date: {date.availableDate} - Doctor ID: {date.doctorId}
            <button onClick={() => handleEditClick(date)}>Edit</button>
            <button onClick={() => handleDelete(date.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableDateList;
