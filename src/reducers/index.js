import { combineReducers } from 'redux';

function suites(state = [], action){
    if(action.type === "RESET"){
        return [];
    }
    if(action.type === "ADD_SUITE"){
        return [...state, action.suite];
    }
    return state;
}

export default combineReducers({suites});
