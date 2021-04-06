import ReactDOM from 'react-dom'
import React from 'react'
import './mfd-main-style.scss'
import { Dropdown, DropdownType } from './Components/dropdown'
import { FMS_Sys } from './Systems/FMS/FMS_Sys'
import { ATC_COM_Sys } from './Systems/ATC_COM_Sys'
import { SURV_Sys } from './Systems/SURV_Sys'
import { Checklist_Sys } from './Systems/Checklist_Sys'
import { FCU_BKUP_Sys } from './Systems/FCU_BKUP_Sys'


import {
    renderTarget,
    useInteractionEvent,
    getSimVar,
    setSimVar,
    useUpdate
} from '../util.js';

type MFD_Props = {
    side: string
}
export class MFD_BODY extends React.Component<MFD_Props>
{
    state:{
        page: number
    }
    constructor(props: MFD_Props)
    {
        super(props)
        this.state = {
            page: 0
        };
    }
    currentPage()
    {
        switch(this.state.page)
        {
            case 0: 
                return(<FMS_Sys/>);
            case 1:
                return(<ATC_COM_Sys/>);
            case 2:
                return(<SURV_Sys/>);
            case 3:
                return(<Checklist_Sys/>);
            case 4:
                return(<FCU_BKUP_Sys/>);
        }
    }
    render()
    {
        return(
            <div id={this.props.side} className="mfd-body"> 
                <Dropdown type={DropdownType.system_select} onSelect={(index) => this.setState({page: index})} items={[("FMS" + (this.props.side === "left" ? "1" : "2")), "ATC COM", "SURV", "C/L MENU", "FCU BKUP"]}></Dropdown>
                <span id="flight-num">{getSimVar("ATC FLIGHT NUMBER", "string")}</span>
                {this.currentPage()}
            </div>
        );
    }
}

export const MFD_SCREEN = () => {
    return(
        <body>
            <MFD_BODY side="left"/>
            <div className="bck-grey" id="mfd-splitter"></div>
            <MFD_BODY side="right"/>
        </body>
    )
}

ReactDOM.render(<MFD_SCREEN />, renderTarget)