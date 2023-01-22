const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;

export function request(uri, options) {
  return fetch(`${BACKEND_BASE_URL}${uri}`, options);
}
