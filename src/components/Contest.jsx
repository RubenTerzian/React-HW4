import UserCardWithStore from './UserCard';
import RegistrationForm from './RegistrationForm';
import WinnerInfo from './WinnerInfo';
import Input from './Input';
import {useDispatch, useSelector} from 'react-redux';

const Contest = (props) => {
  const compititionsArray = useSelector(state => state.compititionsArray);
  const id = Object.keys(props.match.params)[0];
  const contest = compititionsArray.find(contest => contest.id === id);
  const {contestInfo, isFinished} = contest;

  const dispatch = useDispatch();
  // dispatch({type: 'SET_CURRENT_CONTEST', payload: contest});
  const handleFilter = (e) => {
    dispatch({ type: 'FILTER', payload: { filterParam: e.target.value, contest }});
  };

  // console.log(contest.contestInfo.arrayForRender);
  return(
    <div className="contest">
      <div className="users-container">
          <Input 
          name='searchParticipants' 
          placeholder="Enter participant name..." 
          onChange={handleFilter}
          />
          <div className="users-cards">
            {contestInfo.arrayForRender.map( user => {
                return <UserCardWithStore user={user} isFinished={isFinished}/>
            })}
          </div>
        </div>
        <div className="aside-container">
        {!isFinished && <RegistrationForm/>}
        {!isFinished && <WinnerInfo/>}
        </div>
    </div>
  )
};

export default Contest;