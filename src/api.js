import axios from 'axios';

export const api = axios.create({
  baseURL: '//gateway.marvel.com',
  params: {
    "apikey": apikey,
    // "apikey": "insert key here",
    "limit" : "100"
  },
    timeout: 10000,
    method: 'get',
    responseType: 'json',
});
