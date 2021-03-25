import UserCard from './UserCard';
import RegistrationForm from './RegistrationForm';
import WinnerInfo from './WinnerInfo';
import Input from './Input';
import {useDispatch, useSelector} from 'react-redux';
import Button from './Button';
import { filterContest, filterPartisipant, reopenCompetition } from '../store/actionCreaters';
import { useDebouncedCallback } from "use-debounce/lib";
import { createTimeFormat } from '../useTimer';


const Contest = (props) => {
  const contest = useSelector(state => state.currentContest);
  const {arrayForRender, isFinished, winner, contestName, id} = contest;
  const dispatch = useDispatch();
  
  const handleFilter = useDebouncedCallback((e) => {
    filterPartisipant(dispatch, e.target.value);
  },300);

  const handleGoToHome = () => {
    filterContest(dispatch, '');
    props.history.push('/');
  };
  return(
    <div className="contest">
      <div className="users-container">
          <Input 
          name='searchParticipants' 
          placeholder="Enter participant name..." 
          onChange={handleFilter}
          />
          <div className="users-cards">
            {arrayForRender.map( user => {
                return <UserCard user={user} isFinished={isFinished}/>
            })}
          </div>
        </div>
        <div className="aside-container">
          <Button className="to-competitions" name='To competitions' onClick={handleGoToHome}/>
          {isFinished && <Button className="reopen-competition" name='Reopen competition' onClick={() => reopenCompetition(dispatch)}/>} 
          {isFinished &&
          <div className="contest-winner-info">
              <h2>Contest Info</h2>
              <span><b>ID:</b> {id}</span>
              <span><b>Name:</b> {contestName}</span>
              <span><b>Winner:</b> {winner.firstName + ' ' + winner.secondName}</span>
              <span><b>Time:</b> {createTimeFormat(winner.time)}</span>
          </div>}
          {!isFinished && <RegistrationForm/>}
          {!isFinished && <WinnerInfo props={props}/>}
        </div>
    </div>
  )
};

export default Contest;