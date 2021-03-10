import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { EditClassesPost, fetchGradePost, fetchClassesIdPost, fetchGradeStandardPost } from '../../store/classes/Actions';
import { ClassesType, GradeFieldsType} from '../../store/classes/Type';
import { RootState } from '../../store/Index';
import BreadCrumb from '../../components/BreadCrumb';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { ClassValidation } from './ClassValidation';

interface PostEditProps extends RouteComponentProps<OwnPropsParams> {
    classes: ClassesType;
    getClassesDetail:ClassesType;
    fetchGradePost:(postValue:any) => void;
    fetchGradeStandardPost:() => any;
    fetchClassesIdPost: (id: number) => void;
    EditClassesPost: (classes: ClassesType) => void;
    getGrade:GradeFieldsType[];
    loading: boolean;
    errorMessage: any;
    StandardList:GradeFieldsType[];
}
class EditClasses extends  React.Component<PostEditProps> {
    formikClassEdit:any;
    componentDidMount(): void {
        const postValue = {
            academic_year:'2020'
        }
        this.props.fetchGradePost(postValue);
        this.props.fetchGradeStandardPost();
        this.props.fetchClassesIdPost(Number(this.props.match.params.id));       
    }
    componentDidUpdate() { 
        if(this.props.errorMessage.length === undefined){
            this.formikClassEdit.setFieldError("grade", this.props.errorMessage.data.grade);
            this.formikClassEdit.setFieldError("standard", this.props.errorMessage.data.standard);            
        }        
    }
    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };   
        const getClassesList:any = this.props.getClassesDetail;      
        const getGradeList:any = this.props.getGrade;
        const getStandardList:any = this.props.StandardList;
        let gradeValue;
        let getstandard;
        let getId;
        let gradePointEdit:any;
        let standardData:any
        if(getGradeList) {
            gradePointEdit  = getGradeList;
        }
        if(getStandardList) {
            standardData = getStandardList;
        }
       if(getClassesList) {
        gradeValue = getClassesList.grade;
        getstandard = getClassesList.standard;
        getId = getClassesList.id
       }
        const initialEditValues: ClassesType = {
            id: getId,
            grade : gradeValue,
            standard : getstandard
        };
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb titleName={['class']} 
                            homeName={['Home']} url={['dashboard']} 
                            baseName={['Class']} baseURL={['class']} 
                            mainPageTitle={['Edit Class']}/>
                            {gradePointEdit && gradeValue && getstandard && standardData ?   
                        <div className="row">
                        <div className="col-md-12">
                            <div className="card-box">
                            <div className="card-head">
                            <header>Edit Class</header>
                            </div>
                            <div className="card-body">
                            <Formik
                                ref={node=>this.formikClassEdit = node}
                                    initialValues={initialEditValues}
                                    onSubmit={(values: ClassesType, actions) => {
                                        this.props.EditClassesPost(values)
                                    }}
                                    validationSchema={ClassValidation}
                                    render={({
                                        values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit
                                    }: FormikProps<ClassesType>) => {
                                        const isClassEditEmpty = (!values.grade || !values.standard);
                                    return(
                                        <form onSubmit={handleSubmit} className="ui form">
                                            <div className="row">
                                                <div className="col-md-6 p-t-20">
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>
                                                            <Field
                                                                label='Class*'
                                                                name="grade"
                                                                select
                                                                component={TextField}
                                                                disabled={false}
                                                            >
                                                                {gradePointEdit.map((item: GradeFieldsType) => (
                                                                    <MenuItem value={item.value}>{item.value}</MenuItem>
                                                                ))
                                                                }
                                                            </Field>
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 p-t-20">
                                                    <div className="mdl-textfield mdl-js-textfield  mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>
                                                            <Field
                                                                label='Section*'
                                                                name="standard"
                                                                select
                                                                component={TextField}
                                                                disabled={false}
                                                            >
                                                                {
                                                                    standardData.map((item:any) => (
                                                                        <MenuItem value={item.value}>{item.value}</MenuItem>
                                                                    ))
                                                                }

                                                            </Field>
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right mb-3 mr-2 mt-4">
                                                <Button className="btn btn-pink mr-1 ml-1 w-15" 
                                                 disabled={isClassEditEmpty || isValidating || !dirty ||
                                                    !!(errors.standard && touched.standard)||
                                                    !!(errors.grade && touched.grade) }  
                                                type="submit">Submit</Button>
                                                <Link to="/class"><Button className="btn btn-default mr-1 ml-1 w-15">Cancel</Button></Link>
                                            </div>
                                        </form>
                                    )}
                                }
                                />                              
                            </div>
                        </div>
                        </div>
                    </div>
                    : <div><SpinnerLoader/></div>}
                        </div>
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader/></div>
            </div>
        );
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = ({classes}: RootState, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
    classes:classes.items[Number(ownProps.match.params.id)],
    getClassesDetail:classes.items,
    getGrade: classes.gradelist,
    loading:classes.loading,
    errorMessage: classes.errors,
    StandardList: classes.standardList
    };
  };
export default connect(
    mapStateToProps,{ fetchClassesIdPost, EditClassesPost, fetchGradePost, fetchGradeStandardPost }
)(EditClasses);