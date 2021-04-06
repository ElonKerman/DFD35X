import React from 'react'
import './FMS_init.scss'
import {Input} from '../../../Components/input'
import { Button } from '../../../Components/button';


type FMS_State = {
    flightNum: string,
    from: string,
    to: string
    altn: string,
    cpnyRte: string,
    altnRte: string
}
export class FMS_Init extends React.Component<{}, FMS_State>
{

    execute()
    {

    }
    render()
    {
        var row1Y: number = 1.5
        var row2Y: number = 10
        return(
            <div className="fms-page">
                <h2 style={{top: row1Y +"%"}}>FLT NBR</h2>
                <Input onChange={(value) => this.setState({flightNum: value})} characterLimit={10} className="large-input" posX={18.5} posY={row1Y} type="text"></Input>
                <Button className="large-button" posX={50} posY={row1Y}>ACFT STATUS</Button>

                <Button disabled className="medium-button" posX={77} posY={row1Y - 1}>CPNY F-PLN REQUEST</Button>


                <h2 style={{top: row2Y + "%"}}>FROM</h2>
                <Input onChange={(value) => this.setState({from: value})} characterLimit={4} className="small-input" posX={18.5} posY={row2Y} type="text"></Input>

                <h2 style={{top: row2Y + "%", right: "63%"}}>TO</h2>
                <Input onChange={(value) => this.setState({to: value})} characterLimit={4} className="small-input" posX={38} posY={row2Y} type="text"></Input>

                <h2 style={{top: row2Y + "%", right: "39%"}}>ALTN</h2>
                <Input disabled onChange={(value) => this.setState({altnRte: value})} characterLimit={4} className="small-input" posX={62} posY={row2Y} type="text"></Input>

                <h2 style={{top:"20.5%"}}>CPNY RTE</h2>
                <Input onChange={(value) => this.setState({cpnyRte: value})} characterLimit={10} className="large-input" posX={18.5} posY={20.5} type="text"></Input>
                <Button disabled className="large-button" posX={50} posY={20.5}>RTE SEL</Button>

                <h2 style={{top:"28%"}}>ALTN RTE</h2>
                <Input disabled onChange={(value) => this.setState({cpnyRte: value})} characterLimit={10} className="large-input" posX={18.5} posY={28} type="text"></Input>
                <Button disabled className="large-button" posX={50} posY={28}>ALTN RTE SEL</Button>

            </div>
        );
    }
}