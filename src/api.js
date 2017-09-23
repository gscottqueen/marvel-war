import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://gateway.marvel.com',
  params: {
    "apikey": "a26ca9cb27a74fb7567e2dec06e44dc2",
    "limit" : "50"
  },
    timeout: 2000,
    method: 'get',
    responseType: 'json',
});
