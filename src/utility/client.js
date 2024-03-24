import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
