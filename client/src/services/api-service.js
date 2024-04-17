import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const create = (payload) => {
  return axios.post(baseUrl, payload).then((response) => response.data)
}

const deleteItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, payload) => {
  return axios.put(`${baseUrl}/${id}`, payload)
}

const apiService = {
  getAll,
  create,
  deleteItem,
  update,
}

export default apiService
