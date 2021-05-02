import React from 'react';
import './dropdown.scss'
import DownArrow from  '../Assets/DownArrow.png'
import {Button} from './button'

export enum DropdownType
{
    system_select,
    general_bar
}
type DropdownProps =
{
    items: Array<string>;
    type: DropdownType;
    onSelect: (index: number) => void;
    offsetX?: number;
    offseY?: number;
    disabled?: boolean,
    innerColor?: string,
    className?: string,
    label?: string
}

export class Dropdown extends React.Component<DropdownProps>
{
    state:
    {
        open: boolean,
        selected: string
    }
    constructor(props: DropdownProps)
    {
        super(props);
        this.state = {
            open: false,
            selected: props.items[0].toString()
        }
        this.selectItem = this.selectItem.bind(this);       
        this.toggleOpen = this.toggleOpen.bind(this);
    }
    toggleOpen()
    {
        this.setState({open: !this.state.open});
    }
    selectItem(index: number)
    {
        console.log("Item Index is " + index)
        this.props.onSelect(index);
        this.setState({
            selected: this.props.items[index].toString()
        });
        this.toggleOpen();
    }
    render(){
        if(!this.state.open)
        { 
            switch(this.props.type)
            {
                case(DropdownType.system_select):
                    return(
                            <Button disabled={this.props.disabled} textColor="cyan" posX={this.props.offsetX} posY={this.props.offseY} onClick={() => this.toggleOpen()} className={"bck-grey dropdown-system-body " + this.props.className}>
                                <div className="bck-black drop-top-inner" style={{backgroundColor: this.props.innerColor}}> {this.state.selected}</div>
                                <img className="drop-arrow-system" src={DownArrow} alt=""/>
                            </Button>
                    );
                case(DropdownType.general_bar):
                    return(
                            <Button disabled={this.props.disabled} posX={this.props.offsetX} posY={this.props.offseY} onClick={() => this.toggleOpen()} className="bck-grey dropdown-general-body">
                                {this.props.label}
                                <img className="drop-arrow-general" src={DownArrow} alt=""/>
                            </Button>
                    );
            }
        }
        else{
            var item_elements: Array<JSX.Element> = [];
            this.props.items.map((item, index) => (
                item_elements.push(<span style={{top: (index * (100 / this.props.items.length) + 5   + "%")}} onClick={() => this.selectItem(index)} className='drop-item'>{item}</span>)
            ));           
                
            switch(this.props.type)
            {
                case(DropdownType.system_select):
                    return(
                            <Button disabled={this.props.disabled} textColor="cyan" posX={this.props.offsetX} posY={this.props.offseY} onClick={() => this.toggleOpen()} className={"bck-grey dropdown-system-body " + this.props.className}>
                                <div style={{backgroundColor: this.props.innerColor}} className="bck-black drop-top-inner"> 
                                    {this.state.selected}
                                </div>
                                <img className="drop-arrow-system" src={DownArrow} alt=""/>
                                <div style={{height: (this.props.items.length * 80 + "%")}}className="bck-dark-grey frnt-white
                                drop-lower-body">                        
                                    {item_elements}
                                </div>
                            </Button>
                    );
                case(DropdownType.general_bar):
                return(
                    <Button disabled={this.props.disabled} posX={this.props.offsetX} posY={this.props.offseY} onClick={() => this.toggleOpen()} className="bck-grey dropdown-general-body">
                        {this.props.label}
                        <img className="drop-arrow-general" src={DownArrow} alt=""/>
                        <div style={{height: (this.props.items.length * 80 + "%")}}className="bck-dark-grey frnt-grey
                        drop-lower-body">                         
                        {item_elements}
                    </div>
                </Button>
                );
            }
        }
    }
}