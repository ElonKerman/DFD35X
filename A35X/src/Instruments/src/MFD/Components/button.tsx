
type ButtonProps = {
    posX?: number,
    posY?: number,
    onClick?: (e?: any) => any,
    className?: string,
    disabled?: boolean,
    textColor?: string,
    children?: any,
    height?: number,
}
export const Button = ({onClick,...props}: ButtonProps) =>
{
    return(
        <button style={{height:  (props.height + "%"), left: (props.posX + "%"), top: (props.posY + "%"), color: (props.disabled ? "rgb(180,180,180)" : props.textColor ? props.textColor :  "white")}} className={props.className} disabled={props.disabled} onClick={onClick}>{props.children}</button>
    );
}