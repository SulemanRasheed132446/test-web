import React, { Component } from 'react';
import { SendOtpType } from '../../store/authentication/Types'
import { connect } from 'react-redux';
import { SendOtpRegister } from '../../store/authentication/Actions'
import { Button, TextField } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { object, string } from 'yup';
import './Authentication.scss'
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index';
import { formValidationPatten, FormvalidationMessage } from '../../services/Constants';
import { Link } from 'react-router-dom';
import history from '../../History';

const initialRgEmailValues: SendOtpType = {
    username: ''
}

export type RegisterPostProps = {
    SendOtpRegister: (sendOtp: SendOtpType) => void;
    loading: boolean
};

class UserRegister extends Component<RegisterPostProps> {
    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        const getToken = localStorage.getItem('token');
        localStorage.setItem('username', '');
        if(getToken){
            history.push("/dashboard");
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
                            validate={(values:SendOtpType) => {
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
                            initialValues={initialRgEmailValues} onSubmit={(values, formikHelpers) => {
                                localStorage.setItem('notregister', values.username);
                                return new Promise(res => {
                                    this.props.SendOtpRegister(values);
                                })
    
                            }}>
                            {({ values, errors, isSubmitting, isValidating, dirty, touched }) => (
                                <Form>
                                    <span className="login100-form-logo logoprofileicon">
                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                    </span>
                                    <span className="login100-form-title p-b-20 p-t-20 mb-2 formtitlesize">
                                    Welcome!
                                    <p className="whitecolor mt-2">Register your account</p>
                                    </span>
                                    <div className="wrap-input100 validate-input mt-4 mb-0" data-validate="Enter username">
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
                                            <Button className="login100-form-btn " type="submit" disabled={!isValidating && !dirty}>Submit</Button>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-md-12 mt-3">
                                        <div className="text-left text-center">
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
    mapStateToProps,{SendOtpRegister}
)(UserRegister);