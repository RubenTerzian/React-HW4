import store from "../store";
import Button from "./Button";
import Input from "./Input";

const RegistrationForm = () => {
    const {dispatch, getState} = store;
    const handleSubmit = (e) => {
        e.preventDefault();
        const {listOfUsers} = getState();
        const {firstName, secondName} = e.target.elements;
        dispatch({type: 'ADD_PARTICIPANT', payload:[{firstName: firstName.value, secondName: secondName.value}, ...listOfUsers]});
        console.log(getState().listOfUsers);
    };

    return(
        <div className="registration-form">
           <form action="submit" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first-name">
                        First name:
                    </label>
                    <Input name="firstName" type="text" placeholder="Enter first name..."/>
                </div>
                <div>
                    <label htmlFor="secondName">
                        Second name:
                    </label>
                    <Input name="secondName" type="text" placeholder="Enter second name..."/>
                </div>
                <Button className={'regis-patric-btn'} name="Register Participant"/>
           </form>

        </div>
    )
}

export default RegistrationForm;