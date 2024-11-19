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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showCancel, setShowCancel] = useState(false);

  useEffect(() => {
    if (selectedEvent) {
      setFormData(selectedEvent);
      setShowCancel(true);
    } else {
      setFormData(initialFormState);
      setShowCancel(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEvent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the field being edited
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setShowCancel(true);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required.';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required.';
    }
    if (formData.userEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      newErrors.userEmail = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    onSubmit(formData);
    setFormData(initialFormState);
    setShowCancel(false);
  };

  const handleCancelClick = () => {
    setFormData(initialFormState);
    setErrors({});
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
          error={!!errors.title}
          helperText={errors.title || 'Enter the event title.'}
        />

        <TextField
          name="date"
          label="Date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!errors.date}
          helperText={errors.date || 'Select the event date.'}
        />

        <TextField
          name="location"
          label="Location"
          value={formData.location}
          onChange={handleChange}
          error={!!errors.location}
          helperText={errors.location || 'Enter the event location.'}
        />

        <TextField
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          helperText="Enter additional details (optional)."
        />

        <TextField
          name="userEmail"
          label="User Email (Optional)"
          type="email"
          value={formData.userEmail}
          onChange={handleChange}
          error={!!errors.userEmail}
          helperText={errors.userEmail || 'Enter a valid email address (optional).'}
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