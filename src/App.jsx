import './css/App.css';
import Input from './components/Input';
import {useDispatch, useSelector} from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Button from './components/Button';
import ContestCard from './components/ContestCard';
import Contest from './components/Contest';
import { createContest, filterContest, saveToLocalStorage} from './store/actionCreaters';
import { useDebouncedCallback } from 'use-debounce/lib';
import { useBeforeunload } from 'react-beforeunload';

const Competitions = (props) => {

  const compititionsArrayForRender = useSelector(state => state.compititionsArrayForRender);
  const dispatch = useDispatch();

  const handleFilter = useDebouncedCallback((e) => {
    filterContest(dispatch, e.target.value);
  },300);
  

  return(
    <div className="competitions">
      <div className="competitions_top">
        <Input 
          name='searchContest'
          placeholder="Enter contest name..."
          onChange={handleFilter}
        />
        <Link to="/create"><Button className='create-contest' name="Create contest"/></Link>
      </div>
      <div className="contests-list">
            {compititionsArrayForRender.map( (contest, index) => {
              return <ContestCard contest={contest} index={index} route={props}/>
            })}
      </div>
    </div>
  )
};

const CreateContest = (props) => {
  
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
    const {contestName} = e.target.elements;
    if(contestName){
      createContest(dispatch, contestName.value) 
      props.history.push('/')
    }else{
      alert('Имя соревнования не может быть пустой строкой') ;
    }
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
  const compititionsArray = useSelector(state => (state.compititionsArray));
  const dispatch =useDispatch()
  useBeforeunload(() => {
    saveToLocalStorage(dispatch)
  });
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
