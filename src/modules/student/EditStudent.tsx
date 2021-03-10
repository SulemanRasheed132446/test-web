import React from 'react'
import { connect } from 'react-redux'
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import BreadCrumb from '../../components/BreadCrumb';
import { RootState } from '../../store/Index';
import { RouteComponentProps } from 'react-router';
import { StudentType } from '../../store/student/Types';
import { editStudent, fetchStudent } from '../../store/student/Actions';
import { fetchGradePost, fetchGradeStandardPost } from '../../store/classes/Actions';
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { StudentValidation } from './StudentValidation';
import ImageUpload  from './StudentImage';

interface OwnStudentEditProps extends RouteComponentProps<OwnPropsParams> {
    editStudent: (student: any) => void;
    fetchGradePost: (postValue:any) => void;
    fetchGradeStandardPost: () => any;
    fetchStudent: (id: number) => void;
    loading: boolean;
    errorMessage: any;
    ListGrade: any;
    ListStandard: any;
    getStudentIt: any;
    getStudentData: any;
    getImageURL:any
};

export class EditStudent extends React.Component<OwnStudentEditProps>  {
    componentDidMount(): void {
        const postValue = {
            academic_year:'2020'
        }
        this.props.fetchGradePost(postValue);
        this.props.fetchGradeStandardPost();
        this.props.fetchStudent(Number(this.props.match.params.id));
    }

    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        const getEditDetails = this.props.getStudentData;
        let getEditData = getEditDetails.data;
        let emailId:any
        let getGrade:any;
        let getStandard:any;
        let studentclass_details:any;
        let getID:any;
        let phoneNo:any;
        let studentName:any;
        let parentFirstname:any;
        let parentLastname:any;
        let userId:any
        let profilePicture:any
        if(getEditData){
            emailId = getEditData.email_id;
            getID = getEditData.id;
            phoneNo = getEditData.phone_number;
            studentName = getEditData.student_name;
            parentFirstname = getEditData.parent_firstname;
            studentclass_details = getEditData.studentclass_details;
            parentLastname = getEditData.parent_lastname;
            userId = getEditData.user_id;
            if(studentclass_details){
                getGrade = studentclass_details[0].grade;
                getStandard = studentclass_details[0].standard;
                profilePicture = studentclass_details[0].profile_picture
            }
        }
        const initialEditValues: StudentType = {
            id:getID,
            phone_number:phoneNo,
            email_id:emailId,
            student_name:studentName,
            academic_year:'2020',
            grade: getGrade,
            standard: getStandard,
            parent_firstname:parentFirstname,
            parent_lastname:parentLastname,
            profile_picture:profilePicture,
            user_id:userId
        };
        let getUpdateImage:any
        if(this.props.getImageURL){
            const getUrlpath = this.props.getImageURL.url;
            if(getUrlpath){
                getUrlpath.forEach((items:any)=>{
                    getUpdateImage = items;
                })
            }
        } 
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['Student']}
                                homeName={['Home']}
                                url={['dashboard']}
                                baseName={['Student']}
                                baseURL={['student']}
                                mainPageTitle={['Edit Student']} />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card-box">
                                        <div className="card-head">
                                            <header>Edit Student</header>
                                            <div className="tools">
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            {getEditData && emailId && parentFirstname ?
                                                <Formik
                                                validationSchema={StudentValidation}
                                                initialValues={initialEditValues}
                                                onSubmit={(values:any, actions) => {
                                                    const postEditValues: any = {
                                                        id:getID,
                                                        phone_number:values.phone_number,
                                                        email_id:values.email_id,
                                                        student_name:values.student_name,
                                                        academic_year:values.academic_year,
                                                        grade: values.grade,
                                                        standard: values.standard,
                                                        parent_firstname:values.parent_firstname,
                                                        parent_lastname:values.parent_lastname,
                                                        profile_picture:getUpdateImage,
                                                        user_id:values.user_id
                                                    };
                                                    this.props.editStudent(postEditValues)
                                                }}
                                                render={({
                                                    values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit
                                                }: FormikProps<StudentType>) =>{ 
                                                    const isStudentEditEmpty = (!values.student_name 
                                                        || !values.grade 
                                                        || !values.standard 
                                                        || !values.phone_number 
                                                        || !values.email_id 
                                                        || !values.parent_firstname
                                                        || !values.parent_lastname 
                                                        || !values.profile_picture);
                                                return(
                                                    <form onSubmit={handleSubmit} className="ui form">
                                                            <div className="row">
                                                                <div className="col-md-6 p-t-20">
                                                                <div className="col-md-12 p-t-20 pl-0">
                                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                            <FormGroup>
                                                                                <Field
                                                                                    label='Student Name*'
                                                                                    type="text"
                                                                                    name="student_name"
                                                                                    component={TextField}
                                                                                    className="textfield__input"
                                                                                    disabled={false}
                                                                                />
                                                                            </FormGroup>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12 p-t-20 pl-0">
                                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                        <FormGroup>
                                                                        <Field 
                                                                        label='Class*'
                                                                        name="grade"  
                                                                        select
                                                                        component={TextField}        
                                                                        disabled={false}  
                                                                        >
                                                                            { this.props.ListGrade.map((item:any) =>(
                                                                                        <MenuItem value={item.value}>{item.value}</MenuItem>
                                                                                ))
                                                                            }
                                                                        </Field> 
                                                                        </FormGroup> 
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-12 p-t-20 pl-0">
                                                                        <div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label txt-full-width pt-0">
                                                                        <FormGroup>
                                                                        <Field 
                                                                        label='Section*'
                                                                        name="standard"  
                                                                        select
                                                                        component={TextField}        
                                                                        disabled={false} 
                                                                        fullwidth 
                                                                        >
                                                                            { this.props.ListStandard.map((item:any) =>(
                                                                                        <MenuItem value={item.value}>{item.value}</MenuItem>
                                                                                ))
                                                                            }
                                                                        </Field> 
                                                                        </FormGroup>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 p-t-20">
                                                                    <div className="paddingleft">
                                                                    <ImageUpload postImage={getUpdateImage}/>
                                                                    </div>                                            
                                                                </div>                                                
                                                                </div>
                                                        <div className="row">
                                                            <div className="col-md-6 p-t-20">
                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                    <FormGroup>
                                                                        <Field
                                                                            label='Phone Number*'
                                                                            type="text"
                                                                            name="phone_number"
                                                                            component={TextField}
                                                                            className="textfield__input"
                                                                            disabled={false}
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 p-t-20">
                                                                <div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label txt-full-width pt-0">
                                                                    <FormGroup>
                                                                        <Field
                                                                            label='Email Id*'
                                                                            type="email"
                                                                            name="email_id"
                                                                            component={TextField}
                                                                            className="textfield__input"
                                                                            disabled={false}
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 p-t-20">
                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                    <FormGroup>
                                                                        <Field
                                                                            label='Parent First Name*'
                                                                            type="text"
                                                                            name="parent_firstname"
                                                                            component={TextField}
                                                                            className="textfield__input"
                                                                            disabled={false}
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 p-t-20">
                                                                <div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label txt-full-width pt-0">
                                                                    <FormGroup>
                                                                        <Field
                                                                            label='Parent Last Name*'
                                                                            type="text"
                                                                            name="parent_lastname"
                                                                            component={TextField}
                                                                            className="textfield__input"
                                                                            disabled={false}
                                                                        />
                                                                    </FormGroup>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right mb-3 mr-2 mt-4">
                                                            <Button className="btn btn-pink mr-1 ml-1" 
                                                            disabled={isStudentEditEmpty 
                                                                || isValidating }
                                                            type="submit">Submit</Button>
                                                            <Link to="/student"><Button className="btn btn-default mr-1 ml-1">Cancel</Button></Link>
                                                        </div>
                    
                                                    </form>
                                                )}
                                            }
                                            />
                                                : <SpinnerLoader />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        )
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = ({ student, classes }: RootState, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        getStudentIt: student.items[Number(ownProps.match.params.id)],
        ListGrade: classes.gradelist,
        ListStandard: classes.standardList,
        loading: student.loading,
        errorMessage: student.errors,
        getStudentData: student.getStudentEditResponse,
        getImageURL:student.ImageURL
    };
};

export default connect(mapStateToProps, { fetchGradePost, fetchGradeStandardPost, editStudent, fetchStudent })(EditStudent)
