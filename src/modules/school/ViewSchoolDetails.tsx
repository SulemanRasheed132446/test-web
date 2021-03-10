import React from 'react';
import { connect } from 'react-redux';
import { fetchSchoolsPost, fetchSchool, deletePost, addSchool } from '../../store/school/Actions'
import Modal from 'react-bootstrap/Modal'
import { SchoolDetailsType, SchoolTypes } from '../../store/school/Types'
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb'
import history from '../../History';
import { UserRoles } from '../../services/Constants'
import { LoadMoreType } from '../../components/type';
import InfiniteScroll from 'react-infinite-scroll-component';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import CommonLoader from '../../components/CommonLoader';
import Switch from '@material-ui/core/Switch';

export interface PostsListProps {
  loading: boolean
  schoolDetails: SchoolTypes;
  schoolDetailDelete: SchoolDetailsType;
  deleteDetails: any;
  fetchSchoolsPost: (loadMoreType: LoadMoreType) => any;
  deletePost: (schoolDetailDelete: any) => void;
  addSchool: (school: SchoolDetailsType) => void;
  page: number;
  per_page: number;
  totalPage: number;
  records: any;
  total: number;
}

interface ISearchBarState {
  show: boolean,
  showDelete: boolean,
  addShow: boolean,
  acadamicAdmin: boolean,
  schoolAdmin: boolean,
  bothData: boolean,
  teacher: boolean,
  parent: boolean,
  deleteSchoolId: any,
  query: string,
  hasMore: boolean,
  schoolData: any,
  prev: number,
  next: number,
  acsOrder: boolean,
  descOrder: boolean,
  subjectsTotal: number,
  page: number,
  search: string,
  OrderNameData: string,
  SortOrderData: string
}

class ViewSchoolDetails extends React.Component<PostsListProps, ISearchBarState> {
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
      deleteSchoolId: [],
      query: '',
      schoolData: [],
      subjectsTotal: 1,
      hasMore: true,
      prev: 0,
      next: 0,
      acsOrder: true,
      descOrder: false,
      page: 1,
      search: '',
      SortOrderData: '',
      OrderNameData: ''
    };

  }
  componentDidMount(): void {
    this.getDataValue();
    this.checkUserType();
  }
  getDataValue() {
    const postValue = {
      page_no: 1,
      search: this.state.search,
      sort_by: this.state.SortOrderData,
      order_by: this.state.OrderNameData
    }
    this.props.fetchSchoolsPost(postValue);
  }
  checkUserType() {
    const getSchoolToken = localStorage.getItem('usertype');
    if (getSchoolToken === UserRoles.acadamicAdmin) {
      this.setState({ acadamicAdmin: true })
    } else if (getSchoolToken === UserRoles.schoolAdmin) {
      this.setState({ schoolAdmin: true })
    } else if (getSchoolToken === UserRoles.teacher) {
      this.setState({ teacher: true })
    } else if (getSchoolToken === UserRoles.parent) {
      this.setState({ parent: true })
    }
  }

  checkStatusProcess() {
    const selectDataList = this.props.deleteDetails;
    if (selectDataList === true) {
      this.getDataValue();
    }
  }

  public handleDelete = () => {
    this.props.deletePost(this.state.deleteSchoolId);
    this.setState({ showDelete: false, page: 1, hasMore: true });
  }
  public hideSchoolDelete = () => {
    this.setState({ showDelete: false });
  }
  public showSchoolDelete = (getData: any) => {
    this.setState({ showDelete: true, deleteSchoolId: getData });
  }

  private renderSchoolManageDelete() {
    const actionOption = this.state.deleteSchoolId;
    let titleSchoolMessage: any;
    const titleSchoolMsg = 'Please Confirm'
    if (actionOption.isActive === true) {
      titleSchoolMessage = 'Activate School';
    } else {
      titleSchoolMessage = 'Deactivate School';
    }
    return (
      <div>
        <Modal show={this.state.showDelete}>
          <Modal.Header className="pb-0 pt-0">
            <Modal.Title>{titleSchoolMsg}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure want to {titleSchoolMessage} ?</p>
          </Modal.Body>

          <Modal.Footer className="modelboxbutton">
            <button className="btn btn-danger mr-1 ml-1 w-15" onClick={this.handleDelete}>Okay</button>
            <button className="btn btn-default mr-1 ml-1 w-15" onClick={this.hideSchoolDelete}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
  public fetchMoreSchoolData = () => {
    if (this.state.hasMore === true) {
      if (Math.ceil(this.props.total / this.props.per_page) > this.props.page) {
        const postValue = {
          page_no: this.state.page + 1,
          search: this.state.search,
          sort_by: this.state.SortOrderData,
          order_by: this.state.OrderNameData
        }
        this.props.fetchSchoolsPost(postValue);
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

  private renderSchoolManageView(getSchoolData: any) {
    const { loading } = this.props;
    const loadingTextCSS = { display: loading ? "block" : "none" };
    return (
      <div>
        <InfiniteScroll
          dataLength={getSchoolData.length}
          next={this.fetchMoreSchoolData}
          hasMore={this.state.hasMore}
          loader={<h4 style={loadingTextCSS}>Loading...</h4>}
        >
          <table className="table table-striped custom-table table-hover">
            <thead>
              <tr>
                <th>
                {this.state.acsOrder ? 
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'school_name' })} 
                title="Ascending order" className="headerBold">
                School Name  <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                </button> : <button 
                onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'school_name' })} 
                title="Descending order" className="headerBold">
                School Name  <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
                </button>}
                </th>
                <th>{this.state.acsOrder ? 
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'category' })} 
                title="Ascending order" className="headerBold">
                Category <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                </button> : <button onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'category' })} 
                title="Descending order" className="headerBold">
                Category <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>} 
                </th>
                <th>{this.state.acsOrder ? 
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'start_time' })} 
                title="Ascending order" className="headerBold">
                Start Time <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                </button> : <button onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'start_time' })} 
                title="Descending order" className="headerBold">
                Start Time <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>} 
                </th>
                <th>{this.state.acsOrder ? 
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'end_time' })} 
                title="Ascending order" className="headerBold">
                End Time <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : 
                <button onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'end_time' })} 
                title="Descending order" className="headerBold">
                End Time <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>} 
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getSchoolData.length > 0 ?
                getSchoolData.map((data: SchoolDetailsType, index: number) => (
                  <tr key={data['id']}>
                    <td >{data['school_name'] || '-'}</td>
                    <td >{data['category'] || '-'}</td>
                    <td >{data['start_time'] || '-'}</td>
                    <td >{data['end_time'] || '-'}</td>
                    <td>                      
                        {data.is_active ?
                        <Link to={`/edit_school/${data.id}`}>
                          <button className="btn btn-primary btn-xs"
                            title="Edit School"><i className="fa fa-pencil" aria-hidden="true" ></i></button></Link>   : 
                            <button className="btn btn-disable btn-xs"
                            title="Edit School"><i className="fa fa-pencil" aria-hidden="true" ></i></button>}
                                          
                      {data.is_active ?
                        <Switch
                        checked={data.is_active}
                        onClick={() => this.showSchoolDelete({ id: String(data['id']), isActive: false })}
                        name="checkedSchool"
                        inputProps={{ 'aria-label': 'success checkbox' }}
                        title='Deactivete School'
                      /> :
                      <Switch
                      checked={data.is_active}
                      onClick={() => this.showSchoolDelete({ id: String(data['id']), isActive: true })}
                      name="checkedSchool"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      title='Activate School'
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
  public showFilterData = (getdata: any) => {
    if (getdata.sort_by === 'desc') {
      this.setState({ acsOrder: false })
      const postValue = {
        page_no: 1,
        sort_by: getdata.sort_by,
        order_by: getdata.order_by
      }
      this.props.fetchSchoolsPost(postValue);
      this.setState({
        hasMore: true,
        SortOrderData: getdata.sort_by,
        OrderNameData: getdata.order_by,
        page: 1
      })
    } else {
      this.setState({ acsOrder: true })
      const postValue = {
        page_no: 1,
        sort_by: getdata.sort_by,
        order_by: getdata.order_by
      }
      this.props.fetchSchoolsPost(postValue);
      this.setState({
        hasMore: true,
        SortOrderData: getdata.sort_by,
        OrderNameData: getdata.order_by,
        page: 1
      })
    }
  }

  handleInputSchoolChange = (e: any) => {
    const { value } = e.target;
    const getSearchValue = value;
    if (getSearchValue) {
      const postSearchValue = {
        page_no: 1,
        search: getSearchValue
      }
      this.props.fetchSchoolsPost(postSearchValue);
      this.setState({
        hasMore: true,
        page: 1,
        search: getSearchValue
      })
    } else {
      const postSearchValue = {
        page_no: 1,
        search: ''
      }
      this.props.fetchSchoolsPost(postSearchValue);
      this.setState({
        hasMore: true,
        page: 1,
        search: ''
      })
    }
  }
  render() {
    const { loading } = this.props;
    const loadingTextCSS = { display: loading ? "block" : "none" };
    const getSchoolToken = localStorage.getItem('token');
    const schoolTotel = this.props.total;
    if (!getSchoolToken) {
      history.push("/");
    }
    this.checkStatusProcess()
    return (
      <div>
        {this.renderSchoolManageDelete()}
        <div className="page-wrapper">
          <div className="page-content-wrapper">
            <div className="page-content pt-3">
              <BreadCrumb 
              titleName={['School']} 
              homeName={['Home']} 
              url={['dashboard']} 
              mainPageTitle={['School']} />
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-topline-red">
                      <div className="mr-4 mt-2">
                        <h4 className="pull-right">Total: {schoolTotel}</h4>
                      </div>
                      <div className="card-head" style={{ display: this.state.acadamicAdmin ? "block" : "none" }}>
                        <header>
                          <Link to="/add_school">
                            <button className="btn btn-pink">Add School</button>
                          </Link>
                        </header>
                        <div className="tools">
                            <input
                              placeholder="Search"
                              name="search"
                              className="form-control"
                              onChange={this.handleInputSchoolChange}
                            />
                        </div>
                      </div>
                      <div className="card-body no-padding height-9">
                        <div className="row">
                          <div className="table-responsive">
                            {this.renderSchoolManageView(this.props.records)}
                          </div>
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
    schoolDetails: state.schools.items,
    loading: state.schools.loading,
    total: state.schools.total,
    per_page: state.schools.per_page,
    records: state.schools.records,
    page: state.schools.page,
    totalPage: state.schools.totalPage,
    deleteDetails: state.schools.isAuthenticated
  };
};
export default connect(
  mapStateToProps, { fetchSchoolsPost, fetchSchool, deletePost, addSchool }
)(ViewSchoolDetails);