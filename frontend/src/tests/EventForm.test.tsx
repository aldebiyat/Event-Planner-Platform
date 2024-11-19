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

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create event/i })).toBeInTheDocument();
  });

  it('calls onSubmit with the correct data', () => {
    render(<EventForm selectedEvent={null} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Event' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-11-20' } });
    fireEvent.change(screen.getByLabelText(/location/i), { target: { value: 'Test Location' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText(/user email/i), { target: { value: 'test@example.com' } });

    fireEvent.click(screen.getByRole('button', { name: /create event/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Event',
      date: '2024-11-20',
      location: 'Test Location',
      description: 'Test Description',
      userEmail: 'test@example.com',
    });
  });

  it('renders the form with prefilled values when editing an event', () => {
    render(
      <EventForm
        selectedEvent={{
          id: 1,
          title: 'Prefilled Title',
          date: '2024-11-21',
          location: 'Prefilled Location',
          description: 'Prefilled Description',
          userEmail: 'prefilled@example.com',
        }}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByLabelText(/title/i)).toHaveValue('Prefilled Title');
    expect(screen.getByLabelText(/date/i)).toHaveValue('2024-11-21');
    expect(screen.getByLabelText(/location/i)).toHaveValue('Prefilled Location');
    expect(screen.getByLabelText(/description/i)).toHaveValue('Prefilled Description');
    expect(screen.getByLabelText(/user email/i)).toHaveValue('prefilled@example.com');
    expect(screen.getByRole('button', { name: /update event/i })).toBeInTheDocument();
  });

  it('calls onCancel when the cancel button is clicked', () => {
    render(
      <EventForm
        selectedEvent={{
          id: 1,
          title: 'Test Event',
          date: '2024-11-20',
          location: 'Test Location',
          description: 'Test Description',
          userEmail: 'test@example.com',
        }}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));

    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('does not render the cancel button for a fresh form', () => {
    render(<EventForm selectedEvent={null} onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

    expect(screen.queryByRole('button', { name: /cancel/i })).not.toBeInTheDocument();
  });
});