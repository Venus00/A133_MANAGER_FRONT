import axios from 'axios';

const ApiClient = axios.create({
  baseURL: `http://${window.location.hostname}:3000/api/v1`,
  headers: {
    "Content-type": "application/json"
  }
});

export default ApiClient;