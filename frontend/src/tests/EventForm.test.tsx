import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventForm from '../components/EventForm';

describe('EventForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<EventForm selectedEvent={null} onSubmit={jest.fn()} onCancel={jest.fn()} />);

    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Location')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Event' })).toBeInTheDocument();
  });

  it('calls onSubmit with the correct data', () => {
    render(<EventForm selectedEvent={null} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);
  
    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'Test Event' } });
    fireEvent.change(screen.getByPlaceholderText('Location'), { target: { value: 'Test Location' } });
    fireEvent.change(screen.getByPlaceholderText('User Email (Optional)'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Date'), { target: { value: '2024-11-20' } });
  
    fireEvent.click(screen.getByRole('button', { name: 'Create Event' }));
  
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Event',
      date: '2024-11-20',
      location: 'Test Location',
      description: '',
      userEmail: 'test@example.com',
    });
  });

  it('calls onCancel when the cancel button is clicked', () => {
    render(<EventForm selectedEvent={{ id: 1, title: 'Test Event', date: '', location: '', userEmail: '' }} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    fireEvent.click(screen.getByText('Cancel'));

    expect(mockOnCancel).toHaveBeenCalled();
  });
});