import {useDispatch, useSelector} from 'react-redux';
import Button from './Button';
import {createTimeFormat} from '../useTimer';
import { showWinner } from '../store/actionCreaters';


const WinnerInfo = ({props}) => {
    const contest = useSelector(store => store.currentContest);
    const dispatch = useDispatch();
    const {listOfUsers, winner, isFinished} = contest;
  const handleShowWinner = () => {
        if(listOfUsers.length){
            showWinner(dispatch);
            props.history.push('/');
        }else{
            alert('Должен быть минимум 1 участник');
        } 
    };
    /* jshint ignore:start */
    return(
        <div className="winner-info_container">
            <h3>Total participants: {listOfUsers ?  listOfUsers.length :'0' }</h3>
            {   winner && isFinished ? 
                <div className="winner-info">
                    <span><b>ID:</b> {winner.id}</span>
                    <span><b>Name:</b> {winner.firstName}</span>
                    <span><b>Surname:</b> {winner.secondName}</span>
                    <span><b>Time:</b> {createTimeFormat(winner.time)}</span>
                </div> :
                <Button className='show-winner' name="Show winner" onClick={handleShowWinner}/>
            }
        </div>
    )
     /* jshint ignore:end */
};

export default WinnerInfo;