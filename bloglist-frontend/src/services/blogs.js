import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const login = (credentials) => {
  const request = axios.post("/api/login", credentials);
  return request.then((response) => response.data);
};

const logout = () => {
  window.localStorage.removeItem("userDetails");
};

const blogService = { getAll, login, logout };
export { blogService };
