import axios from 'axios';

export function get(url, config) {
  return axios.get(url, config).then((res) => res.data);
}
