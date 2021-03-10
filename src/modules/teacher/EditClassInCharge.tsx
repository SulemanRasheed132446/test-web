import React, { Component } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import BreadCrumb from '../../components/BreadCrumb';
import { fetchTeacherPostId, fetchClassInchargeMappingPost, TeacherClassMappingPost } from '../../store/teacher/Actions';
import { EditClasslist } from '../../store/teacher/Type';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { TextField } from 'formik-material-ui';

interface OwnSubjectMappingProps extends RouteComponentProps<OwnPropsParams> {    
    TeacherClassMappingPost: (teacherMap: any) => void;
    fetchGetAllClassList: (postValue:any) => any;
    fetchTeacherPostId: (id: string) => void;
    fetchClassInchargeMappingPost: (classIncharge: any) => void;
    loading: boolean;
    ClassNameList: any;
    records: any;
    page: number;
    per_page: number;
    totalPage: number;
};

export class EditClassInCharge extends Component<OwnSubjectMappingProps> {
    getClassPropsValue:any;
    getClassIncharge: any = [];
    teacherId:any;
    // state = {
    //     EditClassMapping: {}
    // }
    componentDidMount(): void {
        this.props.fetchTeacherPostId(String(this.props.match.params.id));
        const postValue: any = {
            academic_year: 2021
        }
        this.props.fetchGetAllClassList(postValue);
        this.getTeacherDetails();
        this.getClassPropsValue = this.props.history.location.state;    
        if(this.getClassPropsValue) {
            this.teacherId = this.getClassPropsValue.teacherId
        }
    }
    getTeacherDetails() {
        if (this.props.match.params.id) {
            const postValue: any = {
                page_no: 1,
                academic_year: 2021,
                teacher_id: this.props.match.params.id
            }
            this.props.fetchClassInchargeMappingPost(postValue);
        }
    }
   
    onSubmitClassIncharge = (values: any) => {
        let classIncharge:any = [];
        if(values){
            classIncharge = [values.ClassList]
        }
        if(classIncharge.length) {
            const ClassIncharge: any = {
                academic_year: '2021',
                teacher_id: this.teacherId,
                class_incharge: classIncharge
            }
            this.props.TeacherClassMappingPost(ClassIncharge)
        }
       
    }

    render() {
        const getClass: any = this.props.ClassNameList;
        let getClassNames:any
        if(this.props.records){
            this.props.records.forEach((items:any)=>{
                    if (this.props.ClassNameList.length) {                            
                        let getClassList =  this.props.ClassNameList.find((item:any)=> item.id === parseInt(items.class_id)) 
                        if(getClassList){
                            items['class_name'] = getClassList.grade_standard;
                        }                          
                      } 
            })
        }
        if(this.getClassPropsValue){
            getClassNames = parseInt(this.getClassPropsValue.class_id[0]);
        }
        const initialEditClassValues:EditClasslist = {
            ClassList:getClassNames
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
                                mainPageTitle={['Edit Mapping Subject']} />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card-box">
                                        <div className="card-head">
                                            <header>Edit Class Incharge Mapping</header>
                                            <div className="tools">
                                            </div>
                                        </div>
                                        { getClassNames ?
                                        <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Formik
                                                initialValues={initialEditClassValues}
                                                onSubmit={this.onSubmitClassIncharge}
                                                render={({
                                                    values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit, setFieldValue
                                                }: FormikProps<EditClasslist>) => (
                                                    <form onSubmit={handleSubmit} className="ui form">  
                                                    <div className="row">      
                                                            <div className="col-md-12 p-t-20">
                                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                <FormGroup>
                                                                {getClass?
                                                                <FormGroup>
                                                                <Field 
                                                                label='Section*'
                                                                name="ClassList"  
                                                                select
                                                                component={TextField}        
                                                                disabled={false}  
                                                                >
                                                                    {
                                                                        getClass.map( (item:any) => (
                                                                            <MenuItem value={item.id}>{item.grade_standard}</MenuItem>
                                                                        ))
                                                                    }
                                                                    
                                                                </Field>                         
                                                                </FormGroup>
                                                                 
                                                                    :null}
                                                                </FormGroup> 
                                                                </div>
                                                            </div>
                                                        </div>         
                                                        <div className="text-right mb-3 mr-2 mt-4">
                                                            <Button className="btn btn-pink mr-1 ml-1" type="submit">Submit</Button>
                                                            <Link to={`/teacher/${this.teacherId }`}><Button className="btn btn-default mr-1 ml-1">Cancel</Button></Link>
                                                        </div>
                                                    </form>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                :null}
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
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = (state: any, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        loading: state.teacher.loading,
        errorMessage: state.teacher.errors,
        getTeacherid: state.teacher.TeacherId,
        records: state.teacher.classRecords,
        ClassNameList: state.diary.gradelist
    };
}

export default connect(mapStateToProps, { fetchGetAllClassList, fetchTeacherPostId, fetchClassInchargeMappingPost, TeacherClassMappingPost })(EditClassInCharge)
