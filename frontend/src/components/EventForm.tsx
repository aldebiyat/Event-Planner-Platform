import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Event } from '../types/Event';

interface EventFormProps {
  selectedEvent: Event | null;
  onSubmit: (eventData: Omit<Event, 'id'>) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ selectedEvent, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Event, 'id'>>({
    title: '',
    date: '',
    location: '',
    description: '',
    userEmail: '',
  });

  useEffect(() => {
    if (selectedEvent) {
      setFormData(selectedEvent);
    }
  }, [selectedEvent]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      date: '',
      location: '',
      description: '',
      userEmail: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <h2>{selectedEvent ? 'Edit Event' : 'Create Event'}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        placeholder="Date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="email"
        name="userEmail"
        placeholder="User Email (Optional)"
        value={formData.userEmail}
        onChange={handleChange}
      />
      <button type="submit">{selectedEvent ? 'Update Event' : 'Create Event'}</button>
      {selectedEvent && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default EventForm;