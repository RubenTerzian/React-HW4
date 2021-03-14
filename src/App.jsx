import './css/App.css';
import UserCard from './components/UserCard';
import RegistrationForm from './components/RegistrationForm';
import WinnerInfo from './components/WinnerInfo';
import Input from './components/Input';
import store from './store';

function App() {
  const {getState} = store;
  const {listOfUsers} = getState();
  return (
    <div className="App">
      <div className="users-container">
        <Input name='searchParticipants'/>
        <div className="users-cards">
          {listOfUsers.map( user => {
            console.log(user)
            const {firstName, secondName} = user;
              return <UserCard name={firstName} secondName={secondName}/>
          })}
        </div>
      </div>
      <div className="aside-container">
        <RegistrationForm/>
        <WinnerInfo/>
      </div>
    </div>
  );
}

export default App;
