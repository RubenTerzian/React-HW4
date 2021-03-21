import Button from "./Button";

const ContestCard = (props) => {
    const {id, contestName, isFinished} = props.contest;
    const key = 'contest_card_key_' + props.index;
    console.log(props)
    const handleShowContest = () => {
        props.route.history.push('/competition/'+id)
    }

    /* jshint ignore:start */
    return(
        <div className="contest-card" key={key +'_div'}>
            <span key={key +'_id'}><b>ID:</b> {id}</span>
            <span key={key +'_name'}><b>Name:</b> {contestName}</span>
            <span key={key +'_status'}><b>Status:</b> {isFinished ? 'finished' : 'active'}</span>
            {isFinished && <span key={key + '_winner'}><b>Winner:</b> </span>}
            <Button className="show-contest" name="Show" onClick={handleShowContest}/>
        </div>
    )
     /* jshint ignore:end */
};

export default ContestCard;