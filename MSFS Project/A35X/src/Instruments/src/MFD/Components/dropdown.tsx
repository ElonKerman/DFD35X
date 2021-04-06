import React from 'react';
import './dropdown.scss'

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
                            <button style={{left: (this.props.offsetX + "%"), top: (this.props.offseY + "%")}} onClick={() => this.toggleOpen()} className="bck-grey dropdown-system-body">
                                <div className="bck-black drop-top-inner"> {this.state.selected}</div>
                                <img className="drop-arrow" src="../Assets/DownArrow.png" alt=""/>
                            </button>
                    );
                case(DropdownType.general_bar):
                    return(
                            <button style={{left: (this.props.offsetX + "%"), top: (this.props.offseY + "%")}} onClick={() => this.toggleOpen()} className="bck-grey dropdown-general-body">
                                {this.state.selected}
                                <img className="drop-arrow" src="../Assets/DownArrow.png" alt=""/>
                            </button>
                    );
            }
        }
        else{
            var item_elements: Array<JSX.Element> = [];
            this.props.items.map((item, index) => (
                item_elements.push(<span style={{top: (index * (100 / this.props.items.length)  + "%")}} onClick={() => this.selectItem(index)} className='drop-item'>{item}</span>)
            ));           
                
            switch(this.props.type)
            {
                case(DropdownType.system_select):
                    return(
                            <button style={{left: (this.props.offsetX + "%"), top: (this.props.offseY + "%")}} onClick={() => this.toggleOpen()} className="bck-grey dropdown-system-body">
                                <div className="bck-black drop-top-inner"> 
                                    {this.state.selected}
                                </div>
                                <img className="drop-arrow" src="../Assets/DownArrow.png" alt=""/>
                                <div style={{height: (this.props.items.length * 80 + "%")}}className="bck-blue-grey
                                drop-lower-body"><div className="bck-dark-grey drop-lower-inner">                            
                                    {item_elements}
                                </div>
                                </div>
                            </button>
                    );
                case(DropdownType.general_bar):
                return(
                    <button style={{left: (this.props.offsetX + "%"), top: (this.props.offseY + "%")}} onClick={() => this.toggleOpen()} className="bck-grey dropdown-general-body">
                        {this.state.selected}
                        <img className="drop-arrow" src="../Assets/DownArrow.png" alt=""/>
                        <div style={{height: (this.props.items.length * 80 + "%")}}className="bck-blue-grey
                        drop-lower-body"><div className="bck-dark-grey drop-lower-inner">                            
                        {item_elements}
                        </div>
                    </div>
                </button>
                );
            }
        }
    }
}