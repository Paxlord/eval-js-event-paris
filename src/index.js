import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
} from 'react-bootstrap';
import axios from 'axios';
import EventList from './components/eventlist';

const apiUri = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: [],
    };
  }

  componentDidMount() {
    axios.get(apiUri).then((res) => {
      console.log(JSON.stringify(res));
      this.setState({ response: res.data });
    });
  }

  render() {
    const { response } = this.state;

    return (
      <div>
        {response.records && response.records.map((event) => <EventList event={event.fields} />)}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
