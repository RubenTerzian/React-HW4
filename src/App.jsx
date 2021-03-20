import './css/App.css';
import UserCardWithStore from './components/UserCard';
import RegistrationFormWithStore from './components/RegistrationForm';
import WinnerInfoWithStore from './components/WinnerInfo';
import Input from './components/Input';
import {connect} from 'react-redux';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import Button from './components/Button';

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

const Competitions = () => {

  return(
    <div className="competitions">
      Da
    </div>
  )
};

const  CreateContest = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return(
    <div className="create-contest-container">
        <form action="submit" onSubmit={handleSubmit}>
            <h2>Create contest</h2>
            <div>
                <label htmlFor="secondName">
                    Contest name:
                </label>
                <Input name="contestName" type="text" placeholder="Enter contest name..."/>
            </div>
            <Button className={'create-contest'} name="Create"/>
        </form>
        
    </div>
  )
}

const Competition = (props) => {
  const {arrayForRender} = props;
  const handleFilter = (e) => {
    props.filter(e.target.value);
  };
  return(
    <div className="competition">
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
  )
};


const CompetitionWithStore = connect(mapStateToProps, mapDispatchToProps)(Competition)

function App(props) {
  
  /* jshint ignore:start */
  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/competition">To competition</Link>
        <Switch>
          <Route path="/competition" component={CompetitionWithStore}/>
        </Switch>
      </div>
    </BrowserRouter>

  );
  /* jshint ignore:end */
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
