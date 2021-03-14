const Input = ({name, type, placeholder, onChange}) => {

    return  <input type={type} id={name} name={name} placeholder={placeholder} onChange={onChange} key={name + '_inp_key'}/>
    
};

export default Input;

