import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/Index';
import { addClassesPost, fetchGradePost, fetchGradeStandardPost } from '../../store/classes/Actions';
import { ClassesType, GradeFieldsType } from '../../store/classes/Type';
import BreadCrumb from '../../components/BreadCrumb';
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { ClassValidation } from './ClassValidation';

const initialAddValues: ClassesType = {
    grade: '',
    standard: ''
};

export type OwnClassesFormProps = {
    addClassesPost: (classes: ClassesType) => void;
    loading: boolean;
    fetchGradePost: (postValue:any) => any;
    fetchGradeStandardPost: () => any;
    categoryDetails: GradeFieldsType[];
    errorMessage: any;
    getStandarList:any;
};
class AddNewClasses extends React.Component<OwnClassesFormProps> {
    formikClass:any;
    componentDidMount(): void {
        const postValue = {
            academic_year:'2020'
        }
        this.props.fetchGradePost(postValue);
        this.props.fetchGradeStandardPost();
    }
    componentDidUpdate() { 
        if(this.props.errorMessage.length === undefined){
            this.formikClass.setFieldError("grade", this.props.errorMessage.data.grade);
            this.formikClass.setFieldError("standard", this.props.errorMessage.data.standard);            
        }        
    }
    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        const getGradeList: any = this.props.categoryDetails;
        let gradePoint: any;
        if (getGradeList) {
            gradePoint = getGradeList;
        }
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['Class']}
                                homeName={['Home']}
                                url={['dashboard']}
                                baseName={['Class']}
                                baseURL={['class']}
                                mainPageTitle={['Add Class']} />
                            {gradePoint && this.props.getStandarList ?
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-box">
                                            <div className="card-head">
                                                <header>Add Class</header>
                                            </div>
                                            <div className="card-body">
                                                <Formik
                                                ref={node=>this.formikClass = node}
                                                    initialValues={initialAddValues}
                                                    onSubmit={(values: ClassesType, actions) => {
                                                        this.props.addClassesPost(values)
                                                    }}
                                                    validationSchema={ClassValidation}
                                                    render={({
                                                        values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit
                                                    }: FormikProps<ClassesType>) => {
                                                        const isClassEmpty = (!values.grade || !values.standard);
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
                                                                                {gradePoint.map((item: GradeFieldsType) => (
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
                                                                                    this.props.getStandarList.map((item:any) => (
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
                                                                disabled={isClassEmpty || isValidating || !dirty ||
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
                                : <div><SpinnerLoader /></div>}
                        </div>
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        );
    }
}
const mapStateToProps = ({ classes }: RootState) => {
    return {
        categoryDetails: classes.gradelist,
        loading: classes.loading,
        errorMessage: classes.errors,
        getStandarList: classes.standardList
    };
};
export default connect(
    mapStateToProps, { addClassesPost, fetchGradePost, fetchGradeStandardPost }
)(AddNewClasses);