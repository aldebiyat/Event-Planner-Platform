import axios from 'axios';
import { Event } from '../types/Event';

const API_URL = `${process.env.REACT_APP_API_URL}/events`;

export const getEvents = async (): Promise<Event[]> => {
  const response = await axios.get<Event[]>(API_URL);
  return response.data;
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  console.log('API_URL:', process.env.REACT_APP_API_URL);
  const response = await axios.post<Event>(API_URL, event);
  return response.data;
};

export const updateEvent = async (id: number, event: Partial<Event>): Promise<Event> => {
  const response = await axios.put<Event>(`${API_URL}/${id}`, event);
  return response.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};