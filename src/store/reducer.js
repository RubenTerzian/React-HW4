import {actionTypes} from './actionTypes';



const initState = {
    compititionsArray: [],
    currentContest: {}
};

export const reducer = (state=initState, action) => {
    const {type, payload} = action;
    let currentContestInfo = {...state.currentContest.contestInfo};
    const contestIndex = state.compititionsArray.findIndex(contest => contest.id === state.currentContest.id);
    const newArray = [...state.compititionsArray];

    switch (type) {
        
        case actionTypes.CREATE_CONTEST:
            localStorage.compititionsArray = JSON.stringify([payload, ...state.compititionsArray]);
            return {
                ...state,
                compititionsArray: [...state.compititionsArray, payload]
            };

        case actionTypes.SET_CURRENT_CONTEST:
            return {
                ...state,
                currentContest: payload
            };
        
        case actionTypes.ADD_PARTICIPANT:
            const {listOfUsers, arrayForRender} = currentContestInfo;
            const contestInfo = {
                ...currentContestInfo,
                listOfUsers: [payload, ...listOfUsers],
                arrayForRender: [payload, ...arrayForRender],
                isTimerActive: !currentContestInfo.isTimerActive,
                winer: '',
            };
            
            newArray[contestIndex] = {...state.currentContest, contestInfo};
            return {
                ...state,
                compititionsArray: newArray,
                currentContest: {...state.currentContest, contestInfo}
            };

        case actionTypes.SHOW_WINNER:
            const winer = newArray[contestIndex].contestInfo.listOfUsers.sort((a,b) => a.time-b.time)
            newArray[contestIndex].contestInfo.winer = winer[0];
            newArray[contestIndex].isFinished = true;
            console.log(newArray);
            return {
                ...state,
                compititionsArray: newArray,
                currentContest: {}
            };

        // case actionTypes.DELETE_PARTICIPANT:
        //     // const index = state.listOfUsers.findIndex(participant => participant.id === payload.id);
        //     // const listOfUsers = [...state.listOfUsers];
        //     // listOfUsers.splice(index, 1);

        //     // const listOfUsersLS = JSON.parse(localStorage.getItem('listOfUsers'));
        //     // const indexLS = listOfUsersLS.findIndex(participant => participant.id === payload.id);
        //     // listOfUsersLS.splice(indexLS, 1);
        //     // localStorage.listOfUsers = JSON.stringify(listOfUsersLS);
        //     return {
        //         // ...state,
        //         // listOfUsers: listOfUsers,
        //         // arrayForRender: listOfUsers,
        //         // winner: '',
        //     };

        // case actionTypes.FILTER:
        //     // const arrayForRender = state.listOfUsers.filter( participant => {
        //     //     const valid = 
        //     //     (participant.firstName.toLowerCase()).includes(payload.toLowerCase()) || 
        //     //     (participant.id.toLowerCase()).includes(payload.toLowerCase());
        //     //     return valid;
        //     // });

        //     return {
        //         // ...state,
        //         // arrayForRender: arrayForRender,
        //         // isFilter: !payload ? false : true,
        //     };
        
        // case actionTypes.CONTESTS_FILTER:
        //     console.log('filtering contests');
        //     // const arrayForRender = state.listOfUsers.filter( participant => {
        //     //     const valid = 
        //     //     (participant.firstName.toLowerCase()).includes(payload.toLowerCase()) || 
        //     //     (participant.id.toLowerCase()).includes(payload.toLowerCase());
        //     //     return valid;
        //     //   });
        //     return {
        //         ...state,
        //         // arrayForRender: arrayForRender,
        //         // isFilter: !payload ? false : true,
        //     };

        case actionTypes.OPEN_TIMER:
            currentContestInfo.isTimerActive = !state.currentContest.contestInfo.isTimerActive;
            return {
                ...state,
                currentContest: {...state.currentContest, contestInfo: currentContestInfo},
            };

        case actionTypes.SET_CURRENT_PATICIPANT:
            
            currentContestInfo = {...state.currentContest.contestInfo};
            currentContestInfo.currentParticipant = payload;
            
            return {
                ...state,
                currentContest: {...state.currentContest, contestInfo: currentContestInfo},
            };
        default:
            return state;   
    }
};