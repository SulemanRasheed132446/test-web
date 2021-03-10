import React from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../../components/BreadCrumb';
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom';
import { UserRoles } from '../../services/Constants';
import { fetchUserPost, deletePost } from '../../store/usermanage/Actions';
import { userType, userManageTypes, ISearchBarState } from '../../store/usermanage/Type';
import { LoadMoreType } from '../../components/type';
import InfiniteScroll from 'react-infinite-scroll-component';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import CommonLoader from '../../components/CommonLoader';
import history from '../../History';
import Switch from '@material-ui/core/Switch';

export interface PostsListProps {
  loading: boolean
  userDetails: userManageTypes;
  deleteDetails: any,
  fetchUserPost: (getData: LoadMoreType) => any;
  deletePost: (subjectDetailDelete: number) => void;
  page: number;
  per_page: number;
  totalPage: number;
  records: any;
  total: number;
}

class UserManagement extends React.Component<PostsListProps, ISearchBarState> {
  hasMoreAction:any;
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      showDelete: false,
      addShow: false,
      acadamicAdmin: false,
      schoolAdmin: false,
      bothData: false,
      teacher: false,
      parent: false,
      deleteUserManageId: [],
      userManageData: [],
      hasMore: true,
      prev: 0,
      next: 10,
      acsOrder: true,
      page: 1,
      search: '',
      SortOrderData: '',
      OrderNameData: '',
      role:'School Admin'
    };
  }

  componentDidMount(): void {
    const postValue = {
      page_no: 1,
      search: this.state.search,
      sort_by: this.state.SortOrderData,
      order_by: this.state.OrderNameData,
      role: this.state.role
    }
    this.props.fetchUserPost(postValue);
    this.hasMoreAction = true;
  }
  componentDidUpdate(prevProps:any, prevState:any) {  
    // This is the function used to update old parent details
   if (Math.ceil(this.props.total / this.props.per_page) > this.props.page) {
   }
 }

  checkStatusProcess() {
    const selectDataList = this.props.deleteDetails;
    if (selectDataList === true) {
      const postValue = {
        page_no: 1,
        search: this.state.search,
        sort_by: this.state.SortOrderData,
        order_by: this.state.OrderNameData,
        role: this.state.role
      }
      this.props.fetchUserPost(postValue);
      this.hasMoreAction = true;
    }
  }

  public handleUserDelete = () => {
    this.props.deletePost(this.state.deleteUserManageId);
    this.setState({ showDelete: false, page: 1 });
  }

  public hideUserDelete = () => {
    this.setState({ showDelete: false })
  }
  public showUserDelete = (getData: any) => {
    this.setState({ showDelete: true, deleteUserManageId: getData });
  }

  public showFilterData = (getdata: any) => {
    if (getdata.sort_by === 'desc') {
      this.setState({ acsOrder: false })
      const postValue = {
        page_no: 1,
        sort_by: getdata.sort_by,
        order_by: getdata.order_by,
        role: this.state.role
      }
      this.props.fetchUserPost(postValue);
      this.setState({
        SortOrderData: getdata.sort_by,
        OrderNameData: getdata.order_by,
        page: 1
      })
      this.hasMoreAction = true;
    } else {
      this.setState({ acsOrder: true })
      const postValue = {
        page_no: 1,
        sort_by: getdata.sort_by,
        order_by: getdata.order_by,
        role: this.state.role
      }
      this.props.fetchUserPost(postValue);
      this.setState({
        SortOrderData: getdata.sort_by,
        OrderNameData: getdata.order_by,
        page: 1
      })
      this.hasMoreAction = true;
    }
  }
  checkUserType() {
    const getUserToken = localStorage.getItem('usertype');
    if (getUserToken === UserRoles.acadamicAdmin) {
      this.setState({ acadamicAdmin: true })
    } else if (getUserToken === UserRoles.schoolAdmin) {
      this.setState({ schoolAdmin: true })
    } else if (getUserToken === UserRoles.teacher) {
      this.setState({ teacher: true })
    } else if (getUserToken === UserRoles.parent) {
      this.setState({ parent: true })
    }
  }

  private renderSubjectManageDelete() {
    const actionOption = this.state.deleteUserManageId;
    let titleUserMessage: any;
    const titleUserMsg = 'Please Confirm'
    if (actionOption.isActive === true) {
      titleUserMessage = 'Activate User';
    } else {
      titleUserMessage = 'Deactivete User';
    }
    return (
      <div>
        <Modal show={this.state.showDelete}>
          <Modal.Header className="pb-0 pt-0">
            <Modal.Title>{titleUserMsg}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="modelbottomcolor">
            <p>Are you sure want to {titleUserMessage} ?</p>
          </Modal.Body>

          <Modal.Footer className="modelboxbutton">
            <button className="btn btn-danger mr-1 ml-1 w-15" onClick={this.handleUserDelete}>Okay</button>
            <button className="btn btn-default mr-1 ml-1 w-15" onClick={this.hideUserDelete}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  public fetchMoreUserData = () => {
    if (this.hasMoreAction === true) {
      if (Math.ceil(this.props.total / this.props.per_page) > this.props.page) {
        const postValue = {
          page_no: this.state.page + 1,
          search: this.state.search,
          sort_by: this.state.SortOrderData,
          order_by: this.state.OrderNameData,
          role: this.state.role
        }
        this.props.fetchUserPost(postValue);
        this.setState({
          page: this.state.page + 1
        })
      }

      if (Math.ceil(this.props.total / this.props.per_page) === this.props.page) {
        this.hasMoreAction = false;
        this.setState({
          hasMore: false,
          page: this.state.page
        })
      }
    }
  }

  handleInputUserChange = (e: any) => {
    const { value } = e.target;
    const getSearchValue = value;
    if (getSearchValue) {
      const postSearchValue = {
        page_no: 1,
        search: getSearchValue
      }
      this.props.fetchUserPost(postSearchValue);
      this.setState({
        hasMore: true,
        page: 1,
        search: getSearchValue
      })
      this.hasMoreAction = true;
    } else {
      const postSearchValue = {
        page_no: 1,
        search: ''
      }
      this.props.fetchUserPost(postSearchValue);
      this.setState({
        hasMore: true,
        page: 1,
        search: ''
      })
      this.hasMoreAction = true;
    }
  }
  private renderUserManageView(getUserResponseData: any) {
    const { loading } = this.props;
    const loadingTextCSS = { display: loading ? "block" : "none" };
    const getUserToken = localStorage.getItem('token');
    if (!getUserToken) {
      history.push("/");
    }    
    return (
      <div>
        <InfiniteScroll
          dataLength={getUserResponseData.length}
          next={this.fetchMoreUserData}
          hasMore={this.hasMoreAction}
          loader={<h4 style={loadingTextCSS}>Loading...</h4>}
        >
          <table className="table table-striped custom-table table-hover">
            <thead>
              <tr>
                <th>
                  {this.state.acsOrder ?
                    <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'firstname' })}
                      title="Ascending order" className="headerBold">
                      User Name <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> :
                    <button onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'firstname' })}
                      title="Descending order" className="headerBold"> User Name <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
                    </button>}
                </th>
                <th>{this.state.acsOrder ?
                  <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'email_id' })}
                    title="Ascending order" className="headerBold">Email Id <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> :
                  <button onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'email_id' })} title="Descending order" className="headerBold">
                    Email Id <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>} </th>
                <th>{this.state.acsOrder ?
                  <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'phone_number' })}
                    title="Ascending order" className="headerBold">Phone Number <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> :
                  <button onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'phone_number' })} title="Descending order" className="headerBold">
                    Phone Number <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>} </th>
                <th>{this.state.acsOrder ?
                  <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'school_name' })}
                    title="Ascending order" className="headerBold">School Name <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> :
                  <button onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'school_name' })} title="Descending order" className="headerBold">
                    School Name <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>} </th>
                <th>{this.state.acsOrder ?
                  <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'role' })}
                    title="Ascending order" className="headerBold">Role <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> :
                  <button onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'role' })} title="Descending order" className="headerBold">
                    Role <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>} </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getUserResponseData.length > 0 ?
                getUserResponseData.map((data: userType, index: number) => (
                  <tr key={data['id']}>
                    <td >{data.firstname || '-'} {data.lastname}</td>
                    <td >{data['email_id'] || '-'}</td>
                    <td >{data['phone_number'] || '-'}</td>
                    <td >{data['school_name'] || '-'}</td>
                    <td >{data['role'] || '-'}</td>
                    <td>
                      {data.is_active ?
                        <Link to={"/edit_user/" + data.ldap_id}>
                          <button className="btn btn-primary btn-xs"
                            title="Edit User"><i className="fa fa-pencil" aria-hidden="true" ></i></button></Link> :
                        <button className="btn btn-disable btn-xs"
                          title="Edit User"><i className="fa fa-pencil" aria-hidden="true" ></i></button>}
                           {data.is_active ?
                        <Switch
                        checked={data.is_active}
                        onClick={() => this.showUserDelete({ ldapId: String(data['ldap_id']), isActive: false })}
                        name="checkedUser"
                        inputProps={{ 'aria-label': 'success checkbox' }}
                        title="Deactive User"
                      /> :
                      <Switch
                      checked={data.is_active}
                      onClick={() => this.showUserDelete({ ldapId: String(data['ldap_id']), isActive: true })}
                      name="checkedUser"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      title="Activate User"
                    />}
                    </td>
                  </tr>
                ))
                : <CommonLoader />}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>

    )
  }
  render() {
    const { loading } = this.props;
    const loadingTextCSS = { display: loading ? "block" : "none" };
    const userTotal = this.props.total;   
    this.checkStatusProcess()
    this.hasMoreAction = true;
    return (
      <div>
        {this.renderSubjectManageDelete()}
        <div className="page-wrapper">
          <div className="page-content-wrapper">
            <div className="page-content pt-3">
              <BreadCrumb
                titleName={['User']}
                homeName={['Home']}
                url={['dashboard']}
                mainPageTitle={['User']} />
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-topline-red">
                    <div className="mr-4 mt-2">
                      <h4 className="pull-right">Total: {userTotal}</h4>
                    </div>
                    <div className="card-head">
                      <header>
                        <Link to="/add_user">
                          <button className="btn btn-pink">Add User</button>
                        </Link>
                      </header>
                      <div className="tools">
                          <input
                            placeholder="Search"
                            name="search"
                            className="form-control"
                            onChange={this.handleInputUserChange}
                          />
                      </div>
                    </div>
                    <div className="card-body no-padding height-9">
                      <div className="row">
                        <div className="table-responsive">
                          {this.renderUserManageView(this.props.records)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div style={loadingTextCSS}><SpinnerLoader /></div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    loading: state.userManage.loading,
    userDetails: state.userManage.items,
    total: state.userManage.total,
    per_page: state.userManage.per_page,
    records: state.userManage.records,
    page: state.userManage.page,
    totalPage: state.userManage.totalPage,
    deleteDetails: state.userManage.isAuthenticated
  };
};
export default connect(
  mapStateToProps, { fetchUserPost, deletePost }
)(UserManagement);