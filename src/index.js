import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Container,
} from 'react-bootstrap';

const App = () => (
  <div>
    <Container>
      <h1>Test</h1>
    </Container>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
