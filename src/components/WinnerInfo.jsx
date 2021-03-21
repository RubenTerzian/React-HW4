import {useDispatch, useSelector} from 'react-redux';
import Button from './Button';
import {createTimeFormat} from '../useTimer';
import {Link} from 'react-router-dom';


const WinnerInfo = () => {
    const contest = useSelector(store => store.currentContest);
    const dispatch = useDispatch();
    const {listOfUsers, winner} = contest.contestInfo;
    
  const handleShowWinner = () => {
      
        dispatch({type: 'SHOW_WINNER', payload: {}});
    };
    /* jshint ignore:start */
    return(
        <div className="winner-info_container">
            <h3>Total participants: {listOfUsers ?  listOfUsers.length :'0' }</h3>
            {   winner ?
                <div className="winner-info">
                    <span><b>ID:</b> {winner.id}</span>
                    <span><b>Name:</b> {winner.firstName}</span>
                    <span><b>Surname:</b> {winner.secondName}</span>
                    <span><b>Time:</b> {createTimeFormat(winner.time)}</span>
                </div> :
                <Link to="/"><Button className='show-winner' name="Show winner" onClick={handleShowWinner}/></Link>
            }
        </div>
    )
     /* jshint ignore:end */
};

export default WinnerInfo;