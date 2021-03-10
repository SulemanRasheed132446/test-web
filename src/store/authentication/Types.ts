export interface LoginType extends ApiResponse {
  username: string
  password: string
  rememberme: boolean
  browser_uid?: string
}

  export type ApiResponse = Record<string, any>

  export enum LoginTypeActionTypes {
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
    LOGIN_ERROR = 'LOGIN_ERROR',
    CHECKUSER_REQUEST = 'CHECKUSER_REQUEST',
    CHECKUSER_SUCCESS = 'CHECKUSER_SUCCESS',
    CHECKUSER_ERROR = 'CHECKUSER_ERROR',
    SEND_OTP_REQUEST = 'SEND_OTP_REQUEST',
    SEND_OTP_SUCCESS = 'SEND_OTP_SUCCESS',
    SEND_OTP_ERROR = 'SEND_OTP_ERROR',
    VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST',
    VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS',
    VERIFY_OTP_ERROR = 'VERIFY_OTP_ERROR',
    confirm_PASSWORD_OTP_REQUEST = 'confirm_PASSWORD_REQUEST',
    confirm_PASSWORD_SUCCESS = 'confirm_PASSWORD_SUCCESS',
    confirm_PASSWORD_ERROR = 'confirm_PASSWORD_ERROR'
  }

  export interface UserDetails {
    name: string
    recent_login: string
    usertype: number
    browser_uuid: string
    userActive: number
    token: string
    tokenexp: string
    appname: string
    appurl: string
  }

  export interface AuthState {
    loading: boolean;
    items: {};
    isAuthenticated: boolean | null;
    reOpenaction?:boolean | null;
  }

  // This variable used forgot pasword types
  export interface ForgotPasswordType extends ApiForgotPasswordResponse {
    username:string
  }

  export interface AuthForgotPasswordState {
    loading: boolean
    data: ForgotPasswordType[]
  }

  export interface forgotOTPTypes {
    otp: string,
    token: string | null
  }
  export type ApiForgotPasswordResponse = Record<string, any>

    // This variable used reset pasword types
    export interface ResetPasswordType extends ApiResetPasswordResponse {
      token:string | null
      newpassword:string
      confirmpassword:string
    }
  
    export interface AuthResetPasswordState {
      loading: boolean
     data: ResetPasswordType[]
    }
  
    export interface ResetPassType {
      token:string
      resetnewpassword:string
      resetconfirmpassword:string
    }
    export type ApiResetPasswordResponse = Record<string, any>
    
    // This variable used logout user
    export interface logoutType extends ApiLogoutResponse {
      token:string
    }
  
    export interface AuthLogoutdState {
      loading: boolean
      data: logoutType[]
    }
  
    export type ApiLogoutResponse = Record<string, any>

    export interface LoginUserType {
      username:string
    }

    export interface LoginPassswordType {
      username:string | null;
      password:string;
      browser_uid?: string;
    }

    export interface RegisterType {
      token?:string | null;
      newPassword:string;
      confirmPassword:string;
    }

    export interface SendOtpType {
      username:string;
    }

    export interface VerifiyOtpType {
      username:string | null;
      otp:string;
    }