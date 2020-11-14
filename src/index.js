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

/* const GeneratePages = (nbMax, rows, goToPage) => {
  const pages = [];
  for (let i = 1; i <= nbMax / rows; i += 1) {
    pages.push(<Pagination.Item key={i} onClick={() => goToPage(i)}>{i}</Pagination.Item>);
  }
  return pages;
}; */

const GenerateCurrentPaginationArray = (currentPage, maxPages) => {
  const pages = [];
  for (let i = currentPage - 2; i <= currentPage + 2; i += 1) {
    if (i > 0 && i <= maxPages) {
      pages.push(i);
    }
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
      query: '',
      currentActivePage: 1,
      maxPages: 1,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  componentDidMount() {
    const { rows } = this.state;

    GetEvents('', 0, rows).then((res) => { this.setState({ response: res, maxPages: res.nhits / rows }); });
  }

  handleSearch(query) {
    const { rows, start } = this.state;

    GetEvents(query, start, rows)
      .then((res) => {
        this.setState({
          response: res, start: 0, query, maxPages: res.nhits / rows, currentActivePage: 1,
        });
      });
  }

  goToPage(number) {
    const { rows, query } = this.state;

    GetEvents(query, number * rows, rows)
      .then((res) => {
        this.setState({
          response: res, start: number * rows, query, currentActivePage: number,
        });
      });
  }

  render() {
    const { response, currentActivePage, maxPages } = this.state;

    return (
      <Container fluid>
        <Navigation handleSearch={this.handleSearch} />
        <Container>
          <Accordion>
            {response.records && response.records.map((event, index) => (
              <EventList event={event.fields} index={index} key={event.recordid} />))}
          </Accordion>
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Ellipsis />
            {GenerateCurrentPaginationArray(currentActivePage, maxPages)
              .map((i) => (
                <Pagination.Item
                  key={i}
                  active={currentActivePage === i}
                  onClick={() => { this.goToPage(i); }}
                >
                  {i}
                </Pagination.Item>
              ))}
            <Pagination.Ellipsis />
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </Container>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
