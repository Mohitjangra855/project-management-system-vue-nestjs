import api from "./api";
export const fetchCurrentUser = async()=>{
    const res = await api.get('/users/me');
    return res.data;
}