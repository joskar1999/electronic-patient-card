import * as axios from 'axios';

const axiosInstance = axios.create({
  timeout: 10000,
  headers: {'Accept': 'application/fhir+json'}
});

export default axiosInstance;