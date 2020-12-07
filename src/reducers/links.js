import {FETCH_ALL, CREATE, UPDATE, DELETE} from '../constants/actionTypes';

export default (links=[], action) => {
    switch (action.type) {
        case DELETE:
            return links.filter((link) => link._id!==action.payload);
        case UPDATE:
            return links.map(link=> link._id===action.payload._id? action.payload: link);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...links, action.payload];
        default:
            return links;
    }
}