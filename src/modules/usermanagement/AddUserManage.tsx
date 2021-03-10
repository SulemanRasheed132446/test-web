import React from 'react';
import { connect } from 'react-redux';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index'
import BreadCrumb from '../../components/BreadCrumb'
import history from '../../History';
import { userType, CategoryFieldsType } from '../../store/usermanage/Type';
import {AddUserPost, fetchCategoryPost} from '../../store/usermanage/Actions';
import { UserForm } from './UserForm';

const initialUserValues: userType = {
    firstname: '',
    lastname: '',
    email_id: '',
    phone_number: '',
    role: '',
    school_id: '',
    timezone: 'Asia/Kolkata'
}
export type OwnUserManageFormProps = {
    categoryDetails: CategoryFieldsType[],
    AddUserPost: (userManage: userType) => void;
    fetchCategoryPost: () => void;
    loading: boolean;
};
class AddUserManage extends React.Component<OwnUserManageFormProps>  {
    componentDidMount(): void {
        this.props.fetchCategoryPost();
    }
    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        const getToken = localStorage.getItem('token');
        if(!getToken){
            history.push("/");
        }
        const getCategoryDetails:any = this.props.categoryDetails;
        let categoryUserAdd:any;
        if(getCategoryDetails){
          categoryUserAdd = getCategoryDetails.data;
        }
        
        return (
            <div>
                <div className="page-wrapper">
            <div className="page-content-wrapper">
                <div className="page-content pt-3">
                <BreadCrumb 
                titleName={['User']} 
                homeName={['Home']} 
                url={['dashboard']} 
                baseName={['User']} 
                baseURL={['user']} 
                mainPageTitle={['Add User']}/>
                {categoryUserAdd ?
                <div className="row">
                    <div className="col-md-12">
                    <div className="card-box">
                <div className="card-head">
                    <header>Add User</header>
                </div>               
                  <div className="card-body">
                      <UserForm
                       initialValues={initialUserValues}
                       onSubmit={this.props.AddUserPost}
                       categoryNameDetails={categoryUserAdd}/>
                </div>
                </div>
                </div>
                </div>
                : <SpinnerLoader/>} 
                </div>
                </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader/></div>
            </div>
        );
    }
}
const mapStateToProps = ({userManage}: RootState) => {
    return {
      categoryDetails: userManage.category,
      loading:userManage.loading,
    };
  };
export default connect(
    mapStateToProps,{ AddUserPost, fetchCategoryPost }
)(AddUserManage);