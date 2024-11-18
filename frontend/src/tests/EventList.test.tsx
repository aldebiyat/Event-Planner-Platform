import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventList from '../components/EventList';
import { Event } from '../types/Event';

describe('EventList', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const mockEvents: Event[] = [
    { id: 1, title: 'Event 1', date: '2024-11-20', location: 'Location 1', userEmail: 'test@example.com' },
    { id: 2, title: 'Event 2', date: '2024-11-21', location: 'Location 2', userEmail: '' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the event list correctly', () => {
    render(<EventList events={mockEvents} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText('Event 1')).toBeInTheDocument();
    expect(screen.getByText('Location 1')).toBeInTheDocument();
    expect(screen.getByText('Event 2')).toBeInTheDocument();
    expect(screen.getByText('Location 2')).toBeInTheDocument();
  });

  it('calls onEdit when the edit button is clicked', () => {
    render(<EventList events={mockEvents} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getAllByText('Edit')[0]);

    expect(mockOnEdit).toHaveBeenCalledWith(mockEvents[0]);
  });

  it('calls onDelete when the delete button is clicked', () => {
    render(<EventList events={mockEvents} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    fireEvent.click(screen.getAllByText('Delete')[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockEvents[0].id);
  });

  it('shows "No events found" when the event list is empty', () => {
    render(<EventList events={[]} onEdit={mockOnEdit} onDelete={mockOnDelete} />);

    expect(screen.getByText('No events found.')).toBeInTheDocument();
  });
});