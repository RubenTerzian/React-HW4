import { useDispatch } from "react-redux";
import { deleteContest } from "../store/actionCreaters";
import Button from "./Button";
import deleteImg from '../img/delete.png';

const ContestCard = (props) => {
    const {id, contestName, isFinished, winner} = props.contest;
    const dispatch = useDispatch();
    const key = 'contest_card_key_' + props.index;
    const handleShowContest = () => {
        dispatch({type: 'SET_CURRENT_CONTEST', payload: props.contest});
        props.route.history.push('/competition/'+id);
    };

    const handleDeleteContest = () =>{
        deleteContest(dispatch, props.contest);
    };

    /* jshint ignore:start */
    return(
        <div className="contest-card" key={key +'_div'}>
            <div className="delete-contest" onClick={handleDeleteContest}>
                <img src={deleteImg} alt="Delete" />
            </div>
            <span key={key +'_id'}><b>ID:</b> {id}</span>
            <span key={key +'_name'}><b>Name:</b> {contestName}</span>
            <span key={key +'_status'}><b>Status:</b> {isFinished ? 'finished' : 'active'}</span>
            {isFinished && <span key={key + '_winner'}><b>Winner:</b> {winner.firstName +' ' + winner.secondName }</span>}
            <Button className="show-contest" name="Show" onClick={handleShowContest}/>
        </div>
    )
     /* jshint ignore:end */
};

export default ContestCard;