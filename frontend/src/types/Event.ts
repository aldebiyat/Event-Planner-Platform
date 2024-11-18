export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description?: string;
  userId?: number;
  userEmail?: string;
}