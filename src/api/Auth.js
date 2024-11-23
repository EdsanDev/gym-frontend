import axios from "./axios";

export const RegisterRequest = user => axios.post(`/user/register`,user)
export const loginRequest = user => axios.post('/user/login',user);
export const verifyTokenRequest = () => axios.get('/user/verify');
export const ExitRequest = () => axios.post('/user/logout');