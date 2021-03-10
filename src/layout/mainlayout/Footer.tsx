import React, { Component } from 'react';

export default class Footer extends Component {

    render() {
        
        return (
            <div>
                {/* start footer */}
                <div className="page-footer">
                    <div className="page-footer-inner"> 2021 &copy; DAPS</div>
                    <div className="scroll-to-top">
                        <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    </div>
                </div>
                {/* end footer */}
            </div>
        );

    }

}