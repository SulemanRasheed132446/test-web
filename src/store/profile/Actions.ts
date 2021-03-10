import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../Index';
import { AxiosResponse } from 'axios';
import { baseAPIAuth } from '../../Service';
import { AUTHAPI } from '../../services/Config'
import { ProfileActionTypes, ProfilelDetailsType } from './Types'
import history from '../../History';

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

interface FetchProfile {
    type: ProfileActionTypes.FETCH_PROFILE;
}

interface FetchProfileSuccess {
    type: ProfileActionTypes.FETCH_PROFILE_SUCCESS;
    payload: ProfilelDetailsType;
}

interface FetchProfileFail {
    type: ProfileActionTypes.FETCH_PROFILE_FAIL;
}

export const fetchProfilePost = (): ThunkResult<void> => async dispatch => {
    handleFetchProfile(dispatch);
    try {
        const response: AxiosResponse<ProfilelDetailsType> = await baseAPIAuth.get(AUTHAPI.PROFILE, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getProfileDetails:any = response.data;
        if(getProfileDetails.status === true) {
            handleFetchProfileSuccess(dispatch, response.data);
        } else if(getProfileDetails.status === false && getProfileDetails.message === 'Invalid token') {
            localStorage.clear();
            history.push('/');
            handleFetchProfileFail(dispatch);
        } else {
            handleFetchProfileFail(dispatch);
        }        
    } catch (e) {
        handleFetchProfileFail(dispatch);
    }
};


export const handleFetchProfile = (dispatch: Dispatch<FetchProfile>) => {
    dispatch({ type: ProfileActionTypes.FETCH_PROFILE });
};

export const handleFetchProfileSuccess = (
    dispatch: Dispatch<FetchProfileSuccess>,
    response: ProfilelDetailsType
) => {
    dispatch({
        type: ProfileActionTypes.FETCH_PROFILE_SUCCESS,
        payload: response,
        schoolId:response.data.school_id,
        profileData:response.data
    });
    
};

export const handleFetchProfileFail = (dispatch: Dispatch<FetchProfileFail>) => {
    dispatch({
        type: ProfileActionTypes.FETCH_PROFILE_FAIL
    });
};

// This is the function used to validation for token
interface TokenValidation {
    type: ProfileActionTypes.TOKEN_VALIDATION_REQUEST;
}

interface TokenValidationSuccess {
    type: ProfileActionTypes.TOKEN_VALIDATION_SUCCESS;
    payload: any;
}

interface TokenValidationFail {
    type: ProfileActionTypes.TOKEN_VALIDATION_ERROR;
}

export const TokenValidationPost = (): ThunkResult<void> => async dispatch => {
    handleTokenValidation(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPIAuth.get(AUTHAPI.CHECKTOKENVALIDATION, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        handleTokenValidationSuccess(dispatch, response.data);
    } catch (e) {
        handleTokenValidationFail(dispatch);
    }
};


export const handleTokenValidation = (dispatch: Dispatch<TokenValidation>) => {
    dispatch({ type: ProfileActionTypes.TOKEN_VALIDATION_REQUEST });
};

export const handleTokenValidationSuccess = (
    dispatch: Dispatch<TokenValidationSuccess>,
    response: any
) => {
    dispatch({
        type: ProfileActionTypes.TOKEN_VALIDATION_SUCCESS,
        payload: response
    });
    
};

export const handleTokenValidationFail = (dispatch: Dispatch<TokenValidationFail>) => {
    dispatch({
        type: ProfileActionTypes.TOKEN_VALIDATION_ERROR
    });
};

export type ProfileAction =
    | FetchProfile
    | FetchProfileSuccess
    | FetchProfileFail;