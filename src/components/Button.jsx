

const Button = ({className, onClick, name}) => {

    return(
    <button className={className} onClick={onClick} key={name+"_btn_key"}>{name}</button>
    )
}

export default Button;