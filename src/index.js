import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const apiUri = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount(){
    this.GetEvents();
  }

  GetEvents(param_q=''){
    axios.get(apiUri, {
      params:{
        q: param_q
      }
    }).then((reponse) => { 
      console.log(reponse);
      this.setState({ data: reponse.data.records });
     });
  }

  render() {
    return (
      <div>
        <input onChange={(e) => this.GetEvents(e.target.value)} />
        {this.state.data.map((event) => {
          return <h1>{event.fields.title}</h1>
        })}
      </div>
    );
  }
}

ReactDOM.render(<App data="data" />, document.getElementById('app'));
