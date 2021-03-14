import Button from "./Button"



const UserCard = ({id, name, secondName, time}) => {
    const key = 'user_card_key';
    return(
        <div className="user-card" key={key +'_div'}>
            <span key={key +'_id'}>ID: {id}</span>
            <span key={key +'_name'}>Name: {name}</span>
            <span key={key +'_secName'}>Second name: {secondName}</span>
            <span key={key +'_time'}>Time: {time}</span>
            <Button className="delete-user-btn" name="Delete"/>
        </div>
    )
}

export default UserCard