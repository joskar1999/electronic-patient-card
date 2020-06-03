import * as axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/baseR4',
  timeout: 10000,
  headers: {'Accept': 'application/fhir+json'}
});

export default axiosInstance;