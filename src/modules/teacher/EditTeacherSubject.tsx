import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem, Checkbox, TextField } from '@material-ui/core';
import { fetchTeacherPostId, FetchSubjectMappingPost } from '../../store/teacher/Actions';
import { Field, Formik, FormikProps } from 'formik';
import BreadCrumb from '../../components/BreadCrumb';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { TeacherEditSubjectMappingPost } from '../../store/teacher/Actions';
import { GetCorrectSubject } from '../../store/subject/Actions';
import { RouteComponentProps } from 'react-router';

interface OwnTeacherSubjectFormProps extends RouteComponentProps<OwnPropsParams> {
    TeacherEditSubjectMappingPost: (teacherMap: any) => void;    
    FetchSubjectMappingPost: (teacherDetails: any) => void;
    fetchGetAllClassList: () => any; // This is the service get all class list 
    GetCorrectSubject: () => any; 
    errorMessage?: any;
    loading?: boolean; 
    gradeStandard?:any;
    getTeacherViewData?:any;
    schoolIdDetails?:any,
    SubjectList?:any
    getTeacherid?: any;
    records?: any;
    getClassSubjectEdit?:any;
    getCurrectTeacher?:any;
    Subject_name:any
};
export interface EditSubject {
    subjectName?:any,
    EditclassNameId?:any,
    classInchanger?:any,
    addClassMapping?:any
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export class EditTeacherSubject extends Component<OwnTeacherSubjectFormProps, EditSubject> {
    teacherId:any;
    getSubject:any;
    getStateValue:any;
    getClassList:any = [];
    updateClassList:any = [];
    updateSubject:any;
    constructor(props: any) {
        super(props);
        this.state = {
            addClassMapping:[]
        }
    }
    componentDidMount(): void {
        this.props.fetchGetAllClassList();
        this.props.GetCorrectSubject();
        // this.getTeacherDetails();
        this.getStateValue = this.props.history.location.state;        
    }
    // getTeacherDetails() {
    //     if (this.props.getTeacherid) {
    //         const postValue: any = {
    //             page_no: 1,
    //             academic_year: 2021,
    //             teacher_id: this.props.match.params.id
    //         }
    //         this.props.fetchTeachersMappingPost(postValue);
    //     }
    // }
    getSubjectDetails(getEvent:any, getValue:any) {
        const { value } = getEvent.target;
        this.getSubject = value;
    }
    getEditClassMappingList(getValue?:any){     
        this.getClassList = [];
        if(getValue){
            getValue.forEach((items:any)=>{
                const getClassList = String(items.id);  
                this.getClassList.push(getClassList)                
            })
        }
    }
    validateSubject(value:any) {
        let error;
        if (!value) {
          error = 'Please select subject';
        }
        return error;
      }
    onSubmit = (values: any) => {
        const teacherMap:any = {
            academic_year: '2021',
            teacher_id: this.props.getTeacherViewData.ldap_id,
            subject_id: values.subjectName,
            class_ids:this.getClassList
        }
        this.props.TeacherEditSubjectMappingPost(teacherMap);
    }
    render() {
        let getClassData:any = [];
        let getSubject:any = [];
        let SubjectUpdateList:any = [];
        let teacherId:any;
        const { loading } = this.props;
        const loadingSubject = { display: loading ? "block" : "none" };
        const getClassList:any = this.props.gradeStandard;
        const getSubjectList:any = this.props.SubjectList;
        let getSubjectCrnList:any;
        if(getSubjectList){
            getSubjectCrnList = getSubjectList.data;
        }
        if(this.getStateValue) {
            getClassData = this.getStateValue.class_id;
            getSubject = parseInt(this.getStateValue.subject_id)
            teacherId = this.getStateValue.teacherId;
            SubjectUpdateList = [];
            getClassData.forEach((classList:any) => {
                let getClassId = getClassList.find((item:any)=> item.id === parseInt(getClassData)) 
                SubjectUpdateList.push(getClassId);                  
               })
        }    
        const initialEditSubjectValues:EditSubject = {
            subjectName:getSubject
        }
        return (
            <div>
                 <div className="page-wrapper">
                <div className="page-content-wrapper">
                    <div className="page-content pt-3">
                        <BreadCrumb 
                        titleName={['Teacher']} 
                        homeName={['Home']} 
                        url={['dashboard']} 
                        baseName={['Teacher']} 
                        baseURL={['teacher']} 
                        mainPageTitle={['Edit Subject']}/>
                {getSubjectCrnList && getClassList && getSubject && getClassData && SubjectUpdateList ?
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card-box">
                                <div className="card-head">
                                    <header>Edit Subject</header>
                                    <div className="tools">
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Formik
                                                ref={node=>this.teacherId = node}
                                                initialValues={initialEditSubjectValues}
                                                onSubmit={this.onSubmit}
                                                render={({
                                                    values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit, setFieldValue
                                                }: FormikProps<any>) => (
                                                    <form onSubmit={handleSubmit} className="ui form">  
                                                    <div className="row"> 
                                                        <div className="col-md-6 p-t-20">
                                                            <div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label txt-full-width pt-0">
                                                            <FormGroup>
                                                            <Field
                                                                label='Subject*'
                                                                name="subjectName"
                                                                select
                                                                component={TextField}
                                                                className="textfield__input mt-1"
                                                                fullwidth="true"
                                                                disabled={false}
                                                            >
                                                                {getSubjectCrnList.map((item: any) => (
                                                                    <MenuItem value={item.id}>{item.name}</MenuItem>
                                                                ))}
                                                            </Field>
                                                        </FormGroup>
                                                                {errors.subjectName && touched.subjectName && <div className="errorcolor">{errors.subjectName}</div>}
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6 p-t-20">
                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                <FormGroup>
                                                                    {getClassList?
                                                                <Autocomplete
                                                                    fullWidth
                                                                    multiple
                                                                    limitTags={2}
                                                                    id="checkboxes-tags-demo"
                                                                    options={getClassList}
                                                                    disableCloseOnSelect                                                                    
                                                                    getOptionLabel={(option:any) => option.grade_standard}
                                                                    defaultValue={getClassList} 
                                                                    onChange={(e, value) => {
                                                                       this.getEditClassMappingList(value)
                                                                    }}
                                                                    renderOption={(option, { selected }) => (
                                                                        <React.Fragment>
                                                                        <Checkbox
                                                                            icon={icon}
                                                                            checkedIcon={checkedIcon}
                                                                            style={{ marginRight: 8 }}
                                                                            checked={selected}
                                                                        />
                                                                        {option.grade_standard}
                                                                        </React.Fragment>
                                                                    )}
                                                                    className="mb-3 mt-1"
                                                                    renderInput={(params) => (
                                                                        <TextField {...params} label="Search Class Name" name="EditclassNameId" placeholder="Search Student" />
                                                                    )}
                                                                    />
                                                                    :null}                                                                    
                                                                </FormGroup> 
                                                                {errors.EditclassNameId && touched.EditclassNameId && <div className="errorcolor">{errors.EditclassNameId}</div>}
                                                                </div>
                                                            </div>
                                                        </div>         
                                                        <div className="text-right mb-3 mr-2 mt-4">
                                                            <Button className="btn btn-pink mr-1 ml-1" type="submit">Submit</Button>
                                                            <Link to={`/teacher/${teacherId}`}><Button className="btn btn-default mr-1 ml-1">Cancel</Button></Link>
                                                        </div>
                                                    </form>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                :<SpinnerLoader/>}

                 <div style={loadingSubject}><SpinnerLoader/></div>
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

const mapStateToProps = (state: any, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        loading: state.teacher.loading,
        errorMessage: state.teacher.errors,
        gradeStandard:state.diary.gradelist,
        getTeacherViewData: state.teacher.GetTeacherProfile,
        getTeacherid: state.teacher.TeacherId,
        records: state.teacher.records,
        ClassNameList: state.diary.gradelist,
        SubjectList: state.subjects.category
    };
}

export default connect(mapStateToProps, { fetchTeacherPostId, FetchSubjectMappingPost, fetchGetAllClassList, GetCorrectSubject, TeacherEditSubjectMappingPost })(EditTeacherSubject)
