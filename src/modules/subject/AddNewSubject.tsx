import React from 'react';
import { connect } from 'react-redux';
import { SubjectFieldsType, CategoryFieldsType } from '../../store/subject/Types'
import { fetchCategoryPost, addSubject } from '../../store/subject/Actions'
import BreadCrumb from '../../components/BreadCrumb'
import history from '../../History';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { SubjectValidation } from './SubjectValidation';

const initialSchoolAdd: SubjectFieldsType = {
    category: '',
    short_name: '',
    school_id: '',
    created_by: '',
    name: '',
    subject_name: ''
}
export type OwnSubjectFormProps = {
    categoryDetails: CategoryFieldsType[],
    addSubject: (subject: SubjectFieldsType) => void;
    fetchCategoryPost: () => void;
    loading: boolean;
    errorMessage: any;
};
class AddNewSubject extends React.Component<OwnSubjectFormProps> {
    formik:any;
    componentDidMount(): void {
        this.props.fetchCategoryPost();
    }
    componentDidUpdate() { 
        if(this.props.errorMessage.status === false){
            this.formik.setFieldError("name", this.props.errorMessage.data.name);
            this.formik.setFieldError("short_name", this.props.errorMessage.data.short_name);            
        }        
    }
    render() {
        const { loading } = this.props
        const loadingNewSubject = { display: loading ? "block" : "none" };
        const getToken = localStorage.getItem('token');
        if (!getToken) {
            history.push("/");
        }
        const getCategoryDetails:any = this.props.categoryDetails;
        const getCategoryList = getCategoryDetails;
        let categorySubjectData:any;
        if(getCategoryList){
            categorySubjectData = getCategoryList.data;
        }        
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb 
                            titleName={['Subject']} 
                            homeName={['Home']} 
                            url={['dashboard']} 
                            baseName={['Subject']} 
                            baseURL={['subject']} 
                            mainPageTitle={['Add Subject']} />
                            <div className="row">
                                <div className="col-md-12">
                             <div className="card-box">
                                <div className="card-head">
                                    <header>Add Subject</header>
                                </div>
                                <div className="card-body">
                            { categorySubjectData ?                                 
                                <Formik
                                ref={node=>this.formik = node}
                                initialValues={initialSchoolAdd}
                                onSubmit={(values: SubjectFieldsType, actions) =>{
                                    this.props.addSubject(values)
                                }}
                                validationSchema={SubjectValidation}
                                render={({
                                    values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit
                                }: FormikProps<SubjectFieldsType>) => {
                                const isEmpty = (!values.name || !values.short_name || !values.category);
                                return(
                                    <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className="row">
                                            <div className="col-md-6 p-t-20">

                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                    <FormGroup>
                                                        <Field
                                                            label='Subject Name*'
                                                            type="text"
                                                            name="name"
                                                            component={TextField}
                                                            className="textfield__input"
                                                            disabled={false}
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="col-md-6 p-t-20">
                                                <div>
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>
                                                            <Field
                                                                label='Short Name*'
                                                                type="text"
                                                                name="short_name"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={false}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" row">
                                            <div className="col-md-6 p-t-20">
                                                <div>
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-2">
                                                        <FormGroup>
                                                            <Field
                                                                label='Category*'
                                                                name="category"
                                                                select
                                                                component={TextField}
                                                                className="textfield__input"
                                                                fullwidth="true"
                                                                disabled={false}
                                                            >
                                                                {categorySubjectData.map((item: any) => (
                                                                    <MenuItem value={item.value}>{item.value}</MenuItem>
                                                                ))}
                                                            </Field>
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right mb-3 mr-2 mt-4">
                                            <Button 
                                            className="btn btn-pink mr-1 ml-1" 
                                            disabled={isEmpty || isValidating || !dirty ||
                                                !!(errors.category && touched.category)||
                                                !!(errors.short_name && touched.short_name) || 
                                                !!(errors.name && touched.name)} type="submit">Submit</Button>
                                            <Link to="/subject">
                                            <Button 
                                            className="btn btn-default mr-1 ml-1 ">Cancel</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                                )}
                            }
                                />                                         
                                : <div><SpinnerLoader/></div>}
                                </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={loadingNewSubject}><SpinnerLoader /></div>
            </div>

        );
    }
}
const mapStateToProps = (state: any) => {
    return {
        categoryDetails: state.subjects.category,
        loading: state.subjects.loading,
        errorMessage: state.subjects.errors
    };
};
export default connect(
    mapStateToProps, { fetchCategoryPost, addSubject }
)(AddNewSubject);



