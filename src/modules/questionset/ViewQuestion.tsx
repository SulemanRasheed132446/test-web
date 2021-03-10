import React, { Component } from 'react'
import { connect } from 'react-redux';
import BreadCrumb from '../../components/BreadCrumb';
import { Link } from 'react-router-dom';
import CommonLoader from '../../components/CommonLoader';
import { QuestionTypes } from '../../store/question/Types';
import { Question } from '../../router/Roles';
import { fetchQuestionSetPost } from '../../store/question/Actions';
import InfiniteScroll from 'react-infinite-scroll-component';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';

export type OwnQuestSetProps = {
    fetchQuestionSetPost:(getPostValue:any)=>void;
    loading: boolean;
    acsOrder:boolean;
    page: number;
    per_page: number;
    totalPage: number;
    records: any;
    total: number;
}
export class ViewQuestion extends Component<OwnQuestSetProps, QuestionTypes, any> {
    hasMoreClass:any;
    constructor(props: any) {
        super(props);
        this.state = {
            acsOrder:true,
            academic_year:'2021',
            search:'',
            hasMore:false,
            recordPage: 1,
            SortOrderData: '',
            OrderNameData: '',
        }
    }
    componentDidMount(): void {
          this.getQuestionSetDetails()    
    }
    getQuestionSetDetails(){
        const getPostStudent = {
            page_no: 1,
            academic_year:this.state.academic_year,
            search:this.state.search,
            sort_by: this.state.SortOrderData,
            order_by: this.state.OrderNameData
          }
        this.props.fetchQuestionSetPost(getPostStudent);
    }
    showFilterData(getValues:any){
      if (getValues.sort_by === 'desc') {
        this.setState({ 
          acsOrder: false, 
          search: '',
          SortOrderData: getValues.sort_by,
          OrderNameData: getValues.order_by
        })
        const postValue = {
          page_no: 1,
          academic_year:this.state.academic_year,
          search: this.state.search,
          sort_by: getValues.sort_by,
          order_by: getValues.order_by
        }
        this.setState({
          hasMore: true,
          SortOrderData: getValues.sort_by,
          OrderNameData: getValues.order_by,
          recordPage: 1
        })
        this.props.fetchQuestionSetPost(postValue);
      } else {
        this.setState({ 
          acsOrder: true, 
          SortOrderData: getValues.sort_by, 
          OrderNameData: getValues.order_by, 
          search: '' })
        const postValue = {
          page_no: 1,
          academic_year:this.state.academic_year,
          search: this.state.search,
          sort_by: getValues.sort_by,
          order_by: getValues.order_by
        }
        this.setState({
          hasMore: true,
          SortOrderData: getValues.sort_by,
          OrderNameData: getValues.order_by,
          recordPage: 1
        })
        this.props.fetchQuestionSetPost(postValue);
      }
    }
    public fetchMoreStudentData = () => {
      const { recordPage } = this.state;
      if (this.state.hasMore === true) {
        if (Math.ceil(this.props.total / this.props.per_page) > this.props.page) {
          const postValue = {
            page_no:  recordPage + 1,
            academic_year:this.state.academic_year,
            sort_by: this.state.SortOrderData,
            order_by: this.state.OrderNameData,
            search:this.state.search
          }
          this.props.fetchQuestionSetPost(postValue);
          this.setState({
            recordPage: recordPage + 1
          })
        }
  
        if (Math.ceil(this.props.total / this.props.per_page) === this.props.page) {
          this.setState({
            hasMore: false,
          })
        }
      }
    }
    private renderQuestionView(records: any) {
        const { acsOrder } = this.state;
        const { loading } = this.props;
        const loadingQuestionFull = { display: loading ? "block" : "none" };
        return (
            <div>
              <InfiniteScroll
          dataLength={records.length}
          next={this.fetchMoreStudentData}
          hasMore={this.state.hasMore}
          loader={<h4 style={loadingQuestionFull}>Loading...</h4>}
        >
            <table className="table table-striped custom-table table-hover">
            <thead>
            <tr>
            <th>
                {acsOrder ?
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'question_name' })}
                  title="Ascending order" className="headerBold">Questions&nbsp;
                  <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : <button
                  onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'question_name' })}
                  title="Descending order" className="headerBold">
                 Questions <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>}
            </th>
            <th>
                {acsOrder ?
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'grade_id' })}
                  title="Ascending order" className="headerBold">Class&nbsp;
                  <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : <button
                  onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'grade_id' })}
                  title="Descending order" className="headerBold">
                 Class <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>}
            </th>
            <th>
                {acsOrder ?
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'subject_id' })}
                  title="Ascending order" className="headerBold">Subject &nbsp;
                  <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : <button
                  onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'subject_id' })}
                  title="Descending order" className="headerBold">
                 Subject <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>}
            </th>
        
            <th>
                {acsOrder ?
                <button onClick={() => this.showFilterData({ sort_by: 'desc', order_by: 'posted_by' })}
                  title="Ascending order" className="headerBold">Create by&nbsp;
                  <i className="fa fa-sort-amount-asc" aria-hidden="true"></i></button> : <button
                  onClick={() => this.showFilterData({ sort_by: 'asc', order_by: 'posted_by' })}
                  title="Descending order" className="headerBold">
                 Create by <i className="fa fa-sort-amount-desc" aria-hidden="true"></i></button>}
            </th>
            <th>Actions</th>
            </tr>
            </thead>
            <tbody>
              {records.length > 0 ?
                records.map((items: any) => (
                <tr> 
                    <td >{items['question_name'] || '-'}</td>
                    <td >{items['grade_id'] || '-'}</td>
                    <td >{items['subject_id'] || '-'}</td>
                    <td >{items['posted_by'] || '-'}</td>
                    <td>                     
                      {acsOrder ?
                        <Link to={`/question/${items.id}`}>
                          <button className="btn btn-primary btn-xs"
                            title="View Question"><i className="fa fa-eye" aria-hidden="true"></i></button></Link> :
                        <button className="btn btn-disable btn-xs"
                          title="View Question"><i className="fa fa-eye" aria-hidden="true"></i></button>}
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

    handleInputQuestionSet = (e: any) => {
        const { value } = e.target;
        const getSearchValue = value;
        if (getSearchValue) {
          const postSearchValue = {
            page_no: 1,
            search: getSearchValue,
            academic_year:this.state.academic_year,
            sort_by: this.state.SortOrderData,
            order_by: this.state.OrderNameData
          }
          this.props.fetchQuestionSetPost(postSearchValue);
          this.setState({
            hasMore: true,
            recordPage: 1,
            search: getSearchValue
          })
          this.hasMoreClass = true;
        } else {
          const postSearchValue = {
            page_no: 1,
            search: '',
            academic_year:this.state.academic_year,
            sort_by: this.state.SortOrderData,
            order_by: this.state.OrderNameData
          }
          this.props.fetchQuestionSetPost(postSearchValue);
          this.setState({
            hasMore: true,
            recordPage: 1,
            search: ''
          })
          this.hasMoreClass = true;
        }
    
      }
    render() {
      const { loading } = this.props;
      const loadingQuestionFull = { display: loading ? "block" : "none" };
        return (
            <div>
                <div className="page-wrapper">
                <div className="page-content-wrapper">
                    <div className="page-content pt-3">
                    <BreadCrumb titleName={['Question']} homeName={['Home']} url={['dashboard']} mainPageTitle={['Question']} />
                    <div className="row">
                        <div className="col-md-12">
                        <div className="card card-topline-red">
                            <div className="mr-4 mt-2">
                            <h4 className="pull-right">Total: {this.props.total}</h4>
                            </div>
                            <div className="card-head">
                            <header>
                                <Link to={Question.AddQuestion}>
                                <button className="btn btn-pink">Add Question</button>
                                </Link>
                            </header>
                            <div className="tools">
                                <input
                                    placeholder="Search"
                                    name="search"
                                    className="form-control"
                                    onChange={this.handleInputQuestionSet} 
                                />
                            </div>
                            </div>
                            <div className="card-body no-padding height-9">
                            <div className="row">
                                <div className="table-responsive">

                                {this.renderQuestionView(this.props.records)}
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div style={loadingQuestionFull}><SpinnerLoader /></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    return {
    loading: state.questionset.loading,
    total: state.questionset.total,
    per_page: state.questionset.per_page,
    records: state.questionset.records,
    page: state.questionset.page,
    totalPage: state.questionset.totalPage,
    }
}

const mapDispatchToProps = {
    fetchQuestionSetPost
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewQuestion)
