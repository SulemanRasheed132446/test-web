import React from 'react';
import { connect } from 'react-redux';
import { SubjectFieldsType, CategoryFieldsType, SubjectTypes } from '../../store/subject/Types';
import { RouteComponentProps } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb'
import history from '../../History';
import { RootState } from '../../store/Index';
import { fetchCategoryPost, fetchSubject, editSubject } from '../../store/subject/Actions'
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { SubjectValidation } from './SubjectValidation';

interface subjecteditField {
    getCategoryDetails: any;
    getAllCategoryDetails: any;
    getCategoryList: any;
    categoryData: any;
    electData: any;
    getAllSubjectDetails: any;
    getSubjectList: any;
    dataValue: any;
}
export interface PostsListProps extends RouteComponentProps<OwnPropsParams> {
    loading: boolean;
    subjectData: SubjectTypes;
    subjectIdList: SubjectTypes;
    categoryDetails: CategoryFieldsType[],
    editSubject: (subject: SubjectFieldsType) => void;
    fetchCategoryPost: () => void;
    fetchSubject: (id: number) => void;
    errorMessage: any;
}
type AllProps = PostsListProps & subjecteditField;
class EditSubject extends React.Component<AllProps> {
    formik:any;
    componentDidMount(): void {
        this.props.fetchCategoryPost();
        this.props.fetchSubject(Number(this.props.match.params.id));
    }
    componentDidUpdate() { 
        if(this.props.errorMessage.data){
            this.formik.setFieldError("name", this.props.errorMessage.data.name);
            this.formik.setFieldError("short_name", this.props.errorMessage.data.short_name);            
        }        
    }
    render() {
        const { loading } = this.props
        const loadingEditSubject = { display: loading ? "block" : "none" };
        const getToken = localStorage.getItem('token');
        if (!getToken) {
            history.push("/");
        }
        const getCategoryDetails:any = this.props.categoryDetails;
        let categorySubjectEdit: any;
        let dataValue: any;
        let shortName;
        let getname;
        let category;
        if (getCategoryDetails) {
            categorySubjectEdit = getCategoryDetails.data;
        }
        const getClassesList:any = this.props.subjectIdList;
        if (getClassesList) {
            dataValue = getClassesList;
            shortName = getClassesList.short_name;
            getname = getClassesList.name;
            category = getClassesList.category;
        }
        const initialSubjectEdit: any = {
            id: dataValue.id,
            SubjectSchoolId: dataValue.school_id,
            SubjectshortName: shortName,
            SubjectName: getname,
            SubjectCategory: category
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
                                mainPageTitle={['Edit Subject']} />
                            {shortName && getname && category && dataValue && categorySubjectEdit ?
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-box">
                                            <div className="card-head">
                                                <header>Edit Subject</header>
                                            </div>
                                            <div className="card-body">
                                            <Formik
                                 ref={node=>this.formik = node}
                                initialValues={initialSubjectEdit}
                                onSubmit={(values: SubjectFieldsType, actions) =>{
                                    const PostSubjectEdit: any = {
                                        id: dataValue.id,
                                        school_id: dataValue.SubjectSchoolId,
                                        short_name: values.SubjectshortName,
                                        name: values.SubjectName,
                                        category: values.SubjectCategory
                                    }
                                    this.props.editSubject(PostSubjectEdit)
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
                                                            name="SubjectName"
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
                                                                name="SubjectshortName"
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
                                                                name="SubjectCategory"
                                                                select
                                                                component={TextField}
                                                                className="textfield__input"
                                                                fullwidth="true"
                                                                disabled={false}
                                                            >
                                                                {categorySubjectEdit.map((item: any) => (
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
                                                !!(errors.name && touched.name)}  type="submit">Submit</Button>
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : <div><SpinnerLoader /></div>}
                        </div>
                    </div>
                </div>
                <div style={loadingEditSubject}><SpinnerLoader /></div>
            </div>

        );
    }
}

interface OwnPropsParams {
    id: string;
}
const mapStateToProps = ({ subjects }: RootState, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        categoryDetails: subjects.category,
        loading: subjects.loading,
        subjectData: subjects.items[Number(ownProps.match.params.id)],
        subjectIdList: subjects.items,
        errorMessage: subjects.errors
    };
};
export default connect(
    mapStateToProps, { editSubject, fetchCategoryPost, fetchSubject }
)(EditSubject);