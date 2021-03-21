import UserCardWithStore from './UserCard';
import RegistrationForm from './RegistrationForm';
import WinnerInfo from './WinnerInfo';
import Input from './Input';
import {useDispatch, useSelector} from 'react-redux';

const Contest = (props) => {
  const compititionsArray = useSelector(state => state.compititionsArray);
  const id = Object.keys(props.match.params)[0];
  const contest = compititionsArray.find(contest => contest.id === id);
  console.log(contest)
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    dispatch({ type: 'FILTER', payload: { filterParam: e.target.value, contest }});
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
            {contest.contestInfo.arrayForRender.map( user => {
                return <UserCardWithStore user={user} />
            })}
          </div>
        </div>
        <div className="aside-container">
        <RegistrationForm contest={contest}/>
        <WinnerInfo contest={contest}/>
        </div>
    </div>
  )
};

export default Contest;