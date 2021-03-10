import React, { Component } from 'react';
import Topheader from '../layout/mainlayout/TopHeader';
import Sidebar from '../layout/mainlayout/SideNav';
import Footer from '../layout/mainlayout/Footer';

class BaseLayout extends Component {
    
    render() {

        return (
            <div>
                <Topheader/>
                <Sidebar/>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );

    }

}

export default BaseLayout;