import Button from "./Button";
import Input from "./Input";
import uniqid from "uniqid";
import { useState} from "react";
import useTimer from '../useTimer'
import {useDispatch, useSelector} from 'react-redux';
import { addParticipant, openTimer, setCurrentParticipant } from "../store/actionCreaters";

const actionCreater = dispatch => {
    return {
      addParticipant: ({id, firstName, secondName, time}) => {
        dispatch({type: 'ADD_PARTICIPANT', payload: {id, firstName, secondName, time}});
      },
        openTimer: () => {
        dispatch({type: 'OPEN_TIMER'});
      },
        setCurrentParticipant: (id, firstName, secondName) => {
        dispatch({type: 'SET_CURRENT_PATICIPANT', payload: {id, firstName, secondName}});
      },
    };
  };

  const Timer = () =>{
    const dispatch = useDispatch();
    const contest = useSelector(state => state.currentContest);

    const [startIsActive, setStartisActive] = useState(false);
    const [stopIsActive, setStopIsActive] = useState(false);
    const [resetIsActive, setResetIsActive] = useState(false);
    const [canselIsActive, setCanselIsActive] = useState(true);

    const {currentParticipant} = contest;

    const [time, setTime, setCounter, counter] = useTimer(startIsActive, "00:00:00", 0);

  
    const handleStart = ()=>{
        setStartisActive(true);
        setStopIsActive(true);
        setResetIsActive(false);
        setCanselIsActive(true);
    };

    const handleStop = ()=> {
        setStartisActive(false);
        setStopIsActive(false);
        setResetIsActive(true);
        setCanselIsActive(true);
    };
    
    const handleReset = ()=>{
        setStartisActive(false);
        setStopIsActive(false);
        setResetIsActive(false);
        setCanselIsActive(true);
        setCounter();
        setTime();
    };

    const handleSave = () => {
        if(counter){
          addParticipant(dispatch, {...currentParticipant, time:counter});
          setCurrentParticipant(dispatch, {});
        }else{
          alert('Время не может быть "00:00:00"');
        }
    };

    const handleCancel = () => {
        setCurrentParticipant(dispatch, {});
        openTimer(dispatch);
    };
    /* jshint ignore:start */
    return  (
         
        <div className="timer-container">
            <div className="common-wraper">
                <h2>Participant</h2>  
                <p><b>ID:</b> {currentParticipant.id}</p>
                <p><b>Participant:</b> {contest.currentParticipant.firstName + " " + currentParticipant.secondName}</p>
                <div className="timer-wraper">
                    <h1>{time}</h1>
                    <div className="btn_section">
                        <Button className="start" name="Start" onClick={handleStart} disabled={startIsActive || !stopIsActive && resetIsActive}/>  
                        <Button className="stop" name="Stop" onClick={handleStop} disabled={!stopIsActive}/>  
                        <Button className="reset" name="Reset" onClick={handleReset} disabled={!resetIsActive}/>  
                    </div>
                    <div className="final-btn-container">
                        <Button className="cancel-timer" name="Cancel" onClick={handleCancel} disabled={!canselIsActive}/>        
                        <Button className="save-timer" name="Save" onClick={handleSave} disabled={!resetIsActive}/>        
                    </div>
                </div>
            </div>
        </div>
    )
    /* jshint ignore:end */
  
  };

const RegistrationForm = () => {
    const contest = useSelector(state => state.currentContest);
    const { isTimerActive, isFinished } = contest;
    const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
      e.preventDefault();
      const {firstName, secondName} = e.target.elements;
      if(firstName.value && secondName.value){
          if(firstName.value.match(/([A-z]|[а-я]|[А-Я])/) && secondName.value.match(/([A-z]|[а-я]|[А-Я])/)){
              const id = uniqid();
              actionCreater(dispatch).setCurrentParticipant(id, firstName.value, secondName.value, isFinished);
              actionCreater(dispatch).openTimer();
              firstName.value='';
              secondName.value='';
              firstName.className="";
              firstName.placeholder = "Enter first name...";
              secondName.className="";
              secondName.placeholder = "Enter second name...";
          }else{
              alert('В имени и фамилии должна быть хотя бы одна буква');
          }

      }else{
          if(!firstName.value){
              firstName.className="ampty-input";
              firstName.placeholder = "Заполните поле";
          }
          if(!secondName.value){
              secondName.className="ampty-input";
              secondName.placeholder = "Заполните поле";
          }
      }
  };

  /* jshint ignore:start */
  return(
      <div className="registration-form">
          <h2>Registration user</h2>
          <form action="submit" onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="first-name">
                      First name:
                  </label>
                  <Input name="firstName" type="text" placeholder="Enter first name..."/>
              </div>
              <div>
                  <label htmlFor="secondName">
                      Second name:
                  </label>
                  <Input name="secondName" type="text" placeholder="Enter second name..."/>
              </div>
              <Button className={'regis-patric'} name="Register participant"/>
          </form>
          {isTimerActive && <Timer/>}
      </div>
  )
  /* jshint ignore:end */

};

export default RegistrationForm;