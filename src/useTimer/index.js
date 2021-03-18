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

const  useTimer = (startIsActive, newTime, newCounter) => {
    const [time, setTime] = useState("00:00:00");
    const [counter, setCounter] = useState(0);

    useEffect(()=>{
        let intervalId;
        if(startIsActive){
    
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

    return [
        time,
        () => setTime(newTime),
        () => setCounter(newCounter),
        counter
    ];
};

export default useTimer;

