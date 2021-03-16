import Button from "./Button";
import Input from "./Input";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { useState, useEffect } from "react";

export const createTimeFormat = (counter) => {
    const timeConfig ={
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

      if(counter/60 < 1){
        // seconds
        timeConfig.seconds = counter;
      }else{
        if(counter/(60*60) < 1){
          timeConfig.minutes = Math.floor(counter/60);
          timeConfig.seconds = counter%(60);
        }else{
          timeConfig.hours = Math.floor(counter/(60*60));
          timeConfig.minutes = Math.floor(counter/60%60);
          timeConfig.seconds = counter%60;
        }
      }

      const timeFormat = 
           (timeConfig.hours<10 ? '0' + timeConfig.hours : timeConfig.hours) + ':' + 
           (timeConfig.minutes<10 ? '0' + timeConfig.minutes : timeConfig.minutes) + ':' + 
           (timeConfig.seconds<10 ? '0' + timeConfig.seconds : timeConfig.seconds);
           return timeFormat;
};

const mapDispatchToProps = dispatch => {
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

  const mapStateToProps = store => {
    return {
      isTimerActive: store.isTimerActive,
      currentParticipant: store.currentParticipant
    };
  };

  const Timer = ({props}) =>{

    const [time, setTime] = useState("00:00:00");
    const [counter, setCounter] = useState(0);
    const [startIsActive, setStartisActive] = useState(true);
    const [stopIsActive, setStopIsActive] = useState(false);
    const [resetIsActive, setResetIsActive] = useState(false);
    const [canselIsActive, setCanselIsActive] = useState(true);

    const {setCurrentParticipant, openTimer, addParticipant, currentParticipant} = props;

    useEffect(()=>{
      let intervalId;
      if(!startIsActive){
  
        intervalId = setInterval(()=>{
          const timeFormat = createTimeFormat(counter);
          setTime(timeFormat);
          setCounter(counter+1);
        },20);
      }
      return () =>{
          clearInterval(intervalId);
      };
    }, [startIsActive, setTime, counter]);
  
    const handleStart = ()=>{
        setStartisActive(false);
        setStopIsActive(true);
        setResetIsActive(false);
        setCanselIsActive(true);
    };

    const handleStop = ()=> {
        setStartisActive(true);
        setStopIsActive(false);
        setResetIsActive(true);
        setCanselIsActive(true);
    };
    
    const handleReset = ()=>{
        setStartisActive(true);
        setStopIsActive(false);
        setResetIsActive(false);
        setCanselIsActive(true);
        setCounter(0);
        setTime("00:00:00");
    };

    const handleSave = () => {
        if(counter){
          addParticipant({...currentParticipant, time:counter});
          setCurrentParticipant({});
          openTimer();
        }else{
          alert('Время не может быть "00:00:00"');
        }
    };

    const handleCancel = () => {
        setCurrentParticipant({});
        props.openTimer();
    };
    /* jshint ignore:start */
    return  (
         
        <div className="timer-container">
            <div className="common-wraper">
                <h2>Participant</h2>  
                <p><b>ID:</b> {currentParticipant.id}</p>
                <p><b>Participant:</b> {currentParticipant.firstName + " " + currentParticipant.secondName}</p>
                <div className="timer-wraper">
                    <h1>{time}</h1>
                    <div className="btn_section">
                        <Button className="start" name="Start" onClick={handleStart} disabled={!startIsActive || !stopIsActive && resetIsActive}/>  
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

const RegistrationForm = (props) => {
  const {openTimer, isTimerActive, setCurrentParticipant} = props;

  const handleSubmit = (e) => {
      e.preventDefault();
      const {firstName, secondName} = e.target.elements;
      if(firstName.value && secondName.value){
          if(firstName.value.match(/([A-z]|[а-я]|[А-Я])/) && secondName.value.match(/([A-z]|[а-я]|[А-Я])/)){
              const id = uniqid();
              setCurrentParticipant(id, firstName.value, secondName.value);
              openTimer();
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
          {isTimerActive && <Timer props={props}/>}
      </div>
  )
  /* jshint ignore:end */

};

const RegistrationFormWithStore = connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

export default RegistrationFormWithStore;