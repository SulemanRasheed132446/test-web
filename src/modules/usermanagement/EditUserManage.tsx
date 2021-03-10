import React from 'react';
import { connect } from 'react-redux';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index'
import BreadCrumb from '../../components/BreadCrumb';
import { RouteComponentProps } from 'react-router-dom';
import { EditUserPost, fetchCategoryPost, fetchUserPostId } from '../../store/usermanage/Actions';
import { userType, CategoryFieldsType, userManageTypes } from '../../store/usermanage/Type';
import { UserForm } from './UserForm';

export interface OwnUserManageFormProps extends RouteComponentProps<OwnPropsParams> {
    categoryDetails: CategoryFieldsType[],
    userIdList: userManageTypes;
    userData: userType;
    EditUserPost: (userManage: userType) => void;
    fetchCategoryPost: () => void;
    fetchUserPostId: (id: string) => void;
    loading: boolean;
};

class EditUserManage extends React.Component<OwnUserManageFormProps> {
    componentDidMount(): void {
        this.props.fetchCategoryPost();
        this.props.fetchUserPostId(String(this.props.match.params.id));
    }

    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        let firstname: any;
        let lastname: any;
        let emailId: any;
        let phoneno: any;
        let role: any;
        let schoolId: any;
        let userId: any;
        let ldapId: any;
        const getCategoryDetails: any = this.props.categoryDetails;
        const categoryUserData = getCategoryDetails.data;
        const getUserList: any = this.props.userIdList;
        if (getUserList) {
            const getUserData = getUserList.data;
            if (getUserData) {
                firstname = getUserData.firstname;
                lastname = getUserData.lastname;
                emailId = getUserData.email;
                phoneno = getUserData.phone_number;
                role = getUserData.role;
                schoolId = getUserData.school_id;
                userId = getUserData.id;
                ldapId = this.props.match.params.id;
            }
        }
        const initialEditUser: userType = {
            ldap_id: ldapId,
            id: userId,
            firstname: firstname,
            lastname: lastname,
            email_id: emailId,
            phone_number: phoneno,
            role: role,
            school_id: schoolId,
            timezone: 'Asia/Kolkata'
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
                                mainPageTitle={['Edit User']} />
                            {categoryUserData && firstname && schoolId ?
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-box">
                                            <div className="card-head">
                                                <header>Edit User</header>
                                            </div>
                                            <div className="card-body">
                                            <UserForm
                                            initialValues={initialEditUser}
                                            onSubmit={this.props.EditUserPost}
                                            categoryNameDetails={categoryUserData}/>                                             
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <SpinnerLoader />}
                        </div>
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        );
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = ({ userManage }: RootState, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        categoryDetails: userManage.category,
        loading: userManage.loading,
        userData: userManage.items[Number(ownProps.match.params.id)],
        userIdList: userManage.items
    };
};
export default connect(
    mapStateToProps, { fetchCategoryPost, EditUserPost, fetchUserPostId }
)(EditUserManage);