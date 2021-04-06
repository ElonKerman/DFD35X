import React from 'react'
import './input.scss'

type InputProps = {
    type?: 'text' | 'number',
    value?: any,
    characterLimit?: number,
    posX?: number,
    posY?: number,
    onChange: (value: string) => any,
    className?: string,
    disabled?: boolean
}
export const Input = ({type, characterLimit, value: propsValue, posX, posY, onChange: onChangeProps, className: propsClassName, ...props}: InputProps) =>
{
    const onChange = (value: string) =>
    {
        if(value !== "")

        onChangeProps(value)
    }
    function currentColour(): string
    {
        if(propsValue === "")
            return ""
        else
            return "grey"
    }
    return(
            <input className={(props.disabled ?"disabled " : " ") + propsClassName} maxLength={characterLimit} style={{left: (posX + "%"), top: (posY + "%"), color: currentColour() }} disabled={props.disabled} type={type} placeholder={Array((characterLimit? characterLimit : 0) + 1).join(props.disabled ? '-' : '0')} value={propsValue} onChange={(event) => onChange(event.target.value)} />
        );
    
}