import axios from 'axios';

const ApiClient = axios.create({
  baseURL: `http://${window.location.hostname}:3000/`,
  headers: {
    "Content-type": "application/json"
  }
});

export default ApiClient;