import React from 'react';
import { Event } from '../types/Event';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface EventListProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete }) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom component="h2">
        Event List
      </Typography>
      {events.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No events found.
        </Typography>
      ) : (
        <List>
          {events.map((event) => (
            <ListItem key={event.id} sx={{ alignItems: 'flex-start' }}>
              <ListItemText
                primary={
                  <Typography variant="h6" component="span">
                    {event.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Date: {event.date} | Location: {event.location}
                    </Typography>
                    {event.description && (
                      <Typography component="span" variant="body2" display="block">
                        Description: {event.description}
                      </Typography>
                    )}
                    {event.userEmail && (
                      <Typography component="span" variant="body2" display="block">
                        User Email: {event.userEmail}
                      </Typography>
                    )}
                  </>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => onEdit(event)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(event.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default EventList;