import axios from 'axios';

const apiUri = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&facet=category&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';

const GetEvents = async (q, start, rows) => {
  const events = await axios.get(apiUri, { params: { q, start, rows } });
  return events.data;
};

export default GetEvents;
