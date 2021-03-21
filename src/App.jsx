import './css/App.css';
import Input from './components/Input';
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import Button from './components/Button';
import uniqid from "uniqid";
import ContestCard from './components/ContestCard';
import Contest from './components/Contest'

const Competitions = (props) => {

  const compititionsArray = useSelector(state => state.compititionsArray);
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    dispatch({type: 'CONTESTS_FILTER', payload: e.target.value });
  };

  return(
    <div className="competitions">
      <Input 
        name='searchContest'
        placeholder="Enter contest name..."
        onChange={handleFilter}
      />
      <Link to="/create"><Button className='create-contest' name="Create contest"/></Link>
      <div className="contests-list">
            {compititionsArray.map( (contest, index) => {
              return <ContestCard contest={contest} index={index} route={props}/>
            })}
      </div>
    </div>
  )
};

const CreateContest = (props) => {
  
  const dispatch = useDispatch();
  console.log(props)
  const contestInfo = {
    listOfUsers: [],
    winner: '',
    arrayForRender: [],
    isFilter: false,
    isTimerActive: false,
    currentParticipant: {},
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const {contestName} = e.target.elements;
    
    const id = uniqid();
    dispatch({ type: 'CREATE_CONTEST', payload: { contestName: contestName.value, id, contestInfo, isFinished: false } });
    props.history.push('/')
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
            <Button className={'create-contest'} name={"Create"}/>
        </form>
        
    </div>
  )
}


function App() {
  const compititionsArray = useSelector(state => state.compititionsArray);
  
  /* jshint ignore:start */
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Competitions} />
          <Route path="/create" component={CreateContest} />
          {compititionsArray.map( (contest, index) => {
              const id = contest.id
            return <Route path={"/competition/:" + id} key={'key_' + contest + index} component={Contest}/>
            })}
        </Switch>
      </div>
    </BrowserRouter>

  );
  /* jshint ignore:end */
}

export default App;
