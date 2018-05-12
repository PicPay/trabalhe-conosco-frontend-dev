// fetch polyfill
import 'whatwg-fetch';
// http handler and parser
const checkStatus = async (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const parseJSON = response => response.json().catch(() => ({}));

const fetchErrorHandler = () => {
  // Connection problem
  const error = new Error('Problema de conexão.');
  throw error;
};

const apiFetch = (url, method, body) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
  };
  return fetch(url, options)
    .catch(fetchErrorHandler)
    .then(res =>
      checkStatus(res)
        .then(parseJSON),
    );
};

export const get = url => apiFetch(url, 'GET');

export const post = (url, body) => apiFetch(url, 'POST', body);
