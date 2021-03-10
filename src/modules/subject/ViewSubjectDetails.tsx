import React from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../../components/BreadCrumb'
import { fetchSubjectsPost, fetchSubject, deletePost } from '../../store/subject/Actions'
import { addSubject } from '../../store/subject/Actions';
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom';
import { SubjectFieldsType, SubjectTypes, loadMoreType, ISearchBarState } from '../../store/subject/Types'
import { UserDetails } from '../../store/authentication/Types'
import history from '../../History';
import { UserRoles } from '../../services/Constants'
import InfiniteScroll from 'react-infinite-scroll-component';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import CommonLoader from '../../components/CommonLoader';
import Switch from '@material-ui/core/Switch';

export interface PostsListProps {
  loading: boolean
  subjectDetails: SubjectTypes;
  subjectDetailDelete: SubjectFieldsType;
  tokenValue: UserDetails;
  addSubjectDetails: any;
  deleteDetails: any;
  fetchSubjectsPost: (getData: loadMoreType) => any;
  fetchSubject: (id: number) => void;
  deletePost: (subjectDetailDelete: number) => void;
  addSubject: (subject: SubjectFieldsType) => void;
  page: number;
  per_page: number;
  totalPage: number;
  records: any;
  total: number;
}

class ViewSubjectDetails extends React.Component<PostsListProps, ISearchBarState> {
  hasMoreClass:any;
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
      deleteSubjectId: [],
      query: '',
      subjectsData: [],
      subjectsTotal: 1,
      hasMore: true,
      prev: 0,
      next: 0,
      acsOrder: true,
      descOrder: false,
      page: 1,
      search: '',
      getResponseData: [],
      SortOrderData: '',
      OrderNameData: ''
    };
  }

  componentDidMount(): void {
    this.getOnSubjectData();
    this.checkUserType();
    this.hasMoreClass = true;
  }
  public getOnSubjectData() {
    const postValue = {
      page_no: this.state.page,
      search: this.state.search,
      sort_by: this.state.SortOrderData,
      order_by: this.state.OrderNameData
    }
    this.props.fetchSubjectsPost(postValue);
    this.hasMoreClass = true;
  }

  checkStatusProcess() {
    const selectDataList = this.props.deleteDetails;
    if (selectDataList === true) {
      this.getOnSubjectData();
    }
  }
  public fetchMoreData = () => {
    if (this.state.hasMore === true) {
      if (Math.ceil(this.props.total / this.props.per_page) > this.props.page) {
        const postValue = {
          page_no: this.state.page + 1,
          search: this.state.search,
          sort_by: this.state.SortOrderData,
          order_by: this.state.OrderNameData
        }
        this.props.fetchSubjectsPost(postValue);
        this.setState({
          page: this.state.page + 1
        })
        this.hasMoreClass = true;
      }

      if (Math.ceil(this.props.total / this.props.per_page) === this.props.page) {
        this.setState({
          hasMore: false,
        })
        this.hasMoreClass = false;
      }
    }
  }
  public handleSubjectDelete = () => {
    this.props.deletePost(this.state.deleteSubjectId);
    this.setState({ showDelete: false, page: 1, hasMore: true });
    this.hasMoreClass = true;
  }

  public hideSubjectDelete = () => {
    this.setState({ showDelete: false })
  }
  public showSubjectDelete = (getData: any) => {
    this.setState({ showDelete: true, deleteSubjectId: getData });
  }

  // This is the functio use to filter grit data
  public showFilterData = (getdata: any) => {
    if (getdata.sort_by === 'desc') {
      this.setState({ acsOrder: false, sortOrder: getdata.sort_by, orderName: getdata.order_by, search: '' })
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
      this.hasMoreClass = true;
      this.props.fetchSubjectsPost(postValue);
    } else {
      this.setState({ acsOrder: true, sortOrder: getdata.sort_by, orderName: getdata.order_by, search: '' })
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
      this.hasMoreClass = true;
      this.props.fetchSubjectsPost(postValue);
    }
  }
  // This is the function used to check user type
  checkUserType() {
    const getSubjectToken = localStorage.getItem('usertype');
    if (getSubjectToken === UserRoles.acadamicAdmin) {
      this.setState({ acadamicAdmin: true })
    } else if (getSubjectToken === UserRoles.schoolAdmin) {
      this.setState({ schoolAdmin: true })
    } else if (getSubjectToken === UserRoles.teacher) {
      this.setState({ teacher: true })
    } else if (getSubjectToken === UserRoles.parent) {
      this.setState({ parent: true })
    }
  }
  private renderSubjectManageDelete() {
    const actionOption = this.state.deleteSubjectId;
    let titleSubjectMessage: any;
    const titleSubjectMsg = 'Please Confirm'
    if (actionOption.isActive === true) {
      titleSubjectMessage = 'Activate Subject';
    } else {
      titleSubjectMessage = 'Deactivate Subject';
    }
    return (
      <div>
        <Modal show={this.state.showDelete} handleClose={this.hideSubjectDelete}>
          <Modal.Header className="pb-0 pt-0">
            <Modal.Title>{titleSubjectMsg}</Modal.Title>
          </Modal.Header>

          <Modal.Body className="modelbottomcolor">
            <p>Are you sure want to {titleSubjectMessage} ?</p>
          </Modal.Body>

          <Modal.Footer className="modelboxbutton">
            <button className="btn btn-danger mr-1 ml-1 w-15" onClick={this.handleSubjectDelete}>Okay</button>
            <button className="btn btn-default mr-1 ml-1 w-15" onClick={this.hideSubjectDelete}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  private renderSubjectManageView(records: any) {
    const { loading } = this.props;
    const loadingTextCSS = { display: loading ? "block" : "none" };
    return (
      <div>
        <InfiniteScroll
          dataLength={records.length}
          next={this.fetchMoreData}
          hasMore={this.hasMoreClass}
          loader={<h4 style={loadingTextCSS}>Loading...</h4>}
        >
          <table className="table table-striped custom-table table-hover">
            <thead>
              <tr>
                <th>
                  {this.state.acsOrder ?
                    <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'name' })}
                      title="Ascending order" className="headerBold">Subject Name&nbsp;
                      <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : <button
                      onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'name' })}
                      title="Descending order" className="headerBold">
                      Subject Name <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>}
                </th>
                <th>{this.state.acsOrder ?
                  <button
                    onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'short_name' })}
                    title="Ascending order" className="headerBold">
                    Short Name <i className="fa fa-sort-amount-asc"
                      aria-hidden="true"></i></button> :
                  <button onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'short_name' })}
                    title="Descending order" className="headerBold">
                    Short Name <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>} </th>
                <th>{this.state.acsOrder ?
                  <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'category' })}
                    title="Ascending order" className="headerBold">
                    Category <i className="fa fa-sort-amount-asc"
                      aria-hidden="true"></i></button> :
                  <button onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'category' })}
                    title="Descending order" className="headerBold">
                    Category <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>} </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ?
                records.map((data: SubjectFieldsType) => (
                  <tr>
                    <td >{data['name'] || '-'}</td>
                    <td >{data['short_name'] || '-'}</td>
                    <td >{data['category'] || '-'}</td>
                    <td>                     
                      {data.is_active ?
                        <Link to={`/edit_subject/${data.id}`}>
                          <button className="btn btn-primary btn-xs"
                            title="Edit Subject"><i className="fa fa-pencil" aria-hidden="true" ></i></button></Link> :
                        <button className="btn btn-disable btn-xs"
                          title="Edit Subject"><i className="fa fa-pencil" aria-hidden="true" ></i></button>}
                      
                      {data.is_active ?
                        <Switch
                        checked={data.is_active}
                        onClick={() => this.showSubjectDelete({ id: String(data['id']), isActive: false })}
                        name="checkedUser"
                        inputProps={{ 'aria-label': 'success checkbox' }}
                        title="Deactivete Subject"
                      /> :
                      <Switch
                      checked={data.is_active}
                      onClick={() => this.showSubjectDelete({ id: String(data['id']), isActive: true })}
                      name="checkedUser"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      title="Active Subject"
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

  handleInputSubjectChange = (e: any) => {
    const { value } = e.target;
    const getSearchValue = value;
    if (getSearchValue) {
      const postSearchValue = {
        page_no: 1,
        search: getSearchValue
      }
      this.props.fetchSubjectsPost(postSearchValue);
      this.setState({
        hasMore: true,
        page: 1,
        search: getSearchValue
      })
      this.hasMoreClass = true;
    } else {
      const postSearchValue = {
        page_no: 1,
        search: ''
      }
      this.props.fetchSubjectsPost(postSearchValue);
      this.setState({
        hasMore: true,
        page: 1,
        search: ''
      })
      this.hasMoreClass = true;
    }

  }

  render() {
    const { loading } = this.props;
    const loadingTextCSS = { display: loading ? "block" : "none" };
    const getSubjectToken = localStorage.getItem('token');
    const subjectTotal = this.props.total;
    if (!getSubjectToken) {
      history.push("/");
    }
    this.hasMoreClass = true;
    this.checkStatusProcess()
    return (
      <div>
        {this.renderSubjectManageDelete()}
        <div className="page-wrapper">
          <div className="page-content-wrapper">
            <div className="page-content pt-3">
              <BreadCrumb titleName={['Subject']} homeName={['Home']} url={['dashboard']} mainPageTitle={['Subject']} />
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-topline-red">
                    <div className="mr-4 mt-2">
                      <h4 className="pull-right">Total: {subjectTotal}</h4>
                    </div>
                    <div className="card-head">
                      <header>
                        <Link to="/add_subject">
                          <button className="btn btn-pink">Add Subject</button>
                        </Link>
                      </header>
                      <div className="tools">
                          <input
                            placeholder="Search"
                            name="search"
                            className="form-control"
                            onChange={this.handleInputSubjectChange}
                          />
                      </div>
                    </div>
                    <div className="card-body no-padding height-9">
                      <div className="row">

                        <div className="table-responsive">
                          {this.renderSubjectManageView(this.props.records)}
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
    subjectDetails: state.subjects.items,
    loading: state.subjects.loading,
    total: state.subjects.total,
    per_page: state.subjects.per_page,
    records: state.subjects.records,
    page: state.subjects.page,
    totalPage: state.subjects.totalPage,
    deleteDetails: state.subjects.isAuthenticated
  };
};
export default connect(
  mapStateToProps, { fetchSubjectsPost, fetchSubject, deletePost, addSubject }
)(ViewSubjectDetails);