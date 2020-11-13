import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Accordion, Pagination } from 'react-bootstrap';
import axios from 'axios';
import EventList from './components/eventlist';
import Navigation from './components/navigation';

const apiUri = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';

const GetEvents = (q, start, rows) => axios.get(apiUri, { params: { q, start, rows } })
  .then((res) => res.data);

const GeneratePages = (nbMax, rows) => {
  const pages = [];
  for (let i = 1; i <= nbMax / rows; i += 1) {
    pages.push(<Pagination.Item key={i}>{i}</Pagination.Item>);
  }
  return pages;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
      rows: 10,
      start: 0,
      pages: [],
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const { rows } = this.state;

    GetEvents('', 0, rows).then((res) => { this.setState({ response: res, pages: GeneratePages(res.nhits, rows) }); });
  }

  handleSearch(query) {
    const { rows, start } = this.state;

    GetEvents(query, start, rows).then((res) => { this.setState({ response: res, start: 0 }); });
  }

  render() {
    const { response, pages } = this.state;

    return (
      <Container fluid>
        <Navigation handleSearch={this.handleSearch} />
        <Container>
          <Accordion>
            {response.records && response.records.map((event, index) => (
              <EventList event={event.fields} index={index} key={event.recordid} />))}
          </Accordion>
        </Container>
        <Pagination>{pages}</Pagination>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
