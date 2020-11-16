import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Accordion, Pagination } from 'react-bootstrap';
import axios from 'axios';
import EventList from './components/eventlist';
import Navigation from './components/navigation';

const apiUri = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';

const GetEvents = (q, start, rows, filter = null) => {
  const refineObj = {};
  if (filter) {
    Object.keys(filter).forEach((key) => { refineObj[`refine.${key}`] = filter.key; });
  }

  return axios.get(apiUri, {
    params: {
      q, start, rows, ...refineObj,
    },
  })
    .then((res) => res.data);
};

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
      query: '',
      currentActivePage: 1,
      maxPages: 1,
      refine: {},
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.handleDateFilter = this.handleDateFilter.bind(this);
  }

  componentDidMount() {
    const { rows, refine } = this.state;

    GetEvents('', 0, rows, refine).then((res) => { this.setState({ response: res, maxPages: Math.floor(res.nhits / rows) }); });
  }

  handleSearch(query) {
    const { rows, refine } = this.state;

    GetEvents(query, 0, rows, refine)
      .then((res) => {
        this.setState({
          response: res,
          query,
          maxPages: Math.floor(res.nhits / rows),
          currentActivePage: 1,
        });
      });
  }

  handleDateFilter(date) {
    const { query, rows, refine } = this.state;
    const refineWithDate = { ...refine, date_start: date };

    GetEvents(query, 0, rows, refineWithDate)
      .then((res) => {
        this.setState({
          response: res,
          maxPages: Math.floor(res.nhits / rows),
          refine: refineWithDate,
          currentActivePage: 1,
        });
      });
  }

  goToPage(number) {
    const { rows, query, refine } = this.state;

    GetEvents(query, number * rows, rows, refine)
      .then((res) => {
        this.setState({
          response: res, query, currentActivePage: number,
        });
      });
  }

  goToFirst() {
    this.goToPage(1);
  }

  goToLast() {
    const { maxPages } = this.state;
    this.goToPage(maxPages);
  }

  goToNext() {
    const { currentActivePage, maxPages } = this.state;
    if (currentActivePage + 1 <= maxPages) {
      this.goToPage(currentActivePage + 1);
    }
  }

  goToPrev() {
    const { currentActivePage } = this.state;
    if (currentActivePage - 1 > 0) {
      this.goToPage(currentActivePage - 1);
    }
  }

  render() {
    const { response, currentActivePage, maxPages } = this.state;

    return (
      <Container fluid>
        <Navigation handleSearch={this.handleSearch} handleDate={this.handleDateFilter} />
        <Container>
          <Accordion>
            {response.records && response.records.map((event, index) => (
              <EventList event={event.fields} index={index} key={event.recordid} />))}
          </Accordion>
          <Pagination>
            <Pagination.First onClick={() => this.goToFirst()} />
            <Pagination.Prev onClick={() => this.goToPrev()} />
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
            <Pagination.Next onClick={() => this.goToNext()} />
            <Pagination.Last onClick={() => this.goToLast()} />
          </Pagination>
        </Container>
      </Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
