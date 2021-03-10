import React from 'react';
import BreadCrumb from '../../components/BreadCrumb'

class DashboardIndexPage extends React.Component{
    render(){
        return(
            <div>
                <div className="page-wrapper">
                <div className="page-content-wrapper">
                <BreadCrumb titleName={['Dashboard']} homeName={['Dashboard']} url={['dashboard']}/>
                <div className="text-center mt-5">
                    <img src="assets/img/under_constraction1.png" alt="Under Construction" className="underwork mt-5 mb-3"/>
                    <h1>Under Construction</h1>
                </div>
                </div>
                </div>
            </div>
    )}
}

export default DashboardIndexPage
