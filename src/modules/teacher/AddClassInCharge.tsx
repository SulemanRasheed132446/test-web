import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button, FormGroup, Checkbox, TextField } from '@material-ui/core';
import { Formik, FormikProps } from 'formik';
import BreadCrumb from '../../components/BreadCrumb';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { TeacherClassMappingPost } from '../../store/teacher/Actions';

export type OwnTeacherFormProps = {
    TeacherClassMappingPost: (teacherMap: any) => void;
    fetchGetAllClassList: (postValue:any) => void;
    loading: boolean; 
    getClassList:boolean;
    getTeacherViewData:any;
    schoolIdDetails:any
};
export interface addClasslist {
    ClassList:object
}
const initialClassValues:addClasslist = {
    ClassList:[]
}
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export class AddClassInCharge extends Component<OwnTeacherFormProps> {
    getClassIncharge:any = [];
    componentDidMount(): void {
        const ClassIncharge:any = {
            academic_year: '2020'
        }
        this.props.fetchGetAllClassList(ClassIncharge);
    }
    getClassInchargeList(getValue?:any){     
        this.getClassIncharge = [];
        if(getValue) {
            this.getClassIncharge.push(String(getValue.id))        
         }
    }
    onSubmitClassIncharge = (values: any) => {
        const ClassIncharge:any = {
            academic_year: '2021',
            teacher_id: this.props.getTeacherViewData.ldap_id,
            class_incharge:this.getClassIncharge
        }
        this.props.TeacherClassMappingPost(ClassIncharge)
    }
    render() {
        const getClass:any = this.props.getClassList;
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
                            mainPageTitle={['Add Class Incharge']}/>
                             <div className="row">
                        <div className="col-md-12">
                            <div className="card-box">
                                <div className="card-head">
                                    <header>Add Class Incharge</header>
                                    <div className="tools">
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Formik
                                                initialValues={initialClassValues}
                                                onSubmit={this.onSubmitClassIncharge}
                                                render={({
                                                    values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit, setFieldValue
                                                }: FormikProps<addClasslist>) => (
                                                    <form onSubmit={handleSubmit} className="ui form">  
                                                    <div className="row">      
                                                            <div className="col-md-12 p-t-20">
                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                <FormGroup>
                                                                {getClass?
                                                                <Autocomplete
                                                                    fullWidth
                                                                    id="checkboxes-tags-demo"
                                                                    options={getClass}
                                                                    disableCloseOnSelect
                                                                    getOptionLabel={(option:any) => option.grade_standard}
                                                                    onChange={(e, value) => {
                                                                        this.getClassInchargeList(value)
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
                                                                        <TextField {...params} label="Search Class Name" name="classNameId" placeholder="Search Student" />
                                                                    )}
                                                                    />
                                                                    :null}
                                                                </FormGroup> 
                                                                </div>
                                                            </div>
                                                        </div>         
                                                        <div className="text-right mb-3 mr-2 mt-4">
                                                            <Button className="btn btn-pink mr-1 ml-1" type="submit">Submit</Button>
                                                            <Link to={`/teacher/${this.props.getTeacherViewData.ldap_id}`}><Button className="btn btn-default mr-1 ml-1">Cancel</Button></Link>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    return {
        loading:state.student.loading,
        errorMessage: state.student.errors,
        getClassList:state.diary.gradelist,
        getTeacherViewData:state.teacher.GetTeacherProfile,
        schoolIdDetails:state.profile.schoolId
    };
}

export default connect(mapStateToProps, {TeacherClassMappingPost, fetchGetAllClassList})(AddClassInCharge)
