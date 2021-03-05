import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const apiUri = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';

class App extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        test
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
