import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Container } from '@mui/material';
import { Event } from '../types/Event';

interface EventFormProps {
  selectedEvent: Event | null;
  onSubmit: (eventData: Omit<Event, 'id'>) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ selectedEvent, onSubmit, onCancel }) => {
  const initialFormState = {
    title: '',
    date: '',
    location: '',
    description: '',
    userEmail: '',
  };

  const [formData, setFormData] = useState<Omit<Event, 'id'>>(initialFormState);
  const [showCancel, setShowCancel] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      setFormData(selectedEvent);
      setShowCancel(true);
    } else {
      setFormData(initialFormState);
      setShowCancel(false);
    }
  }, [selectedEvent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setShowCancel(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(initialFormState);
    setShowCancel(false);
  };

  const handleCancelClick = () => {
    setFormData(initialFormState);
    setShowCancel(false);
    onCancel();
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {selectedEvent ? 'Edit Event' : 'Create Event'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          name="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
        />
        <TextField
          name="userEmail"
          label="User Email (Optional)"
          type="email"
          value={formData.userEmail}
          onChange={handleChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button type="submit" variant="contained" color="primary">
            {selectedEvent ? 'Update Event' : 'Create Event'}
          </Button>
          {showCancel && (
            <Button variant="outlined" color="secondary" onClick={handleCancelClick}>
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default EventForm;