import axios from 'axios';

const ApiClient = axios.create({
  baseURL: 'http://192.168.10.120:3000/',
  headers: {
    "Content-type": "application/json"
  }
});

export default ApiClient;