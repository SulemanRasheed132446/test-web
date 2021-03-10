import React from 'react';
import { connect } from 'react-redux';
import { ClassesType, ClassesTypes, ISearchBarState } from '../../store/classes/Type';
import { deletePost, fetchClassesPost, fetchClassesPagination } from '../../store/classes/Actions';
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb'
import history from '../../History';
import { UserRoles } from '../../services/Constants'
import Modal from 'react-bootstrap/Modal'
import { LoadMoreType } from '../../components/type';
import InfiniteScroll from 'react-infinite-scroll-component';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import CommonLoader from '../../components/CommonLoader';
import Switch from '@material-ui/core/Switch';

export interface PostsListProps {
  loading: boolean;
  getpreDatas: any;
  classesDetails: ClassesTypes;
  classesAllItems: any;
  classesDelete: ClassesType;
  deleteDetails: any;
  deletePost: (classesDelete: any) => void;
  fetchClassesPost: (loadMoreType: LoadMoreType) => any;
  fetchClassesPagination: (loadMoreType: LoadMoreType) => any;
  page: number;
  per_page: number;
  totalPage: number;
  records: any;
  total: number;
}

class ViewClassesDetails extends React.Component<PostsListProps, ISearchBarState> {
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
      deleteClassesId: [],
      query: '',
      classData: [],
      subjectsTotal: 1,
      hasMore: true,
      prev: 0,
      next: 10,
      acsOrder: true,
      descOrder: false,
      page: 1,
      per_page: 10,
      records: [],
      total: 0,
      totalPage: 0,
      search: '',
      SortOrderData:'',
      OrderNameData:''
    };
  }

  componentDidMount(): void {
    const postValue = {
      page_no: 1,
      search: this.state.search,
      sort_by: this.state.SortOrderData,
      order_by: this.state.OrderNameData
    }
    this.props.fetchClassesPagination(postValue);
      this.checkUserType();     
  }

checkUserType() {
    const getClassToken = localStorage.getItem('usertype');
    if (getClassToken === UserRoles.acadamicAdmin) {
      this.setState({ acadamicAdmin: true })
    } else if (getClassToken === UserRoles.schoolAdmin) {
      this.setState({ schoolAdmin: true })
    } else if (getClassToken === UserRoles.teacher) {
      this.setState({ teacher: true })
    } else if (getClassToken === UserRoles.parent) {
      this.setState({ parent: true })
    }
  }

  checkStatusProcess(){
    const selectDataList = this.props.deleteDetails;
    if(selectDataList === true){   
      const postValue = {
        page_no: 1,
        search: this.state.search,
        sort_by: this.state.SortOrderData,
        order_by: this.state.OrderNameData
      }    
      this.props.fetchClassesPagination(postValue);     
    }
   }

  public handleDelete = () => {
    this.props.deletePost(this.state.deleteClassesId);
    this.setState({ showDelete: false, page: 1, hasMore: true });
  }
  public hideClassDelete = () => {
    this.setState({ showDelete: false });
  }
  public showClassDelete = (getData: any) => {
    this.setState({ showDelete: true, deleteClassesId: getData });
  }

  public showFilterData = (getdata: any) => {
    if (getdata.sort_by === 'desc') {
      this.setState({ acsOrder: false })
      const postValue = {
        page_no: 1,
        sort_by: getdata.sort_by,
        order_by: getdata.order_by
      }
      this.setState({
        hasMore: true,
        SortOrderData: getdata.sort_by,
        OrderNameData: getdata.order_by,
        page: 1
      })
      this.props.fetchClassesPagination(postValue);
    } else {
      this.setState({ acsOrder: true })
      const postValue = {
        page_no: 1,
        sort_by: getdata.sort_by,
        order_by: getdata.order_by,
        page: 1
      }
      this.setState({
        hasMore: true,
        SortOrderData: getdata.sort_by,
        OrderNameData: getdata.order_by,
        page: 1
      })
      this.props.fetchClassesPagination(postValue);
    }
  }

  private renderSchoolManageDelete() {
    const actionOption = this.state.deleteClassesId;
    let titleClassMessage: any;
    const titleClassMsg = 'Please Confirm'
    if (actionOption.isActive === true) {
      titleClassMessage = 'Activate Class';
    } else {
      titleClassMessage = 'Deactivate Class';
    }
    return (
      <div>
        <Modal show={this.state.showDelete}>
          <Modal.Header className="pb-0 pt-0">
            <Modal.Title>{titleClassMsg}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure want to {titleClassMessage} ?</p>
          </Modal.Body>

          <Modal.Footer className="modelboxbutton">
            <button className="btn btn-danger mr-1 ml-1 w-15" onClick={this.handleDelete}>Okay</button>
            <button className="btn btn-default mr-1 ml-1 w-15" onClick={this.hideClassDelete}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  public fetchMoreClassData = () => {
    if (this.state.hasMore === true) {
     if (Math.ceil(this.props.total / this.props.per_page) > this.props.page) {   
        const postValue = {
          page_no: this.state.page + 1,
          search: this.state.search,
          sort_by: this.state.SortOrderData,
          order_by: this.state.OrderNameData
        }              
        this.props.fetchClassesPagination(postValue);
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

  private renderClassesManageView(records: any) {
    const { loading } = this.props;
    const loadingTextCSS = { display: loading ? "block" : "none" }; 
    return (
      <div>
        <InfiniteScroll
          dataLength={records.length}
          next={this.fetchMoreClassData}
          hasMore={this.state.hasMore}
          loader={<h4 style={loadingTextCSS}>Loading...</h4>}
        >
          <table className="table table-striped custom-table table-hover">
            <thead>
              <tr>
                <th>
                {this.state.acsOrder ? 
                <button 
                onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'grade' })} 
                title="Ascending order" 
                className="headerBold">
                Class&nbsp;
                 <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                </button> : <button 
                onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'grade' })} 
                title="Descending order" 
                className="headerBold">
                Class&nbsp; 
                 <i className="fa fa-sort-amount-desc" aria-hidden="true"></i>
                </button>}
                </th>
                <th>
                  {this.state.acsOrder ? 
                  <button 
                  onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'standard' })} 
                  title="Ascending order" className="headerBold">
                  Section&nbsp;
                  <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                  </button> : <button 
                  onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'standard' })} 
                  title="Descending order" className="headerBold">
                  Section&nbsp;
                  <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>} 
                  </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ?
                records.map((data: ClassesType, index: number) => (
                  <tr key={index}>
                    <td >{data['grade'] || '-'}</td>
                    <td >{data['standard'] || '-'}</td>
                    <td>                   
                    {data.is_active ?
                        <Link to={"/edit_class/" + data.id}>
                          <button className="btn btn-primary btn-xs"
                            title="Edit Class"><i className="fa fa-pencil" aria-hidden="true" ></i></button></Link>   : 
                            <button className="btn btn-disable btn-xs"
                            title="Edit Class"><i className="fa fa-pencil" aria-hidden="true" ></i></button>}
                      {data.is_active ?
                        <Switch
                        checked={data.is_active}
                        onClick={() => this.showClassDelete({ id: String(data['id']), isActive: false })}
                        name="checkedSchool"
                        inputProps={{ 'aria-label': 'sucess checkbox' }}
                        title="Deactivate Class"
                      /> :
                      <Switch
                      checked={data.is_active}
                      onClick={() => this.showClassDelete({ id: String(data['id']), isActive: true })}
                      name="checkedSchool"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                      title="Activate Class"
                    />}
                    </td>
                  </tr>
                ))
                : <CommonLoader/>}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    )
  }

  handleInputClassChange = (e: any) => {
    const { value } = e.target;
    const getSearchValue = value;
    if (getSearchValue) {
      const postSearchValue = {
        page_no: 1,
        search: getSearchValue
      }
      this.props.fetchClassesPagination(postSearchValue);
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
      this.props.fetchClassesPagination(postSearchValue);
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
    const getClassToken = localStorage.getItem('token');
    const classTotal:any = this.props.total
    if (!getClassToken) {
      history.push("/");
    }
    this.checkStatusProcess()
    return (
      <div>
       
        {this.renderSchoolManageDelete()}
        <div className="page-wrapper">
          <div className="page-content-wrapper">
            <div className="page-content pt-3">
              <BreadCrumb titleName={['Class']} homeName={['Home']} url={['dashboard']} mainPageTitle={['Class']} />
              <div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-topline-red">
                    <div className="mr-4 mt-2">
                      <h4 className="pull-right">Total: {classTotal}</h4>
                    </div>
                      <div className="card-head" style={{ display: this.state.schoolAdmin ? "block" : "none" }}>                     
                        <header>
                          <Link to={'/add_class'}>
                            <button className="btn btn-pink">Add Class</button>
                          </Link>

                        </header>
                        <div className="tools">
                            <input
                              placeholder="Search"
                              name="search"
                              className="form-control"
                              onChange={this.handleInputClassChange}                              
                            />
                        </div>
                      </div>
                      <div className="card-body no-padding height-9">
                        <div className="row">
                          <div className="table-responsive">
                            {this.renderClassesManageView(this.props.records)}
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
    total: state.classes.total,
    per_page: state.classes.per_page,
    records: state.classes.records,
    page: state.classes.page,
    totalPage: state.classes.totalPage,
    loading:state.classes.loading,
    deleteDetails:state.classes.isAuthenticated
  };
};
export default connect(
  mapStateToProps, { fetchClassesPost, deletePost, fetchClassesPagination }
)(ViewClassesDetails);