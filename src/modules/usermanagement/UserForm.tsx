import React from 'react';
import { userType, CategoryFieldsType } from '../../store/usermanage/Type';
import { Link } from 'react-router-dom';
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { Field, FieldProps, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { UserManageValidation } from './UserManageValidation';

export type OwnPostFormProps = {
    onSubmit: (AddClasses: userType) => void;
    initialValues: userType;
    currentPost?: any;
    categoryNameDetails: CategoryFieldsType | undefined;
    errorMessage?: any;
};

export type OwnInnerFieldProps = FieldProps<userType> & userType;

export const UserForm: React.FunctionComponent<OwnPostFormProps> = props => {
    const getGradeList = props.categoryNameDetails;
    let categoryUserAdd: any;
    if (getGradeList) {
        categoryUserAdd = props.categoryNameDetails;
    }
    return (
        <div>
            {categoryUserAdd ?
                <div className="row">
                    <div className="col-md-12">
                        <Formik
                            initialValues={props.initialValues}
                            onSubmit={(values: userType, actions) => {
                                props.onSubmit(values)
                            }}
                            validationSchema={UserManageValidation}
                            render={({
                                values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit
                            }: FormikProps<userType>) => {
                            const isUserEmpty = (!values.school_id 
                                || !values.role 
                                || !values.firstname 
                                || !values.lastname 
                                || !values.phone_number 
                                || !values.email_id);
                            return(
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <div className=" row">
                                            <div className="col-md-6 p-t-20">
                                                <div>
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-2">
                                                        <FormGroup>
                                                            <Field
                                                                label='School Name*'
                                                                name="school_id"
                                                                select
                                                                component={TextField}
                                                                className="textfield__input"
                                                                fullwidth="true"
                                                                disabled={false}
                                                            >
                                                                {categoryUserAdd.map((item: any) => (
                                                                    <MenuItem value={item.id}>{item.school_name}</MenuItem>
                                                                ))}
                                                            </Field>
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 p-t-20">
                                                <div>
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-2">
                                                        <FormGroup>
                                                            <Field
                                                                label='Role*'
                                                                name="role"
                                                                select
                                                                component={TextField}
                                                                className="textfield__input"
                                                                fullwidth="true"
                                                                disabled={false}
                                                            >
                                                                <MenuItem value='School Admin'>School Admin</MenuItem>
                                                            </Field>
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 p-t-20">
                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                    <FormGroup>
                                                        <Field
                                                            label='First Name*'
                                                            type="text"
                                                            name="firstname"
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
                                                                label='Last Name*'
                                                                type="text"
                                                                name="lastname"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={false}
                                                            />
                                                        </FormGroup>
                                                    </div>
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
                                                <div>
                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                        <FormGroup>
                                                            <Field
                                                                label='Email Id*'
                                                                type="text"
                                                                name="email_id"
                                                                component={TextField}
                                                                className="textfield__input"
                                                                disabled={false}
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right mb-3 mr-2 mt-4">
                                            <Button className="btn btn-pink mr-1 ml-1 w-15"
                                                 disabled={isUserEmpty || isValidating || !dirty ||
                                                    !!(errors.lastname && touched.lastname)||
                                                    !!(errors.phone_number && touched.phone_number) || 
                                                    !!(errors.email_id && touched.email_id) || 
                                                    !!(errors.lastname && touched.lastname) || 
                                                    !!(errors.role && touched.role) || 
                                                    !!(errors.school_id && touched.school_id)} type="submit">Submit</Button>
                                            <Link to="/user">
                                                <Button className="btn btn-default mr-1 ml-1 w-15">Cancel</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            )}
                        }
                        />
                    </div>
                </div>
                : <div><SpinnerLoader /></div>}
        </div>);
}