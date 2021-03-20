import {connect} from 'react-redux';
import Button from './Button';
import {createTimeFormat} from '../useTimer';
import {Link} from 'react-router-dom';


const mapDispatchToProps = dispatch => {
    return {
      showWinner: () => {
        dispatch({type: 'SHOW_WINNER'});
      }
    };
  };

  const mapStateToProps = store => {
    return {
      listOfUsers: store.listOfUsers,
      winner: store.winner,
    };
  };

const WinnerInfo = (props) => {

    const {listOfUsers, winner, showWinner} = props;
    /* jshint ignore:start */
    return(
        <div className="winner-info_container">
            <h3>Total participants: {listOfUsers ?  listOfUsers.length :'0' }</h3>
            {   winner ?
                <div className="winner-info">
                    <span><b>ID:</b> {winner.id}</span>
                    <span><b>Name:</b> {winner.firstName}</span>
                    <span><b>Surname:</b> {winner.secondName}</span>
                    <span><b>Time:</b> {createTimeFormat(winner.time)}</span>
                </div> :
                <Link to="/"><Button className='show-winner' name="Show winner" onClick={showWinner}/></Link>
                

            }
        </div>
    )
     /* jshint ignore:end */
};

const WinnerInfoWithStore = connect(mapStateToProps, mapDispatchToProps)(WinnerInfo);

export default WinnerInfoWithStore;