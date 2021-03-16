const Input = ({name, type, placeholder, onChange}) => {
    /* jshint ignore:start */
    return  <input type={type} id={name} name={name} placeholder={placeholder} onChange={onChange} key={name + '_inp_key'}/>
    /* jshint ignore:end */
};

export default Input;

