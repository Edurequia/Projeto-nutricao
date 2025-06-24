import axios from "axios";

const apiAuth = axios.create({
  baseURL: 'http://localhost:8080',
});

export default apiAuth;