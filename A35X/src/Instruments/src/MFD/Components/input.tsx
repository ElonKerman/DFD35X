import React from 'react'
import './input.scss'

type InputProps = {
    type?: 'text' | 'number',
    defaultValue?: any,
    value?: any,
    characterLimit?: number,
    posX?: number,
    posY?: number,
    onChange: (value: string) => any,
    className?: string,
    disabled?: boolean,
    placeHolder?: string
}
export const Input = ({type, characterLimit,defaultValue: defaultValue, value: propsValue, posX, posY, onChange: onChangeProps, className: propsClassName, ...props}: InputProps) =>
{
    let val = defaultValue
    const onChange = (value: string) =>
    {
        val = value
        if(value !== "")
            onChangeProps(value)
    }
    function currentColour(): string
    {
        if(val === "")
            return ""
        else
            return "cyan"
    }
    function placeholder(): string
    {
        if(props.disabled)
        {
            return (Array((characterLimit? characterLimit : 0) + 1).join('-'))
        }
        else
        {
            return (props.placeHolder ? props.placeHolder : Array((characterLimit? characterLimit : 0) + 1).join(props.disabled ? '-' : '0'))
        }
    }
    return(
            <input color={currentColour()} className={(props.disabled ?"disabled " : " ") + propsClassName} maxLength={characterLimit} style={{left: (posX + "%"), top: (posY + "%"), color: currentColour() }} disabled={props.disabled} type={type} placeholder={placeholder()} value={propsValue} defaultValue={defaultValue} onChange={(event) => onChangeProps(event.target.value)} />
        );
    
}