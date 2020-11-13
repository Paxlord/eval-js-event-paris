import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Col, Container, Row,
} from 'react-bootstrap';
import MovieArray from './data/movies';
import Navigation from './components/navigation';
import Signinform from './components/signinform';
import Movielist from './components/movielist';
import Movielistbytypes from './components/movielistbytype';
import Pub from './components/pub';
import Slider from './components/slider';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = MovieArray;

    this.filterMovies = this.filterMovies.bind(this);
  }

  filterMovies(string) {
    let tempArray = MovieArray;
    if (string.length !== 0) {
      tempArray = MovieArray.filter((element) => (
        element.name.toLowerCase().includes(string.toLowerCase())
      ));
    }
    this.setState(tempArray);
  }

  render() {
    const [...state] = this.state;

    return (
      <div>
        <Navigation onInput={this.filterMovies} />
        <Container>
          <Row>
            <Col xs={8}>
              <h3>Bandes annonces</h3>
              <Slider />
              <hr />
              <h3>Movie available</h3>
              <h5>
                Résultats :
                {state.length > 0 ? state.length : '0'}
              </h5>
              <Movielist data={state} />
              <Movielistbytypes data={state} tag="action" />
              <Movielistbytypes data={state} tag="divertissement" />
            </Col>
            <Col>
              <h2> Sign-In </h2>
              <Signinform />
              <hr />
              <Pub />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
