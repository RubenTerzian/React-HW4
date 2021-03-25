import {actionTypes} from './actionTypes';



const initState = JSON.parse(localStorage.getItem('state')) || {
    compititionsArray: [],
    compititionsArrayForRender: [],
    currentContest: {}
};



export const reducer = (state=initState, action) => {
    const {type, payload} = action;
    let currentContest = {...state.currentContest};
    const contestIndex = state.compititionsArray.findIndex(contest => contest.id === state.currentContest.id);
    const newArray = [...state.compititionsArray];
    const {listOfUsers, arrayForRender} = currentContest;

    switch (type) {
        
        case actionTypes.CREATE_CONTEST:
            return {
                ...state,
                compititionsArray: [...state.compititionsArray, payload],
                compititionsArrayForRender: [...state.compititionsArrayForRender, payload],
            };

        case actionTypes.SET_CURRENT_CONTEST:

            return {
                ...state,
                currentContest: payload
            };
        
        case actionTypes.ADD_PARTICIPANT:
            const contest = {
                ...currentContest,
                listOfUsers: [payload, ...listOfUsers],
                arrayForRender: [payload, ...arrayForRender],
                isTimerActive: !currentContest.isTimerActive,
                winner: '',
            };
            
            newArray[contestIndex] = {...contest};
            return {
                ...state,
                compititionsArray: newArray,
                compititionsArrayForRender: newArray,
                currentContest: {...contest}
            };

        case actionTypes.SHOW_WINNER:
            const winner = newArray[contestIndex].listOfUsers.sort((a,b) => a.time-b.time)
            newArray[contestIndex].winner = winner[0];
            newArray[contestIndex].isFinished = true;
            return {
                ...state,
                compititionsArray: newArray,
                compititionsArrayForRender: newArray,
                currentContest: {}
            };

        case actionTypes.REOPEN_COMPETITION:
            newArray[contestIndex].isFinished = false
            console.log(newArray)
            return {
                ...state,
                compititionsArray: newArray,
                compititionsArrayForRender: newArray,
                currentContest: {...currentContest, isFinished: false}
            };

        case actionTypes.DELETE_PARTICIPANT:
            const index = state.currentContest.listOfUsers.findIndex(participant => participant.id === payload.id);
            const newListOfUsers = [...listOfUsers];
            newListOfUsers.splice(index, 1);
            newArray[contestIndex].listOfUsers = newListOfUsers;
            newArray[contestIndex].arrayForRender = newListOfUsers;
            newArray[contestIndex].winner = '';

            return {
                ...state,
                currentContest: {...currentContest, listOfUsers: newListOfUsers, arrayForRender: newListOfUsers, winner: ''}
            };

        case actionTypes.FILTER_PARTICIPANT:
            const partisipantFilteredArray = currentContest
            .listOfUsers.filter( participant => {
                const valid = 
                (participant.firstName.toLowerCase()).includes(payload.filterParam.toLowerCase()) || 
                (participant.id.toLowerCase()).includes(payload.filterParam.toLowerCase());
                return valid;
            });

            return {
                ...state,
                currentContest: {...currentContest, arrayForRender: partisipantFilteredArray}
            };
    
        
        case actionTypes.CONTESTS_FILTER:
            const constestFilteredArray = state.compititionsArray.filter( contest => {
                const valid = 
                (contest.contestName.toLowerCase()).includes(payload.filterParam.toLowerCase()) || 
                (contest.id.toLowerCase()).includes(payload.filterParam.toLowerCase());
                return valid;
              });
            return {
                ...state,
                compititionsArrayForRender: constestFilteredArray,
            };

        case actionTypes.OPEN_TIMER:
            return {
                ...state,
                currentContest: {...state.currentContest, isTimerActive: !state.currentContest.isTimerActive},
            };

        case actionTypes.SET_CURRENT_PATICIPANT:
            
            
            return {
                ...state,
                currentContest: {...state.currentContest, currentParticipant: payload},
            };

        case actionTypes.SAVE_TO_LOCALSTORAGE:
                localStorage.state = JSON.stringify(state);
            return state;

        case actionTypes.DELETE_CONTEST:

            const contestIndexInArray = state.compititionsArray.findIndex(contest => contest.id === payload.id);
            const newCompititionsArray = [...state.compititionsArray];
            newCompititionsArray.splice(contestIndexInArray, 1);
            
            return {
                ...state,
                compititionsArray: newCompititionsArray,
                compititionsArrayForRender: newCompititionsArray,
            };

        default:
            return state;   
    }
};