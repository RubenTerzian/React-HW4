

const Button = ({className, onClick, name, disabled, key}) => {
    /* jshint ignore:start */
    return(
        <button className={className + '-btn'} onClick={onClick} key={name + "_btn_key"} disabled={disabled} key={key}>{name}</button>
    )
     /* jshint ignore:end */    

};

export default Button;