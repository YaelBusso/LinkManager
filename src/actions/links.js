import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes';
import * as api from '../api';

//Actions Creators
export const getLinks=()=>async (dispatch)=>{
    try{
        const {data}=await api.fetchLinks(); 
        dispatch({type: FETCH_ALL, payload: data} );
    } catch(error) {
        console.log(error.message);
    }
}

export const createLink=(link)=>async (dispatch)=>{
    try {
        const {data}= await api.createLink(link);
        dispatch({type: CREATE, payload: data});
    } catch(error) {
        console.log(error.message);
    }
}

export const updateLink =(id, link) =>async (dispatch)=>{
    try {
       const {data}= await api.updateLink(id, link);
       dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error);
    }
}

export const starLink = (id)=> async (dispatch)=>{
    try{
        const {data}= await api.starLink(id);
        dispatch({type: UPDATE, payload: data}) 
    } catch (error){
        console.log(error);
    }
}

export const deleteLink = (id) => async (dispatch)=>{
    try {
        await await api.deleteLink(id);
        dispatch({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);
    }
}

// export const shortenLink = (short)=> async (dispatch)=>{
//     try{
//         const {data}=await api.shortenLink(short); 
//         dispatch({type: UPDATE, payload: data} );
//     } catch(error) {
//         console.log(error.message);
//     }
// }
