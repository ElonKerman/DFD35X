import React from "react";

type ButtonProps = {
    posX?: number,
    posY?: number,
    onClick?: (e?: any) => any,
    className?: string,
    disabled?: boolean,
    textColor?: string,
    children?: any,
    height?: string,
    width?: string,
}
export const Button = ({onClick,...props}: ButtonProps) =>
{
    return(
        <button style={{width: props.width, height: props.height, left: (props.posX + "%"), top: (props.posY + "%"), color: (props.disabled ? "rgb(180,180,180)" : props.textColor ? props.textColor :  "white")}} className={props.className} disabled={props.disabled} onClick={onClick}>{props.children}</button>
    );
}