import React from 'react'
import {Dropdown, DropdownType} from '../../Components/dropdown'
import './fms_style.scss'
import {FMS_Init} from './Pages/FMS_Init'

type FMS_Props =
{

}
export class FMS_Sys extends React.Component<FMS_Props>
{
    constructor(props : FMS_Props)
    {
        super(props)
        this.state = {
            currentPage: "ACTIVE/INIT"
        }
    }
    state:{
        currentPage: string
    }
    currentPage()
    {
        switch(this.state.currentPage)
        {
            case("ACTIVE/INIT"):
                return(<FMS_Init/>);
        }
    }
    render()
    {
        return(
            <div className="SystemWindow">               
                <Dropdown onSelect={(i) => console.log("Selected " + i)} type={DropdownType.general_bar} items={["ACTIVE"]}/>
                <Dropdown onSelect={(i) => console.log("Selected " + i)} offsetX={25} type={DropdownType.general_bar} items={["POSITION"]}/>
                <Dropdown onSelect={(i) => console.log("Selected " + i)} offsetX={50} type={DropdownType.general_bar} items={["SEC INDEX"]}/>
                <Dropdown onSelect={(i) => console.log("Selected " + i)} offsetX={75} type={DropdownType.general_bar} items={["DATA"]}/>                              
                <div id="fms-header" className="bck-white frnt-grey"><h1>{this.state.currentPage}</h1></div>
                {this.currentPage()}             
            </div>
        );
    }
}