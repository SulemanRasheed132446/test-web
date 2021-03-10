import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ForgotOTPPost, ForgotResendOtp } from '../../store/authentication/Actions'
import { Button, TextField } from '@material-ui/core';
import { Field, Formik, Form } from 'formik';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';
import './Authentication.scss'
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index';
import history from '../../History';
import { formValidationPatten, FormInvalidMessage, FormvalidationMessage, formValidationSize, formValidationSizeMsg } from '../../services/Constants';
import { forgotOTPTypes } from '../../store/authentication/Types';

const initialForgotOTP: forgotOTPTypes = {
    otp:'',
    token:''
  }
  export type ForgotOTPFormProps = {
    ForgotOTPPost: (SentOtp: any) => void;
    ForgotResendOtp:(ResentOtp: any) => void;
      loading: boolean;
      getToken:any;
      reOpenAction:boolean;
  };
  interface OtpValue {
    showOTP:string,
    showOTPInput:boolean
}
export class ForgotOTPCheck extends Component<ForgotOTPFormProps, OtpValue> {
    constructor(props: any) {
        super(props); 
        this.state = {
            showOTP:'password',
            showOTPInput:true
        }
    }
    showOTP(getValue:any) {
        this.setState({
            showOTP: getValue.type,
            showOTPInput: getValue.show
          })
    }
    hideOTP(getValue:any) {
        this.setState({
            showOTP: getValue.type,
            showOTPInput: getValue.show
          })
    }
    backForgotPassword(){
        history.push("/forgot_password");
    }
    public SendOTP(){
        const resetSendOTP:any = {
        username:localStorage.getItem('ForgotPassword')
        }
        this.props.ForgotResendOtp(resetSendOTP);
        }
    render() {
        const { loading } = this.props;
        const loadingForgot = { display: loading ? "block" : "none" };
        const { showOTP, showOTPInput } = this.state;
        const getToken = localStorage.getItem('token');       
        if(getToken){
            history.push("/dashboard");
        }
        return (
            <div>
                <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100  formboxsize">
                        <Formik
                            validationSchema={
                                object({
                                    otp: string()
                                    .required(FormvalidationMessage.otpCode)
                                    .min(formValidationSize.otpMin, formValidationSizeMsg.otpMixMsg)
                                    .max(formValidationSize.otpMax, formValidationSizeMsg.otpMaxMsg)
                                    .matches(formValidationPatten.numberPatten,FormInvalidMessage.otpInvalid)
                                           })
                            }
                            initialValues={initialForgotOTP} onSubmit={(values, formikHelpers) => {    
                                const initialOTPSend: forgotOTPTypes = {
                                    otp: values.otp,
                                    token: localStorage.getItem('FORGOTTOKEN')
                                }                          
                                    this.props.ForgotOTPPost(initialOTPSend);    
                            }}>
                            {({ values, errors, isSubmitting, isValidating, dirty, touched }) => (
                                <Form>
                                    <span className="login100-form-logo logoprofileicon">
                                        <i className="fa fa-user-o" aria-hidden="true"></i>
                                    </span>
                                    <span className="login100-form-title p-b-20 p-t-20 mb-2 formtitlesize">
                                    Enter OTP
                                    </span>                                    
                                    <div className="wrap-input100 validate-input mt-4 mb-0" data-validate="Enter username">
                                        <Field
                                            type={showOTP}
                                            name="otp"
                                            as={TextField}
                                            placeholder="OTP*"
                                            className="input100"
                                        />
                                         <span className="focus-input100" data-placeholder="&#xf191;"></span>  
                                    </div>   
                                    {showOTPInput ? <div className="passwordopen"  
                                        onClick={() => this.showOTP({type:'text', show:false})} title="Show OTP">
                                            <i className="fa fa-eye" aria-hidden="true"></i></div> 
                                        : <div className="passwordopen"  
                                        onClick={() => this.hideOTP({type:'password', show:true})} title="Hidden OTP">
                                            <i className="fa fa-eye-slash" aria-hidden="true"></i></div>}                                  
                                        {errors.otp && touched.otp ? (
                                        <div className="errorlogin">{errors.otp}</div>
                                        ) : null}  
                                      
                                    <div className="container-login100-form-btn mt-5">                                      
                                        <div>
                                            <Button className="login100-form-btn " type="submit" disabled={!isValidating && !dirty}>Submit</Button>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mt-3">
                                    <div className="text-left p-t-30 text-center">
                                            <Link to={'#'} className="txt1" style={{ display: this.props.reOpenAction ? "inline-block" : "none" }}
                                            onClick={() => this.SendOTP()}>
                                            Resend OTP
                                            </Link>
                                            </div>
                                            <div className="text-left p-t-30 text-center">
                                            <Link to={'#'} className="txt1" onClick={() => this.backForgotPassword()}>
                                                    Back
                                            </Link>
                                            </div>
                                    </div> 
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <div style={loadingForgot}><SpinnerLoader/></div>
            </div>
        )
    }
}

const mapStateToProps = ({login}: RootState) => {
    return {
        loading: login.loading,
        getToken: login.items,
        reOpenAction: login.reOpenaction
    };
  };



export default connect(mapStateToProps, {ForgotOTPPost, ForgotResendOtp})(ForgotOTPCheck)
