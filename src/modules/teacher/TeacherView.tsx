import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb'
import Switch from '@material-ui/core/Switch';
import { fetchTeachersPost, deletePost } from '../../store/teacher/Actions';
import { LoadMoreType, CommonState } from '../../components/type';
import CommonLoader from '../../components/CommonLoader';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import Modal from 'react-bootstrap/Modal';
import { FormControlLabel } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';

export interface PostsTeacherProps {
    fetchTeachersPost: (getData: LoadMoreType) => any;
    deletePost: (studentDetailDelete: any) => void;
    loading: boolean
    deleteDetails: any;
    page: number;
    per_page: number;
    totalPage: number;
    records: any;
    total: number;
}
export class TeacherView extends React.Component<PostsTeacherProps, CommonState> {
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
          deleteTeacherId: [],
          TeacherData: [],
          hasMore: true,
          prev: 0,
          next: 10,
          acsOrder: true,
          page: 1,
          search: '',
          SortOrderData: '',
          OrderNameData: '',
          role:'Teacher'
        };
      }
      public handleDelete = () => {
        this.props.deletePost(this.state.deleteTeacherId);
        this.setState({ showDelete: false, hasMore: true,  page: 1 });
      }
      public hideTeacherDelete = () => {
        this.setState({ showDelete: false, hasMore: true });
      }
      public showTeacherDelete = (getData: any) => {
        this.setState({ showDelete: true, deleteTeacherId: getData });
      }
    
      private renderTeacherManageDelete() {
        const actionOption = this.state.deleteTeacherId;
        let titleTeacherMessage: any;
        const titleTeacherMsg = 'Please Confirm'
        if (actionOption.isActive === true) {
          titleTeacherMessage = 'Activate Teacher';
        } else {
          titleTeacherMessage = 'Deactivate Teacher';
        }
        return (
          <div>
            <Modal show={this.state.showDelete}>
              <Modal.Header className="pb-0 pt-0">
                <Modal.Title>{titleTeacherMsg}</Modal.Title>
              </Modal.Header>
    
              <Modal.Body>
                <p>Are you sure want to {titleTeacherMessage} ?</p>
              </Modal.Body>
    
              <Modal.Footer className="modelboxbutton">
                <button className="btn btn-danger mr-1 ml-1 w-15" onClick={this.handleDelete}>Okay</button>
                <button className="btn btn-default mr-1 ml-1 w-15" onClick={this.hideTeacherDelete}>Cancel</button>
              </Modal.Footer>
            </Modal>
          </div>
        )
      }
    componentDidMount(): void {
        const postValue = {
          page_no: 1,
          search: this.state.search,
          sort_by: this.state.SortOrderData,
          order_by: this.state.OrderNameData,
          role: this.state.role
        }
        this.props.fetchTeachersPost(postValue);
      }
      checkDeleteStatus(){
        const selectStudentDataList = this.props.deleteDetails;
        if (selectStudentDataList === true) {
          const getPostStudent = {
            page_no: 1,
            search: this.state.search,
            sort_by: this.state.SortOrderData,
            order_by: this.state.OrderNameData,
            role: this.state.role
          }
          this.props.fetchTeachersPost(getPostStudent);
        }
      }
      handleInputTeacherChange = (e: any) => {
        const { value } = e.target;
        const getSearchValue = value;
        if (getSearchValue) {
          const postSearchValue = { page_no: 1, search: getSearchValue, sort_by: this.state.SortOrderData,
            order_by: this.state.OrderNameData, role: this.state.role
          }
          this.props.fetchTeachersPost(postSearchValue);
          this.setState({
            hasMore: true, page: 1, search: getSearchValue
          })
        } else {
          const postSearchValue = {
            page_no: 1, 
            search: '',
            sort_by: this.state.SortOrderData,
            order_by: this.state.OrderNameData,
            role: this.state.role
          }      
          this.props.fetchTeachersPost(postSearchValue);
          this.setState({
            hasMore: true,
            page: 1,
            search: ''
          })
        }
      }
      public fetchMoreStudentData = () => {
        if (this.state.hasMore === true) {
          if (Math.ceil(this.props.total / this.props.per_page) > this.props.page) {
            const postValue = {
              page_no:  this.state.page + 1,
              academic_year:this.state.academic_year,
              class_id:this.state.class_id,
              sort_by: this.state.SortOrderData,
              order_by: this.state.OrderNameData,
              search:this.state.search,
              role: this.state.role
            }
            this.props.fetchTeachersPost(postValue);
            this.setState({
              page: this.state.page + 1
            })
          }
    
          if (Math.ceil(this.props.total / this.props.per_page) === this.props.page) {
            this.setState({
              hasMore: false,
            })
          }
        }
      }
      // This is the functio use to filter grit data
  public showFilterTeacher = (getdata: any) => {
    if (getdata.sort_by === 'desc') {
      this.setState({ 
        acsOrder: false, 
        search: '',
        SortOrderData: getdata.sort_by,
        OrderNameData: getdata.order_by,
        role: this.state.role
      })
      const postValue = {
        page_no: 1,
        search: this.state.search,
        sort_by: getdata.sort_by,
        order_by: getdata.order_by
      }
      this.setState({
        hasMore: true,
        SortOrderData: getdata.sort_by,
        OrderNameData: getdata.order_by,
        page: 1
      })
      this.props.fetchTeachersPost(postValue);
    } else {
      this.setState({ 
        acsOrder: true, 
        SortOrderData: getdata.sort_by, 
        OrderNameData: getdata.order_by, 
        search: '' })
      const postValue = {
        page_no: 1,
        search: this.state.search,
        sort_by: getdata.sort_by,
        order_by: getdata.order_by
      }
      this.setState({
        hasMore: true,
        SortOrderData: getdata.sort_by,
        OrderNameData: getdata.order_by,
        page: 1
      })
      this.props.fetchTeachersPost(postValue);
    }
  }
    render() {
        this.checkDeleteStatus();
        const getTeacherList = this.props.records;
        const { loading } = this.props;
        const loadingTeacherFull = { display: loading ? "block" : "none" };
        return (
            <div>
              {this.renderTeacherManageDelete()}
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['Teacher']}
                                homeName={['Home']}
                                url={['dashboard']}
                                mainPageTitle={['Teacher']} />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="">
                                      <div className="row">
                                      <div className="col-md-10"></div>
                                          <div className="col-md-2 col-sm-2 col-2 mb-2">
                                            <h4 className="pull-right">Total: {this.props.total}</h4>
                                          </div>
                                      </div>
                                        <div className="row mb-4">
                                            <div className="col-md-4">
                                                <header>
                                                    <Link to={'/teacher_add'}>
                                                        <button className="btn btn-pink">Add Teacher</button>
                                                    </Link>
                                                    {this.state.acsOrder ?
                                            <button onClick={() => this.showFilterTeacher({ sort_by: 'desc', order_by: 'firstname' })}
                                              title="Ascending order" className="btn btn-default ml-2">Teacher Name&nbsp;
                                              <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : <button
                                              onClick={() => this.showFilterTeacher({ sort_by: 'asc', order_by: 'firstname' })}
                                              title="Descending order" className="btn btn-default ml-2">
                                              Teacher Name <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>}
                                                </header>
                                            </div>
                                            <div className="col-md-6 text-right">                                            
                                            </div>
                                            <div className="col-md-2">
                                                <div className="tools">
                                                        <input
                                                            placeholder="Search"
                                                            name="teacher"
                                                            className="form-control"
                                                            onChange={this.handleInputTeacherChange}
                                                        />
                                                </div>                                           
                                            </div>
                                        </div>
                                        <InfiniteScroll
                                          dataLength={this.props.records.length}
                                          next={this.fetchMoreStudentData}
                                          hasMore={this.state.hasMore}
                                          loader={<h4 style={loadingTeacherFull}>Loading...</h4>}
                                        >
                                        {getTeacherList.length > 0 ?
                                        <div className="row mt-5 w-100">
                                        { getTeacherList.map((items:any, index:any) => (
                                                <div className="col-md-3">
                                                    <div className="card">
                                                        <div className="m-b-20">
                                                            <div className="doctor-profile">
                                                                <div id="studentList" className='profile-header bg-b-purple'>
                                                                <div className="pull-right">  
                                                                </div>
                                                                </div>
                                                                <img src="assets/img/user/teacher-profile.jpg" className="user-img mb-2" alt="" />
                                                                <div>
                                                                <div className="user-name">{items.firstname} {items.lastname}</div>
                                                                    <p>
                                                                        <i className="fa fa-phone"></i> &nbsp; 
                                                                         {items.phone_number}
                                                                    </p>
                                                                    <p>
                                                                    <i className="fa fa-envelope-o" aria-hidden="true"></i> &nbsp;
                                                                        {items.email_id}
                                                                    </p>
                                                                </div>
                                                                <div className="profile-userbuttons">
                                                                  {items.is_active ?
                                                                <Link to={`/teacher_edit/${items.ldap_id}`} className="btn btn-circle btn-default btn-sm" title="Edit Teacher"><i
                                                                className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>
                                                              :<Link to={'#'} className="btn btn-circle btn-disable btn-sm" title="Edit Teacher"><i
                                                              className="fa fa-pencil-square-o" aria-hidden="true"></i></Link>}
                                                                <Link to={`/teacher/${items.ldap_id}`}
                                                                className="btn btn-circle btn-info btn-sm" title="View Teacher"
                                                                ><i className="fa fa-eye"
                                                                    aria-hidden="true"></i></Link>
                                                            </div>
                                                            <div className="pull-right">                  
                                                                    {items.is_active ? <FormControlLabel
                                                                      value="start"
                                                                      control={<Switch
                                                                        checked={items.is_active}
                                                                        onClick={() => this.showTeacherDelete({ ldapId: String(items.ldap_id), isActive: false })}
                                                                        name="checkedA"
                                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                        title="Deactivate Teacher" 
                                                                      />}
                                                                      className="mr-2 mt-2"
                                                                      label="Active"
                                                                      labelPlacement="start"
                                                                    /> : 
                                                                    <FormControlLabel
                                                                      value="end"
                                                                      control={<Switch
                                                                        checked={items.is_active}
                                                                        onClick={() => this.showTeacherDelete({ ldapId: String(items.ldap_id), isActive: true })}
                                                                        name="checkedA"
                                                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                                        title="Activate Teacher" 
                                                                      />}
                                                                      className="mr-3 mt-2"
                                                                      label="Inactive"
                                                                      labelPlacement="end"
                                                                    />
                                                                    }
                                                            </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> 
                                        ))}  
                                        </div>
                                        : <CommonLoader/>}
                                  </InfiniteScroll>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={loadingTeacherFull}><SpinnerLoader /></div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.teacher.loading,
        userDetails: state.teacher.items,
        total: state.teacher.total,
        per_page: state.teacher.per_page,
        records: state.teacher.records,
        page: state.teacher.page,
        totalPage: state.teacher.totalPage,
        deleteDetails: state.teacher.isAuthenticated
      };
}
export default connect(mapStateToProps, { fetchTeachersPost, deletePost })(TeacherView)
