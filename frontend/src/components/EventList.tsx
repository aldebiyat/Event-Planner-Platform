import React from 'react';
import { Event } from '../types/Event';

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  return (
    <div className="event-list">
      <h2>Event List</h2>
      <ul>
        {events.length === 0 && <p>No events found.</p>} {/* Handle empty state */}
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Description:</strong> {event.description || 'No description provided.'}</p>
            {event.userEmail && <p><strong>User Email:</strong> {event.userEmail}</p>} {/* Optional */}
            <button onClick={() => onEdit(event)}>Edit</button>
            <button onClick={() => onDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;