import ReactDOM from 'react-dom'
import {useState} from 'react'
import './ecam-main-style.scss'
import { render } from '../Hooks/index'
const ECAM_SCREEN = () => {
    return(
        <div>
            <h1 id="text">ECAM</h1>
        </div>
    )
}

render(<ECAM_SCREEN />)