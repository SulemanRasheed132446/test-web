import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { Button, FormGroup } from '@material-ui/core';
import { Field, Formik, FormikProps } from 'formik';
import { TextField } from 'formik-material-ui';
import { TeacherType } from '../../store/teacher/Type';
import { TeacherValidation } from './TeacherValidation';

export type OwnAddTeacherFormProps = {
    onSubmit: (AddStudent: any) => void;
    initialValues: any;
    currentPost?: any;
};

export class AddTeacherForm extends React.Component<OwnAddTeacherFormProps> {
    
    render() {

        return (
            <div>
                 <div className="row">
                    <div className="col-md-12">
                        <Formik
                            initialValues={this.props.initialValues}
                            validationSchema={TeacherValidation}
                            onSubmit={(values: any, actions) => {
                                const initialTeacherValue:TeacherType = {
                                    firstname: values.teacherfirstname,
                                    lastname: values.teacherlastname,
                                    email_id: values.teacheremailid,
                                    phone_number: values.teacherphonenumber,
                                    role: 'Teacher',
                                    id: values.id,
                                    ldap_id: values.ldap_id,
                                    timezone: 'Asia/Kolkata'
                                }
                                this.props.onSubmit(initialTeacherValue)
                            }}
                            render={({
                                values, errors, isSubmitting, isValidating, dirty, touched, handleSubmit
                            }: FormikProps<any>) => {
                                
                                const isEmpty = (!values.teacherfirstname || !values.teacherlastname || !values.teacheremailid || !values.teacherphonenumber);
                                return (
                                <form onSubmit={handleSubmit}>
                                    <div>                                       
                                        <div className="row">
                                            <div className="col-md-6 p-t-20">
                                                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                    <FormGroup>
                                                        <Field
                                                            label='First Name*'
                                                            type="text"
                                                            name="teacherfirstname"
                                                            component={TextField}
                                                            className="textfield__input"
                                                            isValid={touched.teacherfirstname && !errors.teacherfirstname}
                                                            isInvalid={touched.teacherfirstname && errors.teacherfirstname}
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
                                                                name="teacherlastname"
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
                                                            name="teacherphonenumber"
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
                                                                name="teacheremailid"
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
                                                disabled={isEmpty || isValidating || 
                                                !!(errors.teacheremailid && touched.teacheremailid)|| 
                                                !!(errors.teacherphonenumber && touched.teacherphonenumber)|| 
                                                !!(errors.teacherlastname && touched.teacherlastname) || 
                                                !!(errors.teacherfirstname && touched.teacherfirstname)} type="submit">Submit</Button>
                                            <Link to="/teacher">
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
            </div>
        )
    }
}

const mapStateToProps = (state:any) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTeacherForm)
