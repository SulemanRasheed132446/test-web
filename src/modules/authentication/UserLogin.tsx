import React, { Component } from 'react';
import { LoginUserType } from '../../store/authentication/Types'
import { connect } from 'react-redux';
import { CheckLoginUser } from '../../store/authentication/Actions'
import { Button, TextField } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { object, string } from 'yup';
import history from '../../History';
import { Link } from 'react-router-dom';
import './Authentication.scss'
import { formValidationPatten, FormvalidationMessage } from '../../services/Constants';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index';

const initialUserLogin: LoginUserType = {
    username: ''
}

export type LoginPostProps = {
    CheckLoginUser: (LoginPostType: LoginUserType) => void;
    loading: boolean
};

class UserLogin extends Component<LoginPostProps> {   

    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        const loginUser = localStorage.getItem('username');
        if(loginUser){
            history.push("/login");
        } 
        const getToken = localStorage.getItem('token');
        if(getToken){
            history.push("/dashboard");
        }
        return (
            <div>
            {/* <SpinnerLoader/> */}
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
                        validate={(values:LoginUserType) => {
                                const errors = {username: ''};
                                var intRegex = formValidationPatten.phoneRegExp;
                                if(values.username === '') {
                                    errors.username = 'Please enter a valid Email Id or phone number';
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
                        initialValues={initialUserLogin} 
                        onSubmit={(values, formikHelpers) => {
                            return new Promise(res => {
                                this.props.CheckLoginUser(values);
                            })

                        }}>
                        {({ values, errors, isSubmitting, isValidating, dirty, touched }) => {
                        const isUserEmpty = (!values.username);
                        return(
                            <Form>
                                <span className="login100-form-logo logoprofileicon">
                                    <i className="fa fa-user-o" aria-hidden="true"></i>
                                </span>
                                <span className="login100-form-title p-b-20 p-t-20 mb-2 formtitlesize">
                                Login
                                </span>
                                <div className="wrap-input100 validate-input mb-0" data-validate="Enter username">
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
                                        <Button className="login100-form-btn " type="submit" disabled={ isUserEmpty ||
                                            isValidating ||
                                            !!(errors.username && touched.username)
                                        } >Next</Button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 mt-3">
                                        <div className="text-left text-center">
                                            <Link to={'/forgot_password'} className="txt1">
                                            Forgot Password?
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )}
                    }
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
    mapStateToProps,{ CheckLoginUser }
)(UserLogin);