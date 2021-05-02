import {React, useContext} from 'react';
import './main-page-style.scss';
import './main-page-buttons-style.scss';
import oisContext from '../../oisContext';

const OIS_MAIN_PAGE = (props) => {
    let context = useContext(oisContext);
    return(
        <div>
            <div className="main_page">
                <div>
                    <button onClick={() => context.setOisPage(1)} className="btn company-com">COMPANY COM</button>
                    <button className="btn efb">EFB</button>
                    <button className="btn clear">CLEAR</button>
                    <button className="btn msg">30 MSG</button>
                    <button className="btn to_perf">T.O PERF</button>
                    <button className="btn flt_ops_sts">FLT OPS STS</button>
                    <button className="btn ldg_perf">LDG PERF</button>
                    <button className="btn in-flt_perf">IN-FLT PERF</button>
                    <button className="btn loadsheet">LOADHSEET</button>
                    <button className="btn ops_library">OPS LIBRARY</button>
                    <button className="btn enroute">ENROUTE</button>
                    <button className="btn terml_chart">TERML CHART</button>
                    <button className="btn load_box">LOAD BOX</button>
                    <button className="btn export_box">EXPORT BOX</button>
                </div>
                <div>
                    <label className="lbl ois_menu">OIS MENU</label>
                    <label className="lbl avncs">AVNCS</label>
                    <label className="lbl company_com"></label>
                    <label className="lbl avncs-company_com"></label>
                    <label className="lbl btns"></label>
                    <label className="lbl efb-btns"></label>
                    <label className="lbl clr_msg"></label>
                    <label className="lbl clr_msg_btm"></label>
                </div>
            </div>
        </div>
    );
};

export default OIS_MAIN_PAGE;