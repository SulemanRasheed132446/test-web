import React, { Component } from 'react'
import { Button, MenuItem, FormGroup } from '@material-ui/core';
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import { fetchGradePost } from '../../store/classes/Actions';
import { Link } from 'react-router-dom';
import { Field, Formik, Form, FieldArray } from 'formik';
import { GetCorrectSubject } from '../../store/subject/Actions';
import { TextField } from 'formik-material-ui';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { addQuestion } from '../../store/question/Actions';
import { validationSchemaTest } from './QuestionValidation';
import { fetchGetAllClassList } from '../../store/diary/Actions';

export type OwnQuestSetProps = {
    loading: boolean;
    addQuestion:(postQuestion:any) => void;
    fetchGradePost: (postValue:any) => void;
    GetCorrectSubject: (postValue:any) => void;  
    fetchGetAllClassList:(postValue:any)=>void;
    getClassList:any;
    getSubjectlist:any;
    getProfile:any;
    getCorrectClassList:any;
}
const initialValues:any = {
    question_name: '',
    select_class: '',
    select_subject: '',
    questionlist: [
        {
            question: '',
            add_topics: '',
            question_name_A:'',
            question_name_B:'',
            question_name_C:'',
            question_name_D:'',
            answer:''
        }

    ]
};
export class AddQuestion extends Component<OwnQuestSetProps> {  
    getQuestionList:any = []; 
    componentDidMount(): void {
        const postValue = {
            academic_year:'2020'
        }
        this.props.fetchGradePost(postValue);
        this.props.GetCorrectSubject(postValue);
        this.props.fetchGetAllClassList(postValue);
    }
  
    render() {
        const getProfile = this.props.getProfile;
        const getSubject:any = this.props.getSubjectlist;
        let SubjectList:any;
        let ClassListSchoolAdmin:any;
        let ClassListTeacher:any;
        if(getSubject) {
            SubjectList = getSubject.data;
        }
        if(getProfile.usertype === 1 || getProfile.usertype === 2 ) {
            ClassListSchoolAdmin = this.props.getClassList;
        } else if(getProfile.usertype === 3) {
            ClassListTeacher = this.props.getCorrectClassList;
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
                                {SubjectList && getProfile && this.props.getCorrectClassList && this.props.getClassList ?
                        <div className="row">
                            <div className="col-md-12">
                            <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchemaTest}
                                            onSubmit={(values, actions) => {
                                                let getQuestionValue:any                                                
                                                if(values){
                                                    values.questionlist.forEach((item:any, index:any)=>{
                                                        let submitValue:any = [];
                                                        let optionA:any;
                                                        let optionB:any;
                                                        let optionC:any;
                                                        let optionD:any;
                                                        if( item.answer === 'A'){
                                                            optionA = true; optionB = false; optionC = false; optionD = false;
                                                        } else if( item.answer === 'B'){
                                                            optionA = false; optionB = true; optionC = false; optionD = false;
                                                        } else if( item.answer === 'C'){
                                                            optionA = false; optionB = false; optionC = true; optionD = false;
                                                        } else if( item.answer === 'D'){
                                                        optionA = false; optionB = false; optionC = false; optionD = true;
                                                        }

                                                        submitValue =   
                                                              {
                                                                serial_no: index + 1,
                                                                question: item.question,
                                                                question_picture: '',
                                                                topics: item.add_topics,
                                                                answers: [
                                                                  {
                                                                    serial_no: 'A',
                                                                    choice: item.question_name_A,
                                                                    choice_url: '',
                                                                    is_correct_ans: optionA
                                                                  },
                                                                  {
                                                                    serial_no: 'B',
                                                                    choice: item.question_name_B,
                                                                    choice_url: '',
                                                                    is_correct_ans: optionB
                                                                  },
                                                                  {
                                                                    serial_no: 'C',
                                                                    choice: item.question_name_C,
                                                                    choice_url: '',
                                                                    is_correct_ans: optionC
                                                                  },
                                                                  {
                                                                    serial_no: 'D',
                                                                    choice: item.question_name_D,
                                                                    choice_url: '',
                                                                    is_correct_ans: optionD
                                                                  }
                                                                ]
                                                              }
                                                            
                                                        this.getQuestionList.push(submitValue);
                                                    })

                                                    if(this.getQuestionList.length > 0) {
                                                        getQuestionValue =  {
                                                            school_id: getProfile.school_id,
                                                            academic_year: '2021',
                                                            grade_id: values.select_class,
                                                            subject_id: values.select_subject,
                                                            question_name: values.question_name,
                                                            posted_by:  getProfile.firstname,                                                            
                                                            questions: this.getQuestionList
                                                          }
                                                    this.props.addQuestion(getQuestionValue);
                                                    }
                                                }
                                             
                                            }}>
                                            {({ values, errors, isSubmitting, isValidating, dirty, touched, handleReset, handleSubmit }) => (
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
                                                               
                                                                     {ClassListSchoolAdmin ?
                                                                    <Field
                                                                    label='Select Class*'
                                                                    name="select_class"
                                                                    select
                                                                    component={TextField}
                                                                    disabled={false}
                                                                >
                                                                    { this.props.getClassList.map((item:any) =>(
                                                                        <MenuItem value={item.value}>{item.value}</MenuItem>
                                                                            ))
                                                                        }
                                                                        </Field>
                                                                    :null}
                                                                     {ClassListTeacher ?
                                                                      <Field
                                                                      label='Select Class*'
                                                                      name="select_class"
                                                                      select
                                                                      component={TextField}
                                                                      disabled={false}
                                                                  >
                                                                     { this.props.getCorrectClassList.map((item:any) =>(
                                                                        <MenuItem value={item.grade_standard}>{item.grade_standard}</MenuItem>
                                                                            ))
                                                                        }
                                                                      </Field>
                                                                     :null}
                                                                    
                                                               
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
                                                                >
                                                                    { SubjectList.map((item:any) =>(
                                                                    <MenuItem value={item.name}>{item.name}</MenuItem>
                                                                        ))
                                                                    }
                                                                </Field>
                                                            </FormGroup>
                                                        </div>
                                                    </div>
                                                    <FieldArray
                                                        name="questionlist"
                                                        render={({ insert, remove, push }) => (
                                                            <>
                                                                        {values.questionlist.length > 0 &&
                                                                            values.questionlist.map((friend:any, index:any) => (
                                                                                <div className="row" key={index}>
                                                                            <div className="col-md-12">
                                                                          
                                                                                <div className="card-box mt-4">
                                                                                    <div className="card-body  pb-5">
                                                                                    <div className="col-md-12 text-right ">
                                                                                        <button className=""
                                                                                            type="button"                  
                                                                                            onClick={() => remove(index)}
                                                                                        >
                                                                                        <span className="deleteIcon"> 
                                                                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                                                                        </span>
                                                                                        </button>
                                                                                    </div>
                                                                                    
                                                                                    <div className="d-flex mt-1 w-100">
                                                                                        <div className="mr-3 mt-4">{index + 1}.</div>
                                                                                        <FormGroup className="w-100">
                                                                                            <Field
                                                                                                label='Write Question*'
                                                                                                type="text"
                                                                                                name={`questionlist.${index}.question`}
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
                                                                                                name={`questionlist.${index}.add_topics`}
                                                                                                component={TextField}
                                                                                                className="textfield__input"
                                                                                                disabled={false}
                                                                                            />
                                                                                        </FormGroup>
                                                                                    </div>  
                                                                                <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <div className="col-md-12">
                                                                                        <div className="d-flex mt-3">
                                                                                        <div className="mt-4 mr-3 ml-2">
                                                                                        <Field type="radio" name={`questionlist.${index}.answer`} value="A"/>
                                                                                        </div>
                                                                                        <div className="mr-3 mt-4">A.</div>
                                                                                        <FormGroup className="w-100">
                                                                                        <Field
                                                                                            label='Write Option A*'
                                                                                            type="text"
                                                                                            name={`questionlist.${index}.question_name_A`}
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            disabled={false}
                                                                                        />
                                                                                        </FormGroup> 
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-md-12">
                                                                                    <div className="d-flex mt-3">
                                                                                    <div className="mt-4 mr-3 ml-2">
                                                                                    <Field type="radio" name={`questionlist.${index}.answer`} value="B" />
                                                                                    </div>
                                                                                    <div className="mr-3 mt-4">B.</div>
                                                                                    <FormGroup className="w-100">
                                                                                    <Field
                                                                                        label='Write Option B*'
                                                                                        type="text"
                                                                                        name={`questionlist.${index}.question_name_B`}
                                                                                        component={TextField}
                                                                                        className="textfield__input"
                                                                                        disabled={false}
                                                                                    />
                                                                                    </FormGroup>  
                                                                                    </div>
                                                                                </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="col-md-12">
                                                                                    <div className="d-flex mt-3">
                                                                                    <div className="mt-4 mr-3 ml-2">
                                                                                    <Field type="radio" name={`questionlist.${index}.answer`} value="C" />
                                                                                    </div>
                                                                                    <div className="mr-3 mt-4">C.</div>
                                                                                    <FormGroup className="w-100">
                                                                                    <Field
                                                                                        label='Write Option C*'
                                                                                        type="text"
                                                                                        name={`questionlist.${index}.question_name_C`}
                                                                                        component={TextField}
                                                                                        className="textfield__input"
                                                                                        disabled={false}
                                                                                    />
                                                                                    </FormGroup>
                                                                                    </div>
                                                                                 </div>
                                                                                <div className="col-md-12">
                                                                                <div className="d-flex mt-3">
                                                                                    <div className="mt-4 mr-3 ml-2">
                                                                                    <Field type="radio" name={`questionlist.${index}.answer`} value="D" />
                                                                                    </div>
                                                                                    <div className="mr-3 mt-4">D.</div>
                                                                                    <FormGroup className="w-100">
                                                                                    <Field
                                                                                        label='Write Option D*'
                                                                                        type="text"
                                                                                        name={`questionlist.${index}.question_name_D`}
                                                                                        component={TextField}
                                                                                        className="textfield__input"
                                                                                        disabled={false}
                                                                                    />
                                                                                    </FormGroup>
                                                                                    
                                                                                </div>
                                                                                    </div>
                                                                                </div>                                                                                   
                                                                                </div>   
                                                                               
                                                                                   
                                                                                </div>
                                                                                  </div>
                                                                                  </div>
                                                                              </div>
                                                                              
                                                                            ))}
                                                                            <div className="col-md-12 text-center">
                                                                            <Link to={'#'} className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored margin-right-10" data-upgraded=",MaterialButton" onClick={() => push({question: "", add_topics: "", question_name_A:"", question_name_B:"", question_name_C:"", question_name_D:"" })}>
                                                                                <i className="material-icons">add</i>
                                                                            </Link>
                                                                            </div>
                                                                       
                                                        </>    
                                                        )}
                                                    />
                                                    <div className="text-right mb-3 mr-2 mt-4">
                                                        <Button
                                                            className="btn btn-pink mr-1 ml-1"
                                                            type="submit">Submit</Button>
                                                        <Link to={'/question'}>
                                                            <Button
                                                                className="btn btn-default mr-1 ml-1 ">Cancel</Button>
                                                        </Link>
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

const mapStateToProps = (state:any) => {   
    return{
        loading:state.classes.loading,
        getClassList:state.classes.gradelist,
        getSubjectlist:state.subjects.category,
        getProfile:state.profile.profileData,
        getCorrectClassList:state.diary.gradelist
    }
}

export default connect(mapStateToProps, {fetchGradePost, GetCorrectSubject, addQuestion, fetchGetAllClassList })(AddQuestion)
