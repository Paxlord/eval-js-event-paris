import React from 'react';
import { Card } from 'react-bootstrap';

const EventList = ({ event }) => (
  <Card style={{ width: '35rem' }}>
    <Card.Body>
      <Card.Title>{event.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{event.date_start}</Card.Subtitle>
      <Card.Text>
        {event.description}
      </Card.Text>
      <Card.Link href={event.contact_url}>Contact</Card.Link>
    </Card.Body>
  </Card>
);

export default EventList;
