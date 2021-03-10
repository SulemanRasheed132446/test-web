import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ResetPasswordType, ResetPassType } from '../../store/authentication/Types'
import { ResetPasswordPost } from '../../store/authentication/Actions'
import { Button, TextField } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import history from '../../History';
import './Authentication.scss'
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index'
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ResetValidation } from './ResetPasswordValidation';

const initialResetValues: ResetPassType = { 
    token:'',
    resetnewpassword : '',
    resetconfirmpassword : ''
}
interface ResetpasswordValue {
    showOTP:string,
    showOTPInput:boolean,
    showNewPassword:string,
    InputNewpassword:boolean,
    showConfirmPassword:string,
    InputConfirmPassword:boolean
}
interface ResetPasswordUserFormProps extends RouteComponentProps<OwnPropsParams> {
    ResetPasswordPost: (ForgotPasswordUserFormProps: ResetPasswordType) => void;
    loading: boolean;
};

class ResetPassword extends Component<ResetPasswordUserFormProps, ResetpasswordValue> { 
    constructor(props: any) {
        super(props);
        this.state = {
            showOTP:'password',
            showOTPInput:true,
            showNewPassword:'password',
            InputNewpassword:true,
            showConfirmPassword:'password',
            InputConfirmPassword:true,
        }
    }
    showOTPPassword(getValue:any) {
            this.setState({
                showOTP: getValue.type,
                showOTPInput: getValue.show
              }) 
    }
    showNewPassword(getValue:any) {
            this.setState({
                showNewPassword: getValue.type,
                InputNewpassword: getValue.show
              })
    }
    showConfirmPassword(getValue:any) {
        this.setState({
            showConfirmPassword: getValue.type,
            InputConfirmPassword: getValue.show
          })
}
    render() {      
        const { loading } = this.props;
        const { showNewPassword, InputNewpassword, showConfirmPassword, InputConfirmPassword  } = this.state;      
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
                            validationSchema={ResetValidation}
                            initialValues={initialResetValues} onSubmit={(values, formikHelpers) => {
                                const initialResetValues: ResetPasswordType = {
                                    token:localStorage.getItem('FORGOTTOKEN'),
                                    newpassword : values.resetnewpassword,
                                    confirmpassword : values.resetconfirmpassword
                                }
                                return new Promise(res => {
                                    this.props.ResetPasswordPost(initialResetValues)
                                })

                            }}>
                            {({ values, errors, isSubmitting, isValidating, touched, dirty }) => {
                            const isResetEmpty = (!values.resetnewpassword || !values.resetconfirmpassword);
                            return(
                                <Form>
                                    <span className="login100-form-logo logoprofileicon">
                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                    </span>
                                    <span className="login100-form-title p-b-20 p-t-20 mb-2 formtitlesize">
                                        Reset Password
                                    </span>
                                    <div className="wrap-input100 validate-input mb-2 mt-4">
                                    <Field
                                            type={showNewPassword}
                                            name="resetnewpassword"
                                            as={TextField}
                                            placeholder="New Password*"
                                            className="input100"
                                        />
                                        <span className="focus-input100" data-placeholder="&#xf191;"></span>
                                    </div>
                                    {InputNewpassword ? <div className="passwordopen"  
                                        onClick={() => this.showNewPassword({type:'text', show:false})} title="Show Password">
                                        <i className="fa fa-eye" aria-hidden="true"></i></div> 
                                        : <div className="passwordopen"  
                                        onClick={() => this.showNewPassword({type:'password', show:true})} title="Hidden Password">
                                        <i className="fa fa-eye-slash" aria-hidden="true"></i></div>}
                                    {errors.resetnewpassword && touched.resetnewpassword ? (
                                    <div className="errorlogin">{errors.resetnewpassword}</div>
                                    ) : null} 
                                    
                                    <div className="wrap-input100 validate-input mb-2 mt-4">
                                    <Field
                                            type={showConfirmPassword}
                                            name="resetconfirmpassword"
                                            as={TextField}
                                            placeholder="Confirm Password*"
                                            className="input100"
                                        />
                                        <span className="focus-input100" data-placeholder="&#xf191;"></span>
                                    </div>
                                    {InputConfirmPassword ? <div className="passwordopen"  
                                        onClick={() => this.showConfirmPassword({type:'text', show:false})} title="Show Confirm Password">
                                        <i className="fa fa-eye" aria-hidden="true"></i></div> 
                                        : <div className="passwordopen"  
                                        onClick={() => this.showConfirmPassword({type:'password', show:true})} title="Hidden Confirm Password">
                                        <i className="fa fa-eye-slash" aria-hidden="true"></i></div>}
                                    {errors.resetconfirmpassword && touched.resetconfirmpassword ? (
                                    <div className="errorlogin">{errors.resetconfirmpassword}</div>
                                    ) : null} 
                                    
                                    <div className="container-login100-form-btn mt-5 mb-3">
                                    { loading ? 
                                        <div>
                                            <SpinnerLoader/>
                                        </div> : 
                                        <div>
                                            <Button className="login100-form-btn " 
                                            type="submit" 
                                            disabled={isResetEmpty 
                                                || isValidating 
                                                || !dirty  
                                                || !!(errors.resetnewpassword && touched.resetnewpassword)||
                                                !!(errors.resetconfirmpassword && touched.resetconfirmpassword) }>Submit</Button>
                                        </div>
                                        }
                                    </div>   
                                    <div className="col-md-12 mt-3">
                                            <div className="text-left p-t-30 text-center">
                                            <Link to={'/forgot_password'} className="txt1">
                                                    Back
                                            </Link>
                                            </div>
                                    </div>                                
                                </Form>
                            )}
                        }
                        </Formik>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

interface OwnPropsParams {
    token: string;
}

const mapStateToProps = ({login}: RootState) => {
    return {
        loading: login.loading
    };
  };

export default connect(
    mapStateToProps,
    { ResetPasswordPost }
)(ResetPassword);