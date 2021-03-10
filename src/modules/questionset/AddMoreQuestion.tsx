import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, MenuItem, FormGroup } from '@material-ui/core';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import BreadCrumb from '../../components/BreadCrumb';
import { RootState } from '../../store/Index';
import { RouteComponentProps } from 'react-router';
import { fetchQuestionSet } from '../../store/question/Actions';
import { fetchGradePost } from '../../store/classes/Actions';
import { Link } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import { GetCorrectSubject } from '../../store/subject/Actions';
import { TextField } from 'formik-material-ui';
import { AddMoreQuestionPost } from '../../store/question/Actions';
import { QuestionValidation } from './QuestionValidation';

interface OwnStudentEditProps extends RouteComponentProps<OwnPropsParams> {
    fetchQuestionSet:(id:number) => void;
    fetchGradePost: (postValue:any) => void;
    GetCorrectSubject: (postValue:any) => any; 
    AddMoreQuestionPost:(addMoreQut:any) => void;
    postQuestionId:any;
    addNewQuestion:any;
    loading: boolean;     
    getClassList:any;
    getSubjectlist:any;
    getProfile:any;
};

export class AddMoreQuestion extends Component<OwnStudentEditProps> {
    componentDidMount(): void {
        this.props.fetchQuestionSet(Number(this.props.match.params.id));
        const postValue = {
            academic_year:'2020'
        }
        this.props.fetchGradePost(postValue);
        this.props.GetCorrectSubject(postValue);
    }

    render() {
        const getProfile = this.props.getProfile;
        const getSubject:any = this.props.getSubjectlist;
        let SubjectList:any;
        let Profiledata:any;
        let getquestionNo:any;
        let getQuestions:any;
        if(getSubject) {
            SubjectList = getSubject.data;
        }
        if(getProfile){
            Profiledata = getProfile.items.data;
        }
        let initialQuestionValues: any;
        if(this.props.addNewQuestion){
            getQuestions = this.props.addNewQuestion.questions;
            
            if(getQuestions){
                if(getQuestions.length > 0){
                    this.props.addNewQuestion.questions.forEach((items:any) =>{  
                        getquestionNo = Number(items.serial_no);
                    })
                   
                }
            }
            initialQuestionValues = {
                select_class: this.props.addNewQuestion.grade_id,
                select_subject: this.props.addNewQuestion.subject_id,
                question_name: this.props.addNewQuestion.question_name,
                question:'',
                add_topics:'',
                question_name_A:'',
                question_name_B:'',
                question_name_C:'',
                question_name_D:'',
                answer:''
            }
        }
        return (
            <div>
               <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                        <BreadCrumb
                                titleName={['Question']}
                                homeName={['Home']}
                                url={['dashboard']}
                                mainPageTitle={['Add Question']}
                                baseName={['Question']}
                                baseURL={['question']} />
                    { SubjectList && this.props.addNewQuestion && this.props.getClassList && getQuestions ?
                        <div className="row">
                            <div className="col-md-12">
                            <Formik
                            validationSchema={QuestionValidation}
                            initialValues={initialQuestionValues} onSubmit={(values, actions) => { 
                                let optionA:any;
                                let optionB:any;
                                let optionC:any;
                                let optionD:any;
                                if( values.answer === 'A'){
                                    optionA = true; optionB = false; optionC = false; optionD = false;
                                } else if( values.answer === 'B'){
                                    optionA = false; optionB = true; optionC = false; optionD = false;
                                } else if( values.answer === 'C'){
                                    optionA = false; optionB = false; optionC = true; optionD = false;
                                } else if( values.answer === 'D'){
                                   optionA = false; optionB = false; optionC = false; optionD = true;
                                }                             
                               const getQuestionValue:any =  {
                                id:Number(this.props.match.params.id),
                                school_id: Profiledata.school_id,
                                academic_year: '2021',
                                grade_id: values.select_class,
                                subject_id: values.select_subject,
                                question_name: values.question_name,
                                posted_by:  Profiledata.firstname,
                                add_topics:values.add_topics,
                                questions: [
                                  {
                                    serial_no: getquestionNo + 1,
                                    question: values.question,
                                    question_picture: '',
                                    answers: [
                                      {
                                        serial_no: 'A',
                                        choice: values.question_name_A,
                                        choice_url: '',
                                        is_correct_ans: optionA
                                      },
                                      {
                                        serial_no: 'B',
                                        choice: values.question_name_B,
                                        choice_url: '',
                                        is_correct_ans: optionB
                                      },
                                      {
                                        serial_no: 'C',
                                        choice: values.question_name_C,
                                        choice_url: '',
                                        is_correct_ans: optionC
                                      },
                                      {
                                        serial_no: 'D',
                                        choice: values.question_name_D,
                                        choice_url: '',
                                        is_correct_ans: optionD
                                      }
                                    ],
                                    is_active:true
                                  }
                                ]
                              }
                              this.props.AddMoreQuestionPost(getQuestionValue);
                            }}>
                            {({ values, errors, isSubmitting, isValidating, dirty, touched }) => (
                                <Form>
                                <div className="row">
                                <div className="col-md-4">
                                <FormGroup>
                                    <Field
                                        label='Enter question set name*'
                                        type="text"
                                        name="question_name"
                                        component={TextField}
                                        className="textfield__input"
                                        disabled={false}
                                    />
                                </FormGroup> 
                                </div>
                                <div className="col-md-4">
                                <FormGroup className="w-100 mb-4">
                                <Field 
                                label='Select Class*'
                                name="select_class"  
                                select
                                component={TextField}        
                                disabled={false} 
                                fullwidth 
                                >
                                    { this.props.getClassList.map((item:any) =>(
                                                <MenuItem value={item.value}>{item.value}</MenuItem>
                                        ))
                                    }
                                </Field> 
                                </FormGroup>                               
                                </div>
                                <div className="col-md-4">
                                <FormGroup className="w-100 mb-4">
                                <Field 
                                label='Select Subject*'
                                name="select_subject"  
                                select
                                component={TextField}        
                                disabled={false} 
                                fullwidth 
                                >
                                    { SubjectList.map((item:any) =>(
                                                <MenuItem value={item.name}>{item.name}</MenuItem>
                                        ))
                                    }
                                </Field> 
                                </FormGroup>  
                                </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-box mt-4">
                                        <div className="card-body">
                                            <div className="d-flex mt-1">
                                            <div className="mr-3 mt-4">{getquestionNo + 1}.</div>
                                            <FormGroup className="w-100">
                                            <Field
                                                label='Write Question*'
                                                type="text"
                                                name="question"
                                                component={TextField}
                                                className="textfield__input"
                                                disabled={false}
                                            />
                                        </FormGroup> 
                                           
                                            </div>
                                            <div className="col-md-12 pr-0 mt-3">
                                            <FormGroup className="w-100">
                                            <Field
                                                label='Add Topics*'
                                                type="text"
                                                name="add_topics"
                                                component={TextField}
                                                className="textfield__input"
                                                disabled={false}
                                            />
                                            </FormGroup> 
                                            </div>
                                            <div className="d-flex mt-3">
                                            <div className="mt-4 mr-3 ml-2">
                                            <Field type="radio" name="answer" value="A"/>
                                            </div>
                                            <div className="mr-3 mt-4">A.</div>
                                            <FormGroup className="w-100">
                                            <Field
                                                label='Write Option A*'
                                                type="text"
                                                name="question_name_A"
                                                component={TextField}
                                                className="textfield__input"
                                                disabled={false}
                                            />
                                            </FormGroup> 
                                            </div>
                                            <div className="d-flex mt-3">
                                            <div className="mt-4 mr-3 ml-2">
                                            <Field type="radio" name="answer" value="B" />
                                            </div>
                                            <div className="mr-3 mt-4">B.</div>
                                            <FormGroup className="w-100">
                                            <Field
                                                label='Write Option B*'
                                                type="text"
                                                name="question_name_B"
                                                component={TextField}
                                                className="textfield__input"
                                                disabled={false}
                                            />
                                            </FormGroup>  
                                            </div>
                                            <div className="d-flex mt-3">
                                            <div className="mt-4 mr-3 ml-2">
                                            <Field type="radio" name="answer" value="C" />
                                            </div>
                                            <div className="mr-3 mt-4">C.</div>
                                            <FormGroup className="w-100">
                                            <Field
                                                label='Write Option C*'
                                                type="text"
                                                name="question_name_C"
                                                component={TextField}
                                                className="textfield__input"
                                                disabled={false}
                                            />
                                            </FormGroup>
                                            </div>
                                            <div className="d-flex mt-3">
                                            <div className="mt-4 mr-3 ml-2">
                                            <Field type="radio" name="answer" value="D" />
                                            </div>
                                            <div className="mr-3 mt-4">D.</div>
                                            <FormGroup className="w-100">
                                            <Field
                                                fullwidth
                                                label='Write Option D*'
                                                type="text"
                                                name="question_name_D"
                                                component={TextField}
                                                className="textfield__input"
                                                disabled={false}
                                            />
                                            </FormGroup>
                                            </div>
                                            <div className="text-right mb-3 mr-2 mt-4">
                                            <Button 
                                            className="btn btn-pink mr-1 ml-1" 
                                             type="submit">Submit</Button>
                                            <Link to={'/question'}>
                                            <Button 
                                            className="btn btn-default mr-1 ml-1 ">Cancel</Button>
                                            </Link>
                                        </div>
                                        </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                </Form>
                                    )}
                            </Formik>
                            </div>
                        </div>
                        : <SpinnerLoader/>}
                    </div>
                </div>
                </div> 
            </div>
        )
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = ({ questionset, classes, subjects, profile }: RootState, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        postQuestionId: questionset.items[Number(ownProps.match.params.id)],
        addNewQuestion:questionset.getQuestionList,
        getClassList:classes.gradelist,
        getSubjectlist:subjects.category,
        getProfile:profile
    }
}

export default connect(mapStateToProps, {fetchQuestionSet, fetchGradePost, GetCorrectSubject, AddMoreQuestionPost})(AddMoreQuestion)
