import {actionTypes} from './actionTypes';



const initState = {
    compititionsArray: [],
};

export const reducer = (state=initState, action) => {
    const {type, payload} = action;

    switch (type) {
        
        case actionTypes.CREATE_CONTEST:
            localStorage.compititionsArray = JSON.stringify([payload, ...state.compititionsArray]);
            return {
                ...state,
                compititionsArray: [...state.compititionsArray, payload]
            };
        
        case actionTypes.ADD_PARTICIPANT:
            console.log(payload)
            return {
                // ...state,
                // listOfUsers: [payload, ...state.listOfUsers],
                // arrayForRender: !state.isFilter ? [payload, ...state.arrayForRender] : [...state.arrayForRender],
                // winner: '',
            };

        case actionTypes.SHOW_WINNER:
            const winner = [...state.listOfUsers].sort((a,b) => a.time-b.time);
            console.log(payload)

            return {
                // ...state,
                // winner: winner[0],
            };

        case actionTypes.DELETE_PARTICIPANT:
            const index = state.listOfUsers.findIndex(participant => participant.id === payload.id);
            const listOfUsers = [...state.listOfUsers];
            listOfUsers.splice(index, 1);
            console.log(payload)

            // const listOfUsersLS = JSON.parse(localStorage.getItem('listOfUsers'));
            // const indexLS = listOfUsersLS.findIndex(participant => participant.id === payload.id);
            // listOfUsersLS.splice(indexLS, 1);
            // localStorage.listOfUsers = JSON.stringify(listOfUsersLS);
            return {
                // ...state,
                // listOfUsers: listOfUsers,
                // arrayForRender: listOfUsers,
                // winner: '',
            };

        case actionTypes.FILTER:
            const arrayForRender = state.listOfUsers.filter( participant => {
                const valid = 
                (participant.firstName.toLowerCase()).includes(payload.toLowerCase()) || 
                (participant.id.toLowerCase()).includes(payload.toLowerCase());
                return valid;
            });
            console.log(payload)

            return {
                // ...state,
                // arrayForRender: arrayForRender,
                // isFilter: !payload ? false : true,
            };
        
        case actionTypes.CONTESTS_FILTER:
            console.log('filtering contests')
            // const arrayForRender = state.listOfUsers.filter( participant => {
            //     const valid = 
            //     (participant.firstName.toLowerCase()).includes(payload.toLowerCase()) || 
            //     (participant.id.toLowerCase()).includes(payload.toLowerCase());
            //     return valid;
            //   });
            // return {
            //     ...state,
            //     arrayForRender: arrayForRender,
            //     isFilter: !payload ? false : true,
            // };

        case actionTypes.OPEN_TIMER:
            console.log(payload)
            
            return {
                // ...state,
                // isTimerActive: !state.isTimerActive,
            };

        case actionTypes.SET_CURRENT_PATICIPANT:
            console.log(payload)
            
            return {
                // ...state,
                // currentParticipant: payload,
            };
        default:
            return state;   
    }
};