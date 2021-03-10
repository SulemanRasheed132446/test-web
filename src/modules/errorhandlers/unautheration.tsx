import React from 'react';
import Header from '../../layout/mainlayout/TopHeader';
import Sidebar from '../../layout/mainlayout/SideNav';
import history from '../../History';

class UnAuthorized extends React.Component {
  render() {
    const validToken = localStorage.getItem('token');
    if(!validToken) {
      history.push('/');
    }
    return (
      <div>
        <Header/>
        <Sidebar/>
        <div className="text-center h-100">
          <div className="h-100 m-5 t-10">
          <h1>Non Authorized.....</h1>
          </div>
              
        </div>
      </div>      
    );
  }

}

export default UnAuthorized;
