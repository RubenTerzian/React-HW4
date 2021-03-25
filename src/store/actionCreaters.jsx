
import uniqid from "uniqid";



export const createContest = (dispatch, name) => {
    const id = uniqid();
    const contest = {
        contestName: name,
        id: id,
        isFinished: false, 
        listOfUsers: [],
        winner: '',
        arrayForRender: [],
        isTimerActive: false,
        currentParticipant: {},
      };
   dispatch({ type: 'CREATE_CONTEST', payload: contest});
};

export const reopenCompetition = (dispatch) => {
    dispatch({ type: 'REOPEN_COMPETITION'});
};

export const showWinner = (dispatch) => {
    dispatch({ type: 'SHOW_WINNER'});
};

export const deleteParticipant = (dispatch, user) => {
    dispatch({ type: 'DELETE_PARTICIPANT', payload: user});
};

export const addParticipant = (dispatch, {id, firstName, secondName, time}) => {
    dispatch({type: 'ADD_PARTICIPANT', payload: {id, firstName, secondName, time}});
  };

export const openTimer = (dispatch) => {
    dispatch({type: 'OPEN_TIMER'});
  };

export const setCurrentParticipant = (dispatch, id, firstName, secondName) => {
    dispatch({type: 'SET_CURRENT_PATICIPANT', payload: {id, firstName, secondName}});
  };

export const filterPartisipant = (dispatch, param) => {
    dispatch({ type: 'FILTER_PARTICIPANT', payload: { filterParam: param }});
  };

export const filterContest = (dispatch, param) => {
dispatch({ type: 'CONTESTS_FILTER', payload: { filterParam: param }});
};

export const saveToLocalStorage = (dispatch) => {
dispatch({ type: 'SAVE_TO_LOCALSTORAGE'});
};

export const deleteContest = (dispatch, contest) => {
dispatch({ type: 'DELETE_CONTEST', payload:contest});
};