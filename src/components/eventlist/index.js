import React from 'react';
import {
  Card, Button, Accordion, Row,
} from 'react-bootstrap';
import moment from 'moment';

const EventList = ({ event, index }) => (
  <Row xs={12} style={{ margin: '1rem' }}>
    <Card style={{ width: '100%' }}>
      <Card.Header>
        <Accordion.Toggle as={Button} variant="link" eventKey={`${index}`}>
          <Card.Title>{event.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{`Du ${moment(event.date_start).format('DD/MM/YYYY')} Au ${moment(event.date_end).format('DD/MM/YYYY')}`}</Card.Subtitle>
        </Accordion.Toggle>
      </Card.Header>
      <Accordion.Collapse eventKey={`${index}`}>
        <Card.Body>
          <div dangerouslySetInnerHTML={{ __html: event.description }} />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  </Row>
);

export default EventList;
