import axios from 'axios';

const BASE_URL = 'https://us-central1-ralukapp.cloudfunctions.net/api/';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
