import axios from 'axios';

const url= "/api/links";

export const fetchLinks=()=>axios.get(url);
export const createLink=(newLink)=>axios.post(url, newLink);
export const starLink=(id)=>axios.patch(`${url}/${id}/starLink`)
export const updateLink=(id, updatedLink)=>axios.patch(`${url}/${id}`, updatedLink);
export const deleteLink=(id)=>axios.delete(`${url}/${id}`);
// export const shortenLink=(short)=>axios.get(`${short}`);
