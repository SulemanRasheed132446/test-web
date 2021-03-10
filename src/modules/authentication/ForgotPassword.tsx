import React, { Component } from 'react';
import { ForgotPasswordType } from '../../store/authentication/Types'
import { connect } from 'react-redux';
import { ForgetPasswordPost } from '../../store/authentication/Actions'
import { Button, TextField } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';
import './Authentication.scss'
import history from '../../History';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index'
import { formValidationPatten, FormvalidationMessage} from '../../services/Constants';

const initialForgotValues: ForgotPasswordType = {
  username:''
}
export type ForgotPasswordUserFormProps = {
    ForgetPasswordPost: (ForgotPasswordUserFormProps: ForgotPasswordType) => void;
    loading: boolean;
};

class ForgetPassword extends Component<ForgotPasswordUserFormProps> {   
    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        const getToken = localStorage.getItem('token');
        if(getToken) {
            history.push("/dashboard");
        } 
        if (!this.props.ForgetPasswordPost) {
            return null;
        }
        return (
            <div>
            <div className="limiter">
                <div className="container-login100">
                <div className="wrap-login100 formboxsize">
                        <Formik
                        validationSchema={
                            object({
                                username: string()
                                    .required(FormvalidationMessage.loginUser)
                            })
                        }
                            validate={(values:ForgotPasswordType) => {
                                const errors = {username: ''};
                                var intRegex = formValidationPatten.numberPatten;
                                if(values.username === '') {
                                    errors.username = 'Please enter a valid Email Id or Phone Number';
                                } 
                                else if (!Number.isNaN(Number(values.username[0]))) {
                                    if(intRegex.test(values.username)) {
                                   if((values.username.length !== 10) || (!intRegex.test(values.username)))
                                    {
                                        errors.username = 'Please enter a valid phone number.';
                                        return errors;
                                    }
                                
                                    }
                                }
                                
                                else{
                                        var eml = formValidationPatten.emailPatten;       
                                        if (eml.test(values.username) === false) {
                                            errors.username = 'Please enter a valid Email Id'
                                            return errors
                                        }
                                }
                                return {};
                        }}
                            initialValues={initialForgotValues} onSubmit={(values, formikHelpers) => {
                                return new Promise(res => {
                                    localStorage.setItem('ForgotPassword', values.username);
                                    this.props.ForgetPasswordPost(values);
                                })

                            }}>
                            {({ values, errors, isSubmitting, isValidating, touched, dirty }) => (
                                <Form>
                                    <span className="login100-form-logo logoprofileicon">
                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                    </span>
                                    <span className="login100-form-title p-b-20 p-t-20 mb-2 formtitlesize">
                                        Forgot Password
                                    </span>
                                    <div className="wrap-input100 validate-input mb-2" data-validate="Enter username">
                                    <Field
                                            type="text"
                                            name="username"
                                            as={TextField}
                                            placeholder="Email Id or Phone Number*"
                                            className="input100"
                                        />
                                        <span className="focus-input100" data-placeholder="&#xf207;"></span>
                                    </div>
                                    {errors.username && touched.username ? (
                                <div className="errorlogin">{errors.username}</div>
                                ) : null} 
                                    <div className="container-login100-form-btn mt-5">                                   
                                        <div>
                                            <Button className="login100-form-btn " type="submit" disabled={!isValidating && !dirty}>Send OTP</Button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 mt-3">
                                            <div className="text-left p-t-30 text-center">
                                            <Link to={'/'} className="txt1">
                                                    Back
                                            </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <div style={loadingTextCSS}><SpinnerLoader/></div>
            </div>
        );
    }
}

const mapStateToProps = ({login}: RootState) => {
    return {
        loading: login.loading
    };
  };

export default connect(
    mapStateToProps,
    { ForgetPasswordPost }
)(ForgetPassword);
