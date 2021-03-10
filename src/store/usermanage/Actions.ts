import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../Index';
import { AxiosResponse } from 'axios';
import history from '../../History';
import { userType, UserActionTypes, CategoryFieldsType } from './Type';
import { notificationMsg } from '../../services/Constants'
import toaster from "toasted-notes";
import { baseAPI, baseAPIAuth } from '../../Service';
import {  USERNAMENAGE } from '../../services/Config'
import { LoadMoreType } from '../../components/type';

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

// Fetch user management
interface FetchUser {
    type: UserActionTypes.FETCH_USER;
}

interface FetchUserSuccess {
    type: UserActionTypes.FETCH_USER_SUCCESS;
    payload: userType;
}

interface FetchUserFail {
    type: UserActionTypes.FETCH_USER_FAIL;
}
export const fetchUserPost = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchUser(dispatch);
    try {
        const response: AxiosResponse<userType> = await baseAPIAuth.get(USERNAMENAGE.GETUSER, { 
            params:loadMoreType,
            headers: {"Authorization" : localStorage.getItem('token')} 
        });
       
        handleFetchUserSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchUserFail(dispatch);
    }
};

export const handleFetchUser = (dispatch: Dispatch<FetchUser>) => {
    dispatch({ type: UserActionTypes.FETCH_USER });
};

export const handleFetchUserSuccess = (
    dispatch: Dispatch<FetchUserSuccess>,
    response: any
) => {
    dispatch({
        type: UserActionTypes.FETCH_USER_SUCCESS,
        payload: response,
        records: response.data.records,
        per_page: response.data.per_page,
        page: response.data.page,
        total: response.data.total
    });
    
};

export const handleFetchUserFail = (dispatch: Dispatch<FetchUserFail>) => {
    dispatch({
        type: UserActionTypes.FETCH_USER_FAIL
    });
};

// Fetch category

interface FetchCategory {
    type: UserActionTypes.FETCH_USER_CATEGORY;
}

interface FetchCategorySuccess {
    type: UserActionTypes.FETCH_USER_SUCCESS_CATEGORY;
    payload: CategoryFieldsType;
}

interface FetchCategoryFail {
    type: UserActionTypes.FETCH_USER_FAIL_CATEGORY;
}

export const fetchCategoryPost = (): ThunkResult<void> => async dispatch => {
    handleFetchCategory(dispatch);
    try {
        const response: AxiosResponse<CategoryFieldsType> = await baseAPI.get(USERNAMENAGE.GETSCHOOLCATEGORY, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        handleFetchCategorySuccess(dispatch, response.data);
    } catch (e) {
        handleFetchCategoryFail(dispatch);
    }
};

export const handleFetchCategory = (dispatch: Dispatch<FetchCategory>) => {
    dispatch({ type: UserActionTypes.FETCH_USER_CATEGORY });
};

export const handleFetchCategorySuccess = (
    dispatch: Dispatch<FetchCategorySuccess>,
    response: CategoryFieldsType
) => {
    dispatch({
        type: UserActionTypes.FETCH_USER_SUCCESS_CATEGORY,
        payload: response
    });
    
};

export const handleFetchCategoryFail = (dispatch: Dispatch<FetchCategoryFail>) => {
    dispatch({
        type: UserActionTypes.FETCH_USER_FAIL_CATEGORY
    });
};

// Fetch User Management Id
interface FetchUserId {
    type: UserActionTypes.FETCH_USER_ID;
}

interface FetchUserSuccessId {
    type: UserActionTypes.FETCH_USER_SUCCESS_ID;
    payload: userType;
}

interface FetchUserFailId {
    type: UserActionTypes.FETCH_USER_FAIL_ID;
}

export const fetchUserPostId = (id:string): ThunkResult<void> => async dispatch => {
    handleFetchUserId(dispatch);
    try {
        const response: AxiosResponse<userType> = await baseAPIAuth.get(`/auth/user/?id=${id}`, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        handleFetchUserSuccessId(dispatch, response.data);
    } catch (e) {
        handleFetchUserFailId(dispatch);
    }
};

export const handleFetchUserId = (dispatch: Dispatch<FetchUserId>) => {
    dispatch({ type: UserActionTypes.FETCH_USER_ID });
};

export const handleFetchUserSuccessId = (
    dispatch: Dispatch<FetchUserSuccessId>,
    response: userType
) => {
    dispatch({
        type: UserActionTypes.FETCH_USER_SUCCESS_ID,
        payload: response
    });
    
};

export const handleFetchUserFailId = (dispatch: Dispatch<FetchUserFailId>) => {
    dispatch({
        type: UserActionTypes.FETCH_USER_FAIL_ID
    });
};

// Add Classes
interface AddUser {
    type: UserActionTypes.ADD_USER;
}

interface AddUserSuccess {
    type: UserActionTypes.ADD_USER_SUCCESS;
    payload: userType;
}

interface AddUserFail {
    type: UserActionTypes.ADD_USER_FAIL;
}

export const AddUserPost = (userManage:userType): ThunkResult<void> => async dispatch => {
    handleAddUser(dispatch);
    try {
        const response: AxiosResponse<userType> = await baseAPIAuth.post(USERNAMENAGE.USERMANAGE, userManage, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleAddUserSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleAddUserFail(dispatch);
        }
       
    } catch (e) {
        handleAddUserFail(dispatch);
    }
};

export const handleAddUser = (dispatch: Dispatch<AddUser>) => {
    dispatch({ type: UserActionTypes.ADD_USER });
};

export const handleAddUserSuccess = (
    dispatch: Dispatch<AddUserSuccess>,
    response: userType
) => {
    dispatch({
        type: UserActionTypes.ADD_USER_SUCCESS,
        payload: response
    });
    history.push('/user');
};

export const handleAddUserFail = (dispatch: Dispatch<AddUserFail>) => {
    dispatch({
        type: UserActionTypes.ADD_USER_FAIL
    });
};

// Edit User management
interface EditUser {
    type: UserActionTypes.EDIT_USER;
}

interface EditUserSuccess {
    type: UserActionTypes.EDIT_USER_SUCCESS;
    payload: userType;
}

interface EditUserFail {
    type: UserActionTypes.EDIT_USER_FAIL;
}

export const EditUserPost = (userManage:userType): ThunkResult<void> => async dispatch => {
    handleEditUser(dispatch);
    try {
        const response: AxiosResponse<userType> = await baseAPIAuth.put(`/auth/user/?id=${userManage.ldap_id}`, userManage, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === "true"){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleEditUserSuccess(dispatch, response.data);
              history.push('/user');  
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleEditUserFail(dispatch);
        }
    } catch (e) {
        handleEditUserFail(dispatch);
    }
};

export const handleEditUser = (dispatch: Dispatch<EditUser>) => {
    dispatch({ type: UserActionTypes.EDIT_USER });
};

export const handleEditUserSuccess = (
    dispatch: Dispatch<EditUserSuccess>,
    response: userType
) => {
    dispatch({
        type: UserActionTypes.EDIT_USER_SUCCESS,
        payload: response
    });  
    history.push('/user');  
};

export const handleEditUserFail = (dispatch: Dispatch<EditUserFail>) => {
    dispatch({
        type: UserActionTypes.EDIT_USER_FAIL
    });
};

// DELETE USER MANAGE

interface DeleteUser {
    type: UserActionTypes.DELETE_USER;
}

interface DeleteUserSuccess {
    type: UserActionTypes.DELETE_USER_SUCCESS;
    payload: userType;
}

interface DeleteUserFail {
    type: UserActionTypes.DELETE_USER_FAIL;
}

export const deletePost = ( deletedId: any ): ThunkResult<void> => async dispatch => {
    const getDeleteValue = { "is_active" : deletedId.isActive } 
    handleDeleteUser(dispatch);
    try {
        const response: AxiosResponse<userType> = await baseAPIAuth.patch(`/auth/user/?id=${deletedId.ldapId}`, getDeleteValue, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleDeleteUserSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleDeleteUserFail(dispatch);
        }
       
    } catch (e) {
        handleDeleteUserFail(dispatch);
    }
};

const handleDeleteUser = (dispatch: Dispatch<DeleteUser>) => {
    dispatch({ type: UserActionTypes.DELETE_USER });
};

const handleDeleteUserSuccess = (
    dispatch: Dispatch<DeleteUserSuccess>,
    response: userType
) => {
    dispatch({ type: UserActionTypes.DELETE_USER_SUCCESS, payload: response });
};
const handleDeleteUserFail = (dispatch: Dispatch<DeleteUserFail>) => {
    dispatch({ type: UserActionTypes.DELETE_USER_FAIL });
};

export type UserAction =
    | FetchUser
    | FetchUserSuccess
    | FetchUserFail
    | FetchUserId
    | FetchUserSuccessId
    | FetchUserFailId
    | EditUser
    | EditUserSuccess
    | EditUserFail
    | DeleteUser
    | DeleteUserSuccess
    | DeleteUserFail
    | AddUser
    | AddUserSuccess
    | AddUserFail;