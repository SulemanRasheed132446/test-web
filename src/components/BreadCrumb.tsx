import React from 'react';
import { Link } from 'react-router-dom';

interface BreadCrumbProps {
    titleName: string[],
    homeName?:string[],
    url?:string[],
    baseName?:string[],
    baseURL?:string[],
    mainPageTitle?:string[]
  }

  export default class BreadCrumb extends React.Component<BreadCrumbProps> {

    render() {
        
        return (
            <div>
                <div className="page-bar">
                <div className="page-title-breadcrumb">
                    <div className="pull-left">
                        <div className="page-title">{this.props.titleName}</div>
                    </div>
                    <ol className="breadcrumb page-breadcrumb pull-right">
                        <li><i className="fa fa-home"></i>
                        &nbsp;<Link className="parent-item" to={`/${this.props.url}`}>
                            {this.props.homeName}
                            </Link>
                            &nbsp;<i className="fa fa-angle-right" style={{ display: this.props.mainPageTitle ? "inline-block" : "none" }}></i>
                        </li>
                        <li  style={{ display: this.props.baseName ? "inline-block" : "none" }}>
                            <Link className="parent-item" to={`/${this.props.baseURL}`}>{this.props.baseName}</Link>
                            &nbsp;<i className="fa fa-angle-right"></i>
						</li>
                        <li className="active">{this.props.mainPageTitle}</li>
                    </ol>
                </div>
            </div>
            </div>
        );
        
    }
}
