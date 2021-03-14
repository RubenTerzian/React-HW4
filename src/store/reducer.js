import {actionTypes} from './actionTypes';

const initState = {
    listOfUsers: [{firstName: "gaga", secondName: 'Lady'}],
};

export const reducer = (state=initState, action) => {
    const {type, payload} = action;

    switch (type) {
        
        case actionTypes.ADD_PARTICIPANT:
            return {
                ...state,
                listOfUsers: payload,
            };
        default:
            return state;   
    }
};