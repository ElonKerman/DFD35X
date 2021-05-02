import {React, useState} from 'react';
import ReactDOM from 'react-dom';

import OIS_MAIN_PAGE from './Pages/Main Page/main-page'
import OIS_TEST from './test'
import oisContext from "./oisContext"
// import './idex-style.scss';
import { render } from '../Hooks/index'


function OIS_DISPLAY() {
    let [oisPage, setOisPage] = useState(0)
    
    let context = {
        oisPage: oisPage,
        setOisPage: setOisPage
    }
    
    switch (oisPage) {
        case 0 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_MAIN_PAGE />
               </oisContext.Provider>
            ) 
        }
        case 1 : {
            return(
               <oisContext.Provider value={context}>
                    <OIS_TEST />
               </oisContext.Provider>
            ) 
        }
        default: {
            return(
                <div>
                    <h1>INOP</h1>
                </div>
            )
        }
    }
        
}

render(<OIS_DISPLAY />);