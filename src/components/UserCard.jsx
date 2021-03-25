import {useDispatch } from "react-redux";
import Button from "./Button";
import {createTimeFormat} from '../useTimer';
import { deleteParticipant, saveToLocalStorage } from "../store/actionCreaters";
import { useBeforeunload } from "react-beforeunload";


const UserCard = (props) => {
    const {id, firstName, secondName, time} = props.user;
    const dispatch = useDispatch()
    useBeforeunload(() => {
        saveToLocalStorage(dispatch)
      });
    const key = 'user_card_key';
    /* jshint ignore:start */
    return(
        <div className="user-card" key={key +'_div'}>
            <span key={key +'_id'}><b>ID:</b> {id}</span>
            <span key={key +'_name'}><b>Name:</b> {firstName}</span>
            <span key={key +'_secName'}><b>Surname:</b> {secondName}</span>
            <span key={key +'_time'}><b>Time:</b> {createTimeFormat(time)}</span>
            {!props.isFinished && <Button className="delete-user" name="Delete" onClick={ () => deleteParticipant(dispatch, props.user)}/>}
        </div>
    )
     /* jshint ignore:end */
};

export default UserCard;