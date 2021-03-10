import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../Index';
import { AxiosResponse } from 'axios';
import history from '../../History';
import { baseAPI } from '../../Service';
import { SCHOOLMANAGE } from '../../services/Config'
import { SchoolsActionTypes, SchoolDetailsType } from './Types'
import toaster from "toasted-notes";
import { notificationMsg } from '../../services/Constants'
import { LoadMoreType } from '../../components/type';
import { UserRoles } from '../../services/Constants';

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

interface FetchSchools {
    type: SchoolsActionTypes.FETCH_SCHOOLS;
}

interface FetchSchoolsSuccess {
    type: SchoolsActionTypes.FETCH_SCHOOLS_SUCCESS;
    payload: SchoolDetailsType;
}

interface FetchSchoolsFail {
    type: SchoolsActionTypes.FETCH_SCHOOLS_FAIL;
}

export const fetchSchoolsPost = (loadMoreType: LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchSchools(dispatch);
    try {
        const response: AxiosResponse<SchoolDetailsType> = await baseAPI.get(SCHOOLMANAGE.SCHOOLMANAGEVIEW, {
            params: loadMoreType,
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
        handleFetchSchoolsSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchSchoolsFail(dispatch);
    }
};

export const handleFetchSchools = (dispatch: Dispatch<FetchSchools>) => {
    dispatch({ type: SchoolsActionTypes.FETCH_SCHOOLS });
};

export const handleFetchSchoolsSuccess = (
    dispatch: Dispatch<FetchSchoolsSuccess>,
    response: SchoolDetailsType
) => {
    dispatch({
        type: SchoolsActionTypes.FETCH_SCHOOLS_SUCCESS,
        payload: response,
        records: response.data.records,
        per_page: response.data.per_page,
        page: response.data.page,
        total: response.data.total
    });

};

export const handleFetchSchoolsFail = (dispatch: Dispatch<FetchSchoolsFail>) => {
    dispatch({
        type: SchoolsActionTypes.FETCH_SCHOOLS_FAIL
    });
};

// FETCH SCHOOL edit details

interface FetchSchool {
    type: SchoolsActionTypes.FETCH_SCHOOL_ID;
}

interface FetchSchoolSuccess {
    type: SchoolsActionTypes.FETCH_SCHOOL_SUCCESS_ID;
    payload: SchoolDetailsType;
}

interface FetchSchoolFail {
    type: SchoolsActionTypes.FETCH_SCHOOL_FAIL_ID;
}

export const fetchSchool = (id: number): ThunkResult<void> => async dispatch => {
    handleFetchSchool(dispatch);
    try {
        const response: AxiosResponse<SchoolDetailsType> = await baseAPI.get(`/api/school/${id}/`, 
        { headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchSchoolSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchSchoolFail(dispatch);
    }
};

export const handleFetchSchool = (dispatch: Dispatch<FetchSchool>) => {
    dispatch({ type: SchoolsActionTypes.FETCH_SCHOOL_ID });
};

const handleFetchSchoolSuccess = (
    dispatch: Dispatch<FetchSchoolSuccess>,
    response: SchoolDetailsType
) => {
    dispatch({
        type: SchoolsActionTypes.FETCH_SCHOOL_SUCCESS_ID,
        payload: response
    });
};

const handleFetchSchoolFail = (dispatch: Dispatch<FetchSchoolFail>) => {
    dispatch({
        type: SchoolsActionTypes.FETCH_SCHOOL_FAIL_ID
    });
};

// ADD SCHOOL

interface AddSchool {
    type: SchoolsActionTypes.ADD_SCHOOL;
}

interface AddSchoolSuccess {
    type: SchoolsActionTypes.ADD_SCHOOL_SUCCESS;
    payload: SchoolDetailsType;
}

interface AddSchoolFail {
    type: SchoolsActionTypes.ADD_SCHOOL_FAIL;
    payload: any;
}

export const addSchool = (school: SchoolDetailsType): ThunkResult<void> => async dispatch => {
    handleAddSchool(dispatch);

    try {
        const response: AxiosResponse<SchoolDetailsType> = await baseAPI.post(SCHOOLMANAGE.SCHOOLMANAGEVIEW, school,
            { headers: { "Authorization": localStorage.getItem('token') } });
        if (response.data.status === true) {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleAddSchoolSuccess(dispatch, response.data);
        } else {
            if (response.data) {
                const mapError = response.data.data.latitude + "Latitude and Longitude";
                if (response.data.data.latitude) {
                    toaster.notify(mapError, {
                        position: 'top',
                        duration: notificationMsg.duration
                    });
                }
            }
            handleAddSchoolFail(dispatch, response.data);
        }
    } catch (e) {
        handleAddSchoolFail(dispatch, e);
    }
};

const handleAddSchool = (dispatch: Dispatch<AddSchool>) => {
    dispatch({ type: SchoolsActionTypes.ADD_SCHOOL });
};

const handleAddSchoolSuccess = (
    dispatch: Dispatch<AddSchoolSuccess>,
    response: SchoolDetailsType
) => {
    dispatch({ type: SchoolsActionTypes.ADD_SCHOOL_SUCCESS, payload: response });
    history.push('/school');
};

const handleAddSchoolFail = (dispatch: Dispatch<AddSchoolFail>, response: any) => {
    setTimeout(() => {
        dispatch({ type: SchoolsActionTypes.ADD_SCHOOL_FAIL, payload: response });
    }, notificationMsg.duration);
};

// EDIT SCHOOL

interface EditSchool {
    type: SchoolsActionTypes.EDIT_SCHOOL;
}

interface EditSchoolSuccess {
    type: SchoolsActionTypes.EDIT_SCHOOL_SUCCESS;
    payload: SchoolDetailsType;
}

interface EditSchoolFail {
    type: SchoolsActionTypes.EDIT_SCHOOL_FAIL;
    payload: any;
}

export const editSchool = (editedSchool: SchoolDetailsType): ThunkResult<void> => async dispatch => {
    handleEditSchool(dispatch);
    try {
        const response: AxiosResponse<SchoolDetailsType> = await baseAPI.put(`/api/school/${editedSchool.id}/`, editedSchool, 
        { headers: { "Authorization": localStorage.getItem('token') } });
        let getUserType = localStorage.getItem('usertype');
        if (response.data.status === true) {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleEditSchoolSuccess(dispatch, response.data);
            if (getUserType === UserRoles.acadamicAdmin) {
                history.push('/school');
            } else {
                history.push('/view_school');
            }
        } else {
            handleEditSchoolFail(dispatch, response.data);
        }
    }
    catch (e) {
        handleEditSchoolFail(dispatch, e);
    }
};
const handleEditSchool = (dispatch: Dispatch<EditSchool>): void => {
    dispatch({ type: SchoolsActionTypes.EDIT_SCHOOL });
};
const handleEditSchoolSuccess = (dispatch: Dispatch<EditSchoolSuccess>, editedSchool: SchoolDetailsType) => {
    dispatch({ type: SchoolsActionTypes.EDIT_SCHOOL_SUCCESS, payload: editedSchool });

};

const handleEditSchoolFail = (dispatch: Dispatch<EditSchoolFail>, response: any) => {
    setTimeout(() => {
        dispatch({ type: SchoolsActionTypes.EDIT_SCHOOL_FAIL, payload: response });
    }, notificationMsg.duration);
};

// DELETE SCHOOL

interface DeleteSchool {
    type: SchoolsActionTypes.DELETE_SCHOOL;
}

interface DeleteSchoolSuccess {
    type: SchoolsActionTypes.DELETE_SCHOOL_SUCCESS;
    payload: SchoolDetailsType;
}

interface DeleteSchoolFail {
    type: SchoolsActionTypes.DELETE_SCHOOL_FAIL;
}

export const deletePost = (deletedId: any): ThunkResult<void> => async dispatch => {
    const getvalue = {
        id: deletedId.id,
        is_active: deletedId.isActive
    }
    handleDeleteSchool(dispatch);
    try {
        const response: AxiosResponse<SchoolDetailsType> = await baseAPI.post(`/api/school/${deletedId.id}/`, getvalue, 
        { headers: { "Authorization": localStorage.getItem('token') } });
        if (response.data.status === true) {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleDeleteSchoolSuccess(dispatch, response.data);
        } else {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleDeleteSchoolFail(dispatch);
        }

    } catch (e) {
        handleDeleteSchoolFail(dispatch);
    }
};

const handleDeleteSchool = (dispatch: Dispatch<DeleteSchool>) => {
    dispatch({ type: SchoolsActionTypes.DELETE_SCHOOL });
};

const handleDeleteSchoolSuccess = (
    dispatch: Dispatch<DeleteSchoolSuccess>,
    response: SchoolDetailsType
) => {
    dispatch({ type: SchoolsActionTypes.DELETE_SCHOOL_SUCCESS, payload: response });
    history.push('/school');
};

const handleDeleteSchoolFail = (dispatch: Dispatch<DeleteSchoolFail>) => {
    dispatch({ type: SchoolsActionTypes.DELETE_SCHOOL_FAIL });
};

export type SchoolsAction =
    | FetchSchools
    | FetchSchoolsSuccess
    | FetchSchoolsFail
    | FetchSchool
    | FetchSchoolSuccess
    | FetchSchoolFail
    | AddSchool
    | AddSchoolSuccess
    | AddSchoolFail
    | EditSchool
    | EditSchoolSuccess
    | EditSchoolFail
    | DeleteSchool
    | DeleteSchoolSuccess
    | DeleteSchoolFail;