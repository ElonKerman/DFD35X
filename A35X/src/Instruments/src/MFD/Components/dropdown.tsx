import React, { useState } from 'react';
import './dropdown.scss'
import DownArrow from  '../Assets/DownArrow.png'
import {Button} from './button'
import { useClickOutsideListenerRef } from './OutsideClickHook';
import { Content } from './OutsideClickConent';

export enum DropdownType
{
    system_select,
    general
}
type DropdownProps =
{
    items: Array<string>;
    type: DropdownType;
    onSelect: (index: number) => void;
    offsetX?: number;
    offsetY?: number;
    disabled?: boolean,
    innerColor?: string,
    className?: string,
    label?: string,
    height?: string,
    width?: string,
    defaultIndex?: number,
    noneOption?: boolean,
}

export const Dropdown = (props: DropdownProps) =>
{
    const [open, setOpen] = useState(Boolean);
    const [selected, selectState] = useState(String);

    function selectItem(index: number)
    {
        console.log("Item Index is " + index)
        props.onSelect(index);
        selectState(index >= 0 ? this.props.items[index].toString() : "NONE");
        setOpen(true);
    }
    if(props.disabled)
        setOpen(false);
    if(!open)
    { 
        switch(props.type)
        {
            case(DropdownType.system_select):
                return(
                        <Button disabled={props.disabled} textColor="cyan" posX={props.offsetX} posY={props.offsetY} onClick={() => setOpen(true)} className={"dropdown-system-body " + props.className}>
                            <div className="bck-black drop-top-inner" style={{backgroundColor: props.innerColor}}> {selected}</div>
                            <img className="drop-arrow-system" src={DownArrow} alt=""/>
                        </Button>
                );
            case(DropdownType.general):
                return(
                        <Button height={props.height} width={props.width} disabled={props.disabled} posX={props.offsetX} posY={props.offsetY} onClick={() =>  setOpen(true)} className="dropdown-general-body">
                            {props.label ? props.label : selected}
                            <img className="drop-arrow-general" src={DownArrow} alt=""/>
                        </Button>
                );
        }
    }
    else
    {
        var item_elements: Array<JSX.Element> = [];
        if(props.noneOption)
            item_elements.push(<span style={{top: "8px"}} onClick={() => selectItem(-1)} className='drop-item'>NONE</span>)
        props.items.map((item, index) => (
            item_elements.push(<span style={{top: (index + (props.noneOption ? 1 : 0)) * 22 + 5 + "px"}} onClick={() => selectItem(index)} className='drop-item'>{item}</span>)
        ));                       
        switch(props.type)
        {
            case(DropdownType.system_select):
                return(
                        <Button disabled={props.disabled} textColor="cyan" posX={props.offsetX} posY={props.offsetY} onClick={() => setOpen(false)} className={"dropdown-system-body " + props.className}>
                            <div style={{backgroundColor: props.innerColor}} className="bck-black drop-top-inner"> 
                                {selected}
                            </div>
                            <img className="drop-arrow-system" src={DownArrow} alt=""/>
                            {/* <Content onClose={() => setOpen(false)}> */}
                                <div style={{height: (item_elements.length * 22 + 3 + "px")}}className="bck-dark-grey frnt-white
                                drop-lower-body">                        
                                    {item_elements}
                                </div>
                            {/* </Content> */}
                        </Button>
                );
            case(DropdownType.general):
            return(
                <Button height={props.height} width={props.width} disabled={props.disabled} posX={props.offsetX} posY={props.offsetY} onClick={() => setOpen(false)} className="dropdown-general-body">
                    {props.label ? props.label : selected}
                    <img className="drop-arrow-general" src={DownArrow} alt=""/>
                    {/* <Content onClose={() => setOpen(false)}> */}
                        <div style={{height: (item_elements.length * 22 + 3 + "px")}}className="bck-dark-grey frnt-grey
                        drop-lower-body">                         
                        {item_elements}
                        </div>
                    {/* </Content> */}
                </Button>
            );
        }
    }    
}