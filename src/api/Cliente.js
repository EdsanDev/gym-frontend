import axios from './axios'

export const ClienteRequest = user => axios.post('/cliente/',user)
export const getClienteRequest = (id) => axios.get(`/cliente/${id}`);
export const updateClienteRequest = (id,user) => axios.put(`/cliente/${id}`,user);
export const ClienteTotal = () => axios.get('/cliente/')
export const SearchRequest = (params) => axios.get(`/cliente/search`,{params})