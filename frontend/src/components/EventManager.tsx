import React, { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/eventService';
import EventForm from './EventForm';
import EventList from './EventList';
import { Event } from '../types/Event';
import { Box, Container } from '@mui/material';

const EventManager: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleCreateOrUpdate = async (eventData: Omit<Event, 'id'>) => {
    try {
      if (selectedEvent) {
        await updateEvent(selectedEvent.id, eventData);
      } else {
        await createEvent(eventData);
      }
      fetchEvents();
      setSelectedEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEdit = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCancel = () => {
    setSelectedEvent(null);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          marginTop: 4,
        }}
      >
        {/* Event Form Section */}
        <EventForm
          selectedEvent={selectedEvent}
          onSubmit={handleCreateOrUpdate}
          onCancel={handleCancel}
        />

        {/* Event List Section */}
        <EventList events={events} onEdit={handleEdit} onDelete={handleDelete} />
      </Box>
    </Container>
  );
};

export default EventManager;