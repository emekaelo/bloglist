import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};

const update = (blog, id) => {
  const request = axios.put(`${baseUrl}/${id}`, blog);
  return request.then((response) => response.data);
};

const login = (credentials) => {
  const request = axios.post("/api/login", credentials);
  return request.then((response) => response.data);
};

const logout = () => {
  window.localStorage.removeItem("userDetails");
};

const blogService = { getAll, login, logout, create, update, setToken };
export { blogService };
