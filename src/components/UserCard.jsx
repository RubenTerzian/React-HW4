import { connect } from "react-redux";
import Button from "./Button";
import {createTimeFormat} from '../useTimer';

const mapDispatchToProps = dispatch => {
    return {
      delete: (user) => {
        dispatch({type: 'DELETE_PARTICIPANT', payload: user});
      }
    };
  };

const UserCard = (props) => {
    const {id, firstName, secondName, time} = props.user;
    const key = 'user_card_key';
    /* jshint ignore:start */
    return(
        <div className="user-card" key={key +'_div'}>
            <span key={key +'_id'}><b>ID:</b> {id}</span>
            <span key={key +'_name'}><b>Name:</b> {firstName}</span>
            <span key={key +'_secName'}><b>Surname:</b> {secondName}</span>
            <span key={key +'_time'}><b>Time:</b> {createTimeFormat(time)}</span>
            <Button className="delete-user" name="Delete" onClick={e => props.delete(props.user)}/>
        </div>
    )
     /* jshint ignore:end */
};

const UserCardWithStore = connect(null, mapDispatchToProps)(UserCard);

export default UserCardWithStore;