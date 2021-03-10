import React, { Component } from 'react';
import { LoginPassswordType } from '../../store/authentication/Types'
import { connect } from 'react-redux';
import { loginUser } from '../../store/authentication/Actions'
import { Button, TextField } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';
import './Authentication.scss'
import { FormvalidationMessage } from '../../services/Constants';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index';
import { v4 as uuidv4 } from 'uuid';
import history from '../../History';

const initialLoginValues: LoginPassswordType = {
    username: '',
    password: '',
    browser_uid: "1234567"
}
interface LoginBarState {
    openPassword:string,
    showInput:boolean
}
export type LoginPostProps = {
    loginUser: (LoginPostType: LoginPassswordType) => void;
    loading: boolean
};

class UserLoginPassword extends Component<LoginPostProps, LoginBarState>  {
    constructor(props: any) {
        super(props);
        this.state = {
            openPassword:'password',
            showInput:true
        }
    }
    showPassword(getValue:any) {
        this.setState({
            openPassword: getValue.type,
            showInput: getValue.show
          })
    }
    hidePassword(getValue:any) {
        this.setState({
            openPassword: getValue.type,
            showInput: getValue.show
          })
    }
    public goBack() {
        localStorage.setItem('username', '');
        history.push("/");
    }
    render() {
        const { loading } = this.props;        
        const { openPassword, showInput } = this.state;
        const getToken = localStorage.getItem('token');
        if(getToken){
            history.push("/dashboard");
        }
        if(localStorage.getItem('username') === null) {
            history.push("/");
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
                                        password: string()
                                            .required(FormvalidationMessage.failuserpass)
                                    })
                                }
                                initialValues={initialLoginValues} onSubmit={(values, formikHelpers) => {
                                    const getSendValues: LoginPassswordType = {
                                        username: localStorage.getItem('username'),
                                        password: values.password,
                                        browser_uid: uuidv4()
                                    }
                                    return new Promise(res => {
                                        this.props.loginUser(getSendValues);
                                    })

                                }}>
                                {({ values, errors, isSubmitting, isValidating, dirty, touched }) => (
                                    <Form>
                                        <span className="login100-form-logo logoprofileicon">
                                            <i className="fa fa-user-o" aria-hidden="true"></i>
                                        </span>
                                        <span className="login100-form-title p-b-20 p-t-20 mb-2 formtitlesize">
                                        Login
                                        </span>
                                        <div className="wrap-input100 validate-input mb-0" data-validate="Enter username">
                                            <Field
                                                type={openPassword}
                                                name="password"
                                                as={TextField}
                                                placeholder="Password*"
                                                className="input100"
                                            />
                                            <span className="focus-input100" data-placeholder="&#xf191;"></span>
                                        </div>
                                        {showInput ? <div className="passwordopen"  
                                        onClick={() => this.showPassword({type:'text', show:false})} title="Show Password">
                                            <i className="fa fa-eye" aria-hidden="true"></i></div> 
                                        : <div className="passwordopen"  
                                        onClick={() => this.showPassword({type:'password', show:true})} title="Hidden Password">
                                            <i className="fa fa-eye-slash" aria-hidden="true"></i></div>}
                                        {errors.password && touched.password ? (
                                            <div className="errorlogin">{errors.password}</div>
                                        ) : null}
                                      
                                        <div className="container-login100-form-btn mt-5">
                                            {loading ?
                                                <div>
                                                    <SpinnerLoader />
                                                </div> :
                                                <div>
                                                    <Button className="login100-form-btn" type="submit" 
                                                    disabled={!isValidating && !dirty}>Login</Button>
                                                </div>
                                            }
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mt-3">
                                                <div className="text-center">
                                                    <Link to={'/forgot_password'} className="txt1">
                                                        Forgot Password?
                                            </Link>
                                                </div>
                                                <div className="text-center">
                                                    <Link to={'#'} className="txt1" onClick={() => this.goBack()}>
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
            </div>
        );
    }
}
const mapStateToProps = ({ login }: RootState) => {
    return {
        loading: login.loading
    };
};

export default connect(
    mapStateToProps, { loginUser }
)(UserLoginPassword);