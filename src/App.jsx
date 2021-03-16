import './css/App.css';
import UserCardWithStore from './components/UserCard';
import RegistrationFormWithStore from './components/RegistrationForm';
import WinnerInfoWithStore from './components/WinnerInfo';
import Input from './components/Input';
import {connect} from 'react-redux';


const mapStateToProps = store => {
  return {
    listOfUsers: store.listOfUsers,
    arrayForRender: store.arrayForRender,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filter: (value) => {
      dispatch({type: 'FILTER', payload: value});
    }
  };
};


function App(props) {
  const {arrayForRender} = props;
  const handleFilter = (e) => {
    props.filter(e.target.value);
  };
  /* jshint ignore:start */
  return (
      <div className="App">
        <div className="users-container">
          <Input 
          name='searchParticipants' 
          placeholder="Enter participant name..." 
          onChange={handleFilter}
          />
          <div className="users-cards">
            {arrayForRender.map( user => {
                return <UserCardWithStore user={user}/>
            })}
          </div>
        </div>
        <div className="aside-container">
          <RegistrationFormWithStore/>
          <WinnerInfoWithStore/>
        </div>
      </div>

  );
  /* jshint ignore:end */
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
