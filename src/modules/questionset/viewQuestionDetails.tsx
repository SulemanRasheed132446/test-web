import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import BreadCrumb from '../../components/BreadCrumb';
import { RouteComponentProps } from 'react-router';
import { fetchQuestionSet } from '../../store/question/Actions';
import { Link } from 'react-router-dom';

interface OwnStudentEditProps extends RouteComponentProps<OwnPropsParams> {
    fetchQuestionSet:(id:number) => void;
    postQuestionId:any;
    getQuestionDetails:any;
    loading: boolean | undefined;
};
export class viewQuestionDetails extends Component<OwnStudentEditProps> {
    componentDidMount(): void {
        this.props.fetchQuestionSet(Number(this.props.match.params.id));
    }
    render() {
        const { loading } = this.props;
        const loadingQuestionFull = { display: loading ? "block" : "none" };
        return (
            <div>
                 <div className="page-wrapper">
                <div className="page-content-wrapper">
                    <div className="page-content pt-3">
                    <BreadCrumb
                                titleName={['Question']}
                                homeName={['Home']}
                                url={['dashboard']}
                                mainPageTitle={['view Question']}
                                baseName={['Question']}
                                baseURL={['question']} />
                                <div className="row">
                                <div className="col-md-12 text-right mb-3">                                
                                <Link to={'/question'} className="btn btn-info mr-2 mb-1">Back</Link>
                                </div>
                                </div>
                                {this.props.getQuestionDetails?
                    <div className="row">
                        <div className="col-md-12">                           
                                <div>
                                <div className="row">
                                <div className="col-md-4">
                                <div className="form-group">
                                <label>Enter question set name</label>
                                <p>{this.props.getQuestionDetails.question_name}</p>
                                </div>                               
                                </div>
                                <div className="col-md-4"> 
                                <div className="form-group">
                                <label>Select Class</label>
                                <p>{this.props.getQuestionDetails.grade_id}</p>
                                </div>                       
                                </div>
                                <div className="col-md-4">
                                <div className="form-group">
                                <label>Select Subject</label>
                                <p>{this.props.getQuestionDetails.subject_id}</p>
                                </div> 
                                </div>
                                </div>
                                {this.props.getQuestionDetails.questions?
                                <div className="row">
                                    <div className="col-md-12">
                                        
                                            {this.props.getQuestionDetails.questions.map((items:any)=>(
                                            <div>
                                            <div className="card-box mt-4">
                                            <div className="card-body">
                                            <div className="d-flex mt-1 w-100">
                                            <div className="mr-3 mt-0">{items.serial_no}.</div>
                                            <div className="form-group w-100">                                           
                                            <p>{items.question}</p>
                                            </div>                                            
                                            </div>
                                            <div className="col-md-12 pr-0 mt-0">
                                            <span className="btn btn-xs btn-pink btn-circle mb-3">{items.topics}</span>  
                                            </div>
                                            <div>
                                                {items.answers.map((items:any)=>(
                                            <div className="d-flex mt-1">
                                            <div className="mt-0 mr-3 ml-2">
                                                <input type="radio" checked={items.is_correct_ans}  value={items.serial_no}/>
                                            </div>
                                            <div className="mr-3 mt-0">{items.serial_no}.</div>
                                            <div className="form-group w-100">
                                            <p className="mt-0">{items.choice}</p>
                                            </div> 
                                            </div>
                                                ))}
                                            </div>
                                            </div>
                                            </div>
                                            </div>
                                            ))}
                                        
                                    </div>                                    
                                </div>
                                :<SpinnerLoader/>}
                            </div>
                                
                                
                        </div>
                    </div>
                    :<SpinnerLoader/>}
                </div>
                </div>
                </div>
                <div style={loadingQuestionFull}><SpinnerLoader /></div>
            </div>
        )
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = (state:any, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        postQuestionId: state.questionset.items[Number(ownProps.match.params.id)],
        loading: state.questionset.loading,
        getQuestionDetails:state.questionset.getQuestionList
    }
}

export default connect(mapStateToProps, {fetchQuestionSet})(viewQuestionDetails)
