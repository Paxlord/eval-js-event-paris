import axios from 'axios';

const apiUri = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';

const GetAllEvents = () => axios.get(apiUri).then((res) => {
  console.log(JSON.stringify(res));
  return res;
});

export default GetAllEvents;
