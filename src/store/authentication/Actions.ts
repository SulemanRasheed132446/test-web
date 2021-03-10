import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import history from '../../History';
import { baseAPIAuth } from '../../Service';
import { RootState, RootActions } from '../Index';
import { LoginTypeActionTypes, ForgotPasswordType, ResetPasswordType, LoginUserType, LoginPassswordType, SendOtpType, VerifiyOtpType, RegisterType} from './Types'
import { AUTHAPI } from '../../services/Config'
import toaster from "toasted-notes";
import { notificationMsg } from '../../services/Constants'
import { NonAuthRoutes } from '../../router/Roles'
//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

//Send otp value
interface ActionSendOtp {
    type: LoginTypeActionTypes.SEND_OTP_REQUEST;
}

interface ActionSendOtpSuccess {
    type: LoginTypeActionTypes.SEND_OTP_SUCCESS;
    payload: SendOtpType;
}

interface ActionSendOtpFail {
    type: LoginTypeActionTypes.SEND_OTP_ERROR;
}


export const SendOtpRegister = (SendOtp: SendOtpType): ThunkResult<void> => async dispatch => {
    handleSendOtp(dispatch);    
    try {
        const response: AxiosResponse<SendOtpType> = await baseAPIAuth.post(AUTHAPI.GENERATOTP, SendOtp);  
        const getResponse = JSON.parse(JSON.stringify(response.data));     
          if(getResponse.status === true) {
            handleSendOtpSuccess(dispatch, getResponse.data);
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
            });
            history.push('/otp');          
          } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleSendOtpFail(dispatch);
          }       
    } catch (e) {
        handleSendOtpFail(dispatch);
    }
};

const handleSendOtp = (dispatch: Dispatch<ActionSendOtp>) => {
    dispatch({ type: LoginTypeActionTypes.SEND_OTP_REQUEST });
};

const handleSendOtpSuccess = (
    dispatch: Dispatch<ActionSendOtpSuccess>,
    response: SendOtpType
) => {
    dispatch({ type: LoginTypeActionTypes.SEND_OTP_SUCCESS, payload: response });   
};

const handleSendOtpFail = (dispatch: Dispatch<ActionSendOtpFail>) => {
        setTimeout(() => {
            dispatch({type: LoginTypeActionTypes.SEND_OTP_ERROR }); 
}, notificationMsg.duration);
    
};

//Send otp value
interface ActionReSendOtp {
    type: LoginTypeActionTypes.SEND_OTP_REQUEST;
}

interface ActionReSendOtpSuccess {
    type: LoginTypeActionTypes.SEND_OTP_SUCCESS;
    payload: SendOtpType;
}

interface ActionReSendOtpFail {
    type: LoginTypeActionTypes.SEND_OTP_ERROR;
}


export const ForgotResendOtp = (SendOtp: SendOtpType): ThunkResult<void> => async dispatch => {
    handleReSendOtp(dispatch);    
    try {
        const response: AxiosResponse<SendOtpType> = await baseAPIAuth.post(AUTHAPI.FORGOTPASSWORD, SendOtp);  
        const getResponse = JSON.parse(JSON.stringify(response.data));     
          if(getResponse.status === true) {
            localStorage.setItem('FORGOTTOKEN', getResponse.data.token)
            handleReSendOtpSuccess(dispatch, getResponse.data);
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
            });        
          } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleReSendOtpFail(dispatch);
          }       
    } catch (e) {
        handleReSendOtpFail(dispatch);
    }
};

const handleReSendOtp = (dispatch: Dispatch<ActionReSendOtp>) => {
    dispatch({ type: LoginTypeActionTypes.SEND_OTP_REQUEST });
};

const handleReSendOtpSuccess = (
    dispatch: Dispatch<ActionReSendOtpSuccess>,
    response: SendOtpType
) => {
    dispatch({ type: LoginTypeActionTypes.SEND_OTP_SUCCESS, payload: response });   
};

const handleReSendOtpFail = (dispatch: Dispatch<ActionReSendOtpFail>) => {
        setTimeout(() => {
            dispatch({type: LoginTypeActionTypes.SEND_OTP_ERROR }); 
}, notificationMsg.duration);
    
};
//check OTP details
interface ActionVerifyOtp {
    type: LoginTypeActionTypes.VERIFY_OTP_REQUEST;
}

interface ActionVerifyOtpSuccess {
    type: LoginTypeActionTypes.VERIFY_OTP_SUCCESS;
    payload: VerifiyOtpType;
}

interface ActionVerifyOtpFail {
    type: LoginTypeActionTypes.VERIFY_OTP_ERROR;
}

export const VerifyOtpRegister = (SendOtp: VerifiyOtpType): ThunkResult<void> => async dispatch => {
    handleVerifyOtp(dispatch);    
    try {
        const response: AxiosResponse<VerifiyOtpType> = await baseAPIAuth.post(AUTHAPI.OTPCHECK, SendOtp);  
        const getResponse = JSON.parse(JSON.stringify(response.data));
          if(getResponse.status === true) {
            localStorage.setItem('OTPTOKEN', getResponse.data.token);
            handleVerifyOtpSuccess(dispatch, getResponse.data);
            history.push('/password');          
          } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleVerifyOtpFail(dispatch);
          }       
    } catch (e) {
        handleVerifyOtpFail(dispatch);
    }
};

const handleVerifyOtp = (dispatch: Dispatch<ActionVerifyOtp>) => {
    dispatch({ type: LoginTypeActionTypes.VERIFY_OTP_REQUEST });
};

const handleVerifyOtpSuccess = (
    dispatch: Dispatch<ActionVerifyOtpSuccess>,
    response: VerifiyOtpType
) => {
    dispatch({ type: LoginTypeActionTypes.VERIFY_OTP_SUCCESS, payload: response });   
};

const handleVerifyOtpFail = (dispatch: Dispatch<ActionVerifyOtpFail>) => {
        setTimeout(() => {
            dispatch({type: LoginTypeActionTypes.VERIFY_OTP_ERROR }); 
}, notificationMsg.duration);
    
};


//check OTP details
interface ActionUserPassword {
    type: LoginTypeActionTypes.confirm_PASSWORD_OTP_REQUEST;
}

interface ActionUserPasswordSuccess {
    type: LoginTypeActionTypes.confirm_PASSWORD_SUCCESS;
    payload: RegisterType;
}

interface ActionUserPasswordFail {
    type: LoginTypeActionTypes.confirm_PASSWORD_ERROR;
}


export const UserPasswordRegister = (SendOtp: RegisterType): ThunkResult<void> => async dispatch => {
    handleUserPassword(dispatch);    
    try {
        const response: AxiosResponse<RegisterType> = await baseAPIAuth.post(AUTHAPI.REGISTERUSER, SendOtp, 
            { headers: {"Authorization" : localStorage.getItem('OTPTOKEN')} });  
        const getResponse = JSON.parse(JSON.stringify(response.data));     
          if(getResponse.status === true) {
            handleUserPasswordSuccess(dispatch, getResponse.data);
            history.push('/');  
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });        
          } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleUserPasswordFail(dispatch);
          }       
    } catch (e) {
        handleUserPasswordFail(dispatch);
    }
};

const handleUserPassword = (dispatch: Dispatch<ActionUserPassword>) => {
    dispatch({ type: LoginTypeActionTypes.confirm_PASSWORD_OTP_REQUEST });
};

const handleUserPasswordSuccess = (
    dispatch: Dispatch<ActionUserPasswordSuccess>,
    response: RegisterType
) => {
    dispatch({ type: LoginTypeActionTypes.confirm_PASSWORD_SUCCESS, payload: response });   
};

const handleUserPasswordFail = (dispatch: Dispatch<ActionUserPasswordFail>) => {
        setTimeout(() => {
            dispatch({type: LoginTypeActionTypes.confirm_PASSWORD_ERROR }); 
}, notificationMsg.duration);
    
};


//check OTP details
interface ActionForgotOTP {
    type: LoginTypeActionTypes.confirm_PASSWORD_OTP_REQUEST;
}

interface ActionForgotOTPSuccess {
    type: LoginTypeActionTypes.confirm_PASSWORD_SUCCESS;
    payload: any;
}

interface ActionForgotOTPFail {
    type: LoginTypeActionTypes.confirm_PASSWORD_ERROR;
}


export const ForgotOTPPost = (SendOtp: RegisterType): ThunkResult<void> => async dispatch => {
    handleForgotOTP(dispatch);    
    try {
        const response: AxiosResponse<RegisterType> = await baseAPIAuth.patch(AUTHAPI.FORGOTPASSWORD, SendOtp, 
            { headers: {"Authorization" : localStorage.getItem('OTPTOKEN')} });  
        const getResponse = JSON.parse(JSON.stringify(response.data));   
          if(getResponse.status === true) {
            localStorage.setItem('FORGOTTOKEN', getResponse.data.token)
            handleForgotOTPSuccess(dispatch, getResponse.data);
            history.push('/reset_password');  
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });        
          } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleForgotOTPFail(dispatch);
          }       
    } catch (e) {
        handleForgotOTPFail(dispatch);
    }
};

const handleForgotOTP = (dispatch: Dispatch<ActionForgotOTP>) => {
    dispatch({ type: LoginTypeActionTypes.confirm_PASSWORD_OTP_REQUEST });
};

const handleForgotOTPSuccess = (
    dispatch: Dispatch<ActionForgotOTPSuccess>,
    response: any
) => {
    dispatch({ type: LoginTypeActionTypes.confirm_PASSWORD_SUCCESS, payload: response });   
};

const handleForgotOTPFail = (dispatch: Dispatch<ActionForgotOTPFail>) => {
        setTimeout(() => {
            dispatch({type: LoginTypeActionTypes.confirm_PASSWORD_ERROR }); 
}, notificationMsg.duration);
    
};

//check use details
interface ActionCheckUser {
    type: LoginTypeActionTypes.CHECKUSER_REQUEST;
}

interface ActionCheckUserSuccess {
    type: LoginTypeActionTypes.CHECKUSER_SUCCESS;
    payload: LoginUserType;
}

interface ActionCheckUserFail {
    type: LoginTypeActionTypes.CHECKUSER_ERROR;
}


export const CheckLoginUser = (CheckLoginUsers: LoginUserType): ThunkResult<void> => async dispatch => {
    handleCheckUser(dispatch);    
    try {
        const response: AxiosResponse<LoginUserType> = await baseAPIAuth.post(AUTHAPI.CHECKUSER, CheckLoginUsers);  
        const getResponse = JSON.parse(JSON.stringify(response.data));     
          if(getResponse.status === true) {
            handleCheckUserSuccess(dispatch, getResponse.data);
              if(getResponse.data.is_registered === true){               
                localStorage.setItem('username', getResponse.data.username);
                history.push('/login');
              } else {                
                toaster.notify(getResponse.message, {
                    position: 'top', 
                    duration: notificationMsg.duration
                });
                history.push('/register');
              }
          
          } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleCheckUserFail(dispatch);
          }       
    } catch (e) {
        handleCheckUserFail(dispatch);        
        toaster.notify('Server Side Issues', {
            position: 'top', 
            duration: notificationMsg.duration
          });
    }
};

const handleCheckUser = (dispatch: Dispatch<ActionCheckUser>) => {
    dispatch({ type: LoginTypeActionTypes.CHECKUSER_REQUEST });
};

const handleCheckUserSuccess = (
    dispatch: Dispatch<ActionCheckUserSuccess>,
    response: LoginUserType
) => {
    dispatch({ type: LoginTypeActionTypes.CHECKUSER_SUCCESS, payload: response });   
};

const handleCheckUserFail = (dispatch: Dispatch<ActionCheckUserFail>) => {
        setTimeout(() => {
            dispatch({type: LoginTypeActionTypes.CHECKUSER_ERROR }); 
}, notificationMsg.duration);
    
};

// login use action
interface ActionLogin {
    type: LoginTypeActionTypes.LOGIN_REQUEST;
}

interface ActionLoginSuccess {
    type: LoginTypeActionTypes.LOGIN_SUCCESS;
    payload: LoginPassswordType;
}

interface ActionLoginFail {
    type: LoginTypeActionTypes.LOGIN_ERROR;
}


export const loginUser = (LoginUsers: LoginPassswordType): ThunkResult<void> => async dispatch => {
    handleLoginUser(dispatch);    
    try {
        const response: AxiosResponse<LoginPassswordType> = await baseAPIAuth.post(AUTHAPI.LOGIN, LoginUsers);  
        const getResponse = JSON.parse(JSON.stringify(response.data));  
          if(getResponse.status === true) {
            localStorage.removeItem("username");
            handleLoginSuccess(dispatch, response.data);
            localStorage.setItem('usertype', getResponse.data.usertype);
            localStorage.setItem('token', getResponse.data.token);
            history.push('/dashboard');
          } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
            handleLoginFail(dispatch);
          }       
    } catch (e) {
        handleLoginFail(dispatch);
    }
};

const handleLoginUser = (dispatch: Dispatch<ActionLogin>) => {
    dispatch({ type: LoginTypeActionTypes.LOGIN_REQUEST });
};

const handleLoginSuccess = (
    dispatch: Dispatch<ActionLoginSuccess>,
    response: LoginPassswordType
) => {
    dispatch({ type: LoginTypeActionTypes.LOGIN_SUCCESS, payload: response });   
};

const handleLoginFail = (dispatch: Dispatch<ActionLoginFail>) => {
        setTimeout(() => {
            dispatch({type: LoginTypeActionTypes.LOGIN_ERROR }); 
}, notificationMsg.duration);
    
};

//This is the function used to forgotpassword trigger

interface ActionForgotPassword {
    type: LoginTypeActionTypes.LOGIN_REQUEST;
}

interface ActionForgotPasswordSuccess {
    type: LoginTypeActionTypes.LOGIN_SUCCESS;
    payload: ForgotPasswordType;
}

interface ActionForgotPasswordFail {
    type: LoginTypeActionTypes.LOGIN_ERROR;
}

export const ForgetPasswordPost = (ForgotPasswordType: ForgotPasswordType): ThunkResult<void> => async dispatch => {
    handleForgotPasswordUser(dispatch);    
    try {
        const response: AxiosResponse<ForgotPasswordType> = await baseAPIAuth.post(AUTHAPI.FORGOTPASSWORD, ForgotPasswordType);
          if(response.data.status === true) {
            toaster.notify(response.data.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              localStorage.setItem('FORGOTTOKEN', response.data.data.token)
              history.push(NonAuthRoutes.ForgotOTP);
            handleForgotPasswordSuccess(dispatch, response.data);
          } else {
            toaster.notify(response.data.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
            handleForgotPasswordFail(dispatch);
          }
    } catch (e) {
        handleForgotPasswordFail(dispatch);
    }
};

const handleForgotPasswordUser = (dispatch: Dispatch<ActionForgotPassword>) => {
    dispatch({ type: LoginTypeActionTypes.LOGIN_REQUEST });
};

const handleForgotPasswordSuccess = (
    dispatch: Dispatch<ActionForgotPasswordSuccess>,
    response: ForgotPasswordType
) => {
    dispatch({ type: LoginTypeActionTypes.LOGIN_SUCCESS, payload: response });    
};

const handleForgotPasswordFail = (dispatch: Dispatch<ActionForgotPasswordFail>) => {
    setTimeout(() => {
        dispatch({ type: LoginTypeActionTypes.LOGIN_ERROR });
        history.push(NonAuthRoutes.forgotpassword);
    }, notificationMsg.duration);
    
};


//This is the function used to forgotpassword trigger

interface ActionResetPassword {
    type: LoginTypeActionTypes.LOGIN_REQUEST;
}

interface ActionResetPasswordSuccess {
    type: LoginTypeActionTypes.LOGIN_SUCCESS;
    payload: ResetPasswordType;
}

interface ActionResetPasswordFail {
    type: LoginTypeActionTypes.LOGIN_ERROR;
}

export const ResetPasswordPost = (ResetPasswordType: ResetPasswordType): ThunkResult<void> => async dispatch => {
    handleResetPasswordUser(dispatch);    
    try {
        const response: AxiosResponse<ResetPasswordType> = await baseAPIAuth.post(AUTHAPI.RESETPASSWORD, ResetPasswordType);
          if(response.data.status === true) {
            toaster.notify(response.data.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
            handleResetPasswordSuccess(dispatch, response.data);
          } else {
            toaster.notify(response.data.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
            handleResetPasswordFail(dispatch);
          }
    } catch (e) {
        handleResetPasswordFail(dispatch);
    }
};

const handleResetPasswordUser = (dispatch: Dispatch<ActionResetPassword>) => {
    dispatch({ type: LoginTypeActionTypes.LOGIN_REQUEST });
};

const handleResetPasswordSuccess = (
    dispatch: Dispatch<ActionResetPasswordSuccess>,
    response: ResetPasswordType
) => {
    dispatch({ type: LoginTypeActionTypes.LOGIN_SUCCESS, payload: response });
    history.push('/');
};

const handleResetPasswordFail = (dispatch: Dispatch<ActionResetPasswordFail>) => {
    setTimeout(() => {
        dispatch({ type: LoginTypeActionTypes.LOGIN_ERROR });
    }, notificationMsg.duration);
    
};

//This is the function used to Logout trigger

interface ActionLogout {
    type: LoginTypeActionTypes.LOGIN_REQUEST;
}

interface ActionLogoutSuccess {
    type: LoginTypeActionTypes.LOGOUT_SUCCESS;
    payload: ForgotPasswordType;
}

interface ActionLogoutFail {
    type: LoginTypeActionTypes.LOGIN_ERROR;
}

export const LogoutPost = (): ThunkResult<void> => async dispatch => {
    handleLogoutUser(dispatch);    
    try {
        const response: AxiosResponse<ForgotPasswordType> = await baseAPIAuth.get(AUTHAPI.LOGOUT, { headers: {"Authorization" : localStorage.getItem('token')} });
          if(response.data.status === true) {
            toaster.notify(response.data.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
            handleLogoutSuccess(dispatch, response.data);          
            localStorage.clear();
            history.push('/');
          } else {
            localStorage.clear();
            history.push('/');
            handleLogoutFail(dispatch);
          }
    } catch (e) {
        handleLogoutFail(dispatch);
    }
};

const handleLogoutUser = (dispatch: Dispatch<ActionLogout>) => {
    dispatch({ type: LoginTypeActionTypes.LOGIN_REQUEST });
};

const handleLogoutSuccess = (
    dispatch: Dispatch<ActionLogoutSuccess>,
    response: ForgotPasswordType
) => {
    dispatch({ type: LoginTypeActionTypes.LOGOUT_SUCCESS, payload: response });
    history.push('/');
};


const handleLogoutFail = (dispatch: Dispatch<ActionLogoutFail>) => {
    dispatch({ type: LoginTypeActionTypes.LOGIN_ERROR });
    history.push('/dashboard');
};

export type LoginAction = 
                        | ActionLogin 
                        | ActionLoginSuccess 
                        | ActionLoginFail 
                        | ActionForgotPassword 
                        | ActionForgotPasswordSuccess 
                        | ActionForgotPasswordFail
                        | ActionLogout
                        | ActionLogoutSuccess
                        | ActionLogoutFail
                        | ActionReSendOtp
                        | ActionReSendOtpSuccess
                        | ActionReSendOtpFail
                        | ActionForgotOTP
                        | ActionForgotOTPSuccess
                        | ActionForgotOTPFail
                        | ActionSendOtp
                        | ActionSendOtpSuccess
                        | ActionSendOtpFail;