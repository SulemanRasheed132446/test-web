import React, { Component } from 'react';
import { RegisterType } from '../../store/authentication/Types'
import { connect } from 'react-redux';
import { UserPasswordRegister } from '../../store/authentication/Actions'
import { Button, TextField } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import './Authentication.scss'
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index';
import { registerPassword } from './authValidation';
import { Link } from 'react-router-dom';
import history from '../../History';

const initialRegisterValues: RegisterType = {
    token: '',
    newPassword:'',
    confirmPassword:''
}
interface RegisterBarState {
    showNewPassword:string,
    showNewInput:boolean,
    showConfirmPassword:string,
    showConfirmInput:boolean,
}
export type RegisterPassworPostProps = {
    UserPasswordRegister: (LoginPostType: RegisterType) => void;
    loading: boolean
};

class UserRegisterPassword extends Component<RegisterPassworPostProps, RegisterBarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            showNewPassword:'password',
            showNewInput:true,
            showConfirmPassword:'password',
            showConfirmInput:true
        }
    }
    showNewPassword(getValue:any) {
        this.setState({
            showNewPassword: getValue.type,
            showNewInput: getValue.show
          })
    }
    showConfirmPassword(getValue:any) {
        this.setState({
            showConfirmPassword: getValue.type,
            showConfirmInput: getValue.show
          })
    }
    render() {
        const { loading } = this.props;
        const { showNewPassword, showNewInput, showConfirmPassword, showConfirmInput } = this.state; 
        const getToken = localStorage.getItem('token');
        if(getToken){
            history.push("/dashboard");
        }
        return (
            <div>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100 formboxsize">
                        <Formik
                            validationSchema={registerPassword}
                            initialValues={initialRegisterValues} onSubmit={(values, formikHelpers) => {
                                const initialValuesList: any ={
                                    token: localStorage.getItem('OTPTOKEN'),
                                    newpassword:values.newPassword,
                                    confirmpassword:values.confirmPassword
                                }
                                return new Promise(res => {
                                    this.props.UserPasswordRegister(initialValuesList);
                                })
    
                            }}>
                            {({ values, errors, isSubmitting, isValidating, dirty, touched }) => (
                                <Form>
                                    <span className="login100-form-logo logoprofileicon">
                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                    </span>
                                    <span className="login100-form-title p-b-20 p-t-20 mb-2 formtitlesize">
                                    Welcome!
                                    <p className="whitecolor mt-2">Register your Password</p>
                                    </span>
                                    <div className="wrap-input100 validate-input user mt-4 mb-0" data-validate="Enter username">
                                        <Field
                                            type={showNewPassword}
                                            name="newPassword"
                                            as={TextField}
                                            placeholder="Password*"
                                            className="input100"
                                        />                                    
                                        <span className="focus-input100" data-placeholder="&#xf191;"></span>    
                                    </div>
                                    {showNewInput ? <div className="passwordopen"  
                                        onClick={() => this.showNewPassword({type:'text', show:false})} title="Show Password">
                                            <i className="fa fa-eye" aria-hidden="true"></i></div> 
                                        : <div className="passwordopen"  
                                        onClick={() => this.showNewPassword({type:'password', show:true})} title="Hidden Password">
                                            <i className="fa fa-eye-slash" aria-hidden="true"></i></div>}
                                    {errors.newPassword && touched.newPassword ? (
                                <div className="errorlogin">{errors.newPassword}</div>
                                ) : null} 
                                  
                                    <div className="wrap-input100 validate-input user mt-4 mb-0" data-validate="Enter username">
                                        <Field
                                            type={showConfirmPassword}
                                            name="confirmPassword"
                                            as={TextField}
                                            placeholder="Confirm Password*"
                                            className="input100"
                                        />                                    
                                        <span className="focus-input100" data-placeholder="&#xf191;"></span>    
                                    </div>
                                    {showConfirmInput ? <div className="passwordopen"  
                                        onClick={() => this.showConfirmPassword({type:'text', show:false})} title="Show Confirm Password">
                                            <i className="fa fa-eye" aria-hidden="true"></i></div> 
                                        : <div className="passwordopen"  
                                        onClick={() => this.showConfirmPassword({type:'password', show:true})} title="Hidden Confirm Password">
                                            <i className="fa fa-eye-slash" aria-hidden="true"></i></div>}
                                    {errors.confirmPassword && touched.confirmPassword ? (
                                <div className="errorlogin">{errors.confirmPassword}</div>
                                ) : null} 
                                  
                                    <div className="container-login100-form-btn mt-5">
                                        { loading ? 
                                        <div>
                                            <SpinnerLoader/>
                                        </div> : 
                                        <div>
                                            <Button className="login100-form-btn" type="submit" disabled={!isValidating && !dirty}>Submit</Button>
                                        </div>
                                        }                                        
                                    </div>
                                    <div className="text-left text-center">
                                            <Link to={'/register'} className="txt1">
                                            Back
                                            </Link>
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

const mapStateToProps = ({login}: RootState) => {
    return {
        loading: login.loading
    };
  };

export default connect(
    mapStateToProps,{UserPasswordRegister}
)(UserRegisterPassword);