import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import EventList from './components/eventlist';
import Navigation from './components/navigation';

const apiUri = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    axios.get(apiUri).then((res) => {
      this.setState({ response: res.data });
    });
  }

  handleSearch(query) {
    axios.get(apiUri, { params: { q: query } }).then((res) => {
      this.setState({ response: res.data });
    });
  }

  render() {
    const { response } = this.state;

    return (
      <Container fluid>
        <Navigation handleSearch={this.handleSearch} />
        {response.records && response.records.map((event) => <EventList event={event.fields} />)}
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
