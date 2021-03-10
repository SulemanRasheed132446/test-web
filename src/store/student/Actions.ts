import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../Index';
import { AxiosResponse } from 'axios';
import { baseAPI, baseAPIAuth } from '../../Service';
import { StudentActionTypes, StudentType } from './Types';
import { LoadMoreType } from '../../components/type';
import toaster from "toasted-notes";
import { notificationMsg } from '../../services/Constants'
import { STUDENTS } from '../../services/Config';
import history from '../../History';

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

interface FetchStudent {
    type: StudentActionTypes.FETCH_STUDENT;
}

interface FetchStudentSuccess {
    type: StudentActionTypes.FETCH_STUDENT_SUCCESS;
    payload: StudentType;
}

interface FetchStudentFail {
    type: StudentActionTypes.FETCH_STUDENT_FAIL;
}

export const fetchStudentPost = (loadMoreType: LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchStudent(dispatch);
    try {
        const response: AxiosResponse<StudentType> = await baseAPI.get(STUDENTS.STUDENTS, {
            params: loadMoreType,
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
        const getResponse:any = response.data;
        if(getResponse.status === true) {
            handleFetchStudentSuccess(dispatch, response.data);
        } else { 
            toaster.notify(getResponse.message, {
                position: 'top',
                duration: notificationMsg.duration
            });           
            handleFetchStudentFail(dispatch);
        }        
    } catch (e) {
        handleFetchStudentFail(dispatch);
    }
};

export const handleFetchStudent = (dispatch: Dispatch<FetchStudent>) => {
    dispatch({ type: StudentActionTypes.FETCH_STUDENT });
};

export const handleFetchStudentSuccess = (
    dispatch: Dispatch<FetchStudentSuccess>,
    response: any
) => {
    dispatch({
        type: StudentActionTypes.FETCH_STUDENT_SUCCESS,
        payload: response,
        records: response.data.records,
        per_page: response.data.per_page,
        page: response.data.page,
        total: response.data.total
    });

};

export const handleFetchStudentFail = (dispatch: Dispatch<FetchStudentFail>) => {
    dispatch({
        type: StudentActionTypes.FETCH_STUDENT_FAIL
    });
};

// FETCH Student edit details

interface FetchStudentId {
    type: StudentActionTypes.FETCH_STUDENT_ID;
}

interface FetchStudentSuccessId {
    type: StudentActionTypes.FETCH_STUDENT_SUCCESS_ID;
    payload: StudentType;
}

interface FetchStudentFailId {
    type: StudentActionTypes.FETCH_STUDENT_FAIL_ID;
}

export const fetchStudent = (id: number): ThunkResult<void> => async dispatch => {    
    handleFetchStudentId(dispatch);
    try {
        const response: AxiosResponse<StudentType> = await baseAPI.get(`/api/students/${id}/?academic_year=2020`,
        { headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchStudentSuccessId(dispatch, response.data);
    } catch (e) {
        handleFetchStudentFailId(dispatch);
    }
};

export const handleFetchStudentId = (dispatch: Dispatch<FetchStudentId>) => {
    dispatch({ type: StudentActionTypes.FETCH_STUDENT_ID });
};

const handleFetchStudentSuccessId = (
    dispatch: Dispatch<FetchStudentSuccessId>,
    response: any
) => {
    dispatch({
        type: StudentActionTypes.FETCH_STUDENT_SUCCESS_ID,
        payload: response,
        getStudentEditResponse:response
    });
};

const handleFetchStudentFailId = (dispatch: Dispatch<FetchStudentFailId>) => {
    dispatch({
        type: StudentActionTypes.FETCH_STUDENT_FAIL_ID
    });
};

// FETCH Student edit details

interface FetchParent {
    type: StudentActionTypes.FETCH_PARENT;
}

interface FetchParentSuccess {
    type: StudentActionTypes.FETCH_PARENT_SUCCESS;
    payload: any;
}

interface FetchParentFail {
    type: StudentActionTypes.FETCH_PARENT_FAIL;
}

export const fetchParent = (getParent:any): ThunkResult<void> => async dispatch => {
    handleParentStudent(dispatch);
    try {
        const response: AxiosResponse<StudentType> = await baseAPIAuth.post(STUDENTS.CHECKPARENT, getParent,
        { headers: { "Authorization": localStorage.getItem('token') } });
        const getParentResponse:any = response.data;
        if(getParentResponse.status === true) {
            handleFetchParentSuccess(dispatch, response.data);
        } else {
            handleFetchParentFail(dispatch);
        }        
    } catch (e) {
        handleFetchParentFail(dispatch);
    }
};

export const handleParentStudent = (dispatch: Dispatch<FetchParent>) => {
    dispatch({ type: StudentActionTypes.FETCH_PARENT });
};

const handleFetchParentSuccess = (
    dispatch: Dispatch<FetchParentSuccess>,
    response: any
) => {
    dispatch({
        type: StudentActionTypes.FETCH_PARENT_SUCCESS,
        payload: response,
        parentDetails: response.data
    });
};

const handleFetchParentFail = (dispatch: Dispatch<FetchParentFail>) => {
    dispatch({
        type: StudentActionTypes.FETCH_PARENT_FAIL
    });
};
// FETCH Image Upload Student details

interface FetchStudentImageUpdate {
    type: StudentActionTypes.FETCH_STUDENT_IMAPGE;
}

interface FetchStudentImageUpdateSuccess {
    type: StudentActionTypes.FETCH_STUDENT_IMAPGE_SUCCESS;
    payload: any;
}

interface FetchStudentImageUpdateFail {
    type: StudentActionTypes.FETCH_STUDENT_IMAPGE_FAIL;
}

export const StudentImageUpdate = (getImage:any, url:any): ThunkResult<void> => async dispatch => {
    handleStudentImageUpdate(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(url, getImage,
        { headers: { "Authorization": localStorage.getItem('token') } });
        const getResponse:any = response.data;
        if(getResponse.status === false){
            toaster.notify(getResponse.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
        }
        if(getResponse.data.length === undefined){
            handleFetchStudentImageUpdateSuccess(dispatch, getResponse);
        } else {            
            handleFetchStudentImageUpdateFail(dispatch);
        }
                 
    } catch (e) {
        handleFetchStudentImageUpdateFail(dispatch);
    }
};

export const handleStudentImageUpdate = (dispatch: Dispatch<FetchStudentImageUpdate>) => {
    dispatch({ type: StudentActionTypes.FETCH_STUDENT_IMAPGE });
};

const handleFetchStudentImageUpdateSuccess = (
    dispatch: Dispatch<FetchStudentImageUpdateSuccess>,
    response: any
) => {
    dispatch({
        type: StudentActionTypes.FETCH_STUDENT_IMAPGE_SUCCESS,
        payload: response,
        ImageURL:response.data
    });
};

const handleFetchStudentImageUpdateFail = (dispatch: Dispatch<FetchStudentImageUpdateFail>) => {
    dispatch({
        type: StudentActionTypes.FETCH_STUDENT_IMAPGE_FAIL
    });
};

// ADD Student

interface AddStudent {
    type: StudentActionTypes.ADD_STUDENT;
}

interface AddStudentSuccess {
    type: StudentActionTypes.ADD_STUDENT_SUCCESS;
    payload: StudentType;
}

interface AddStudentFail {
    type: StudentActionTypes.ADD_STUDENT_FAIL;
    payload: any;
}

export const addStudent = (student: StudentType): ThunkResult<void> => async dispatch => {
    handleAddStudent(dispatch);

    try {
        const response: AxiosResponse<StudentType> = await baseAPI.post(STUDENTS.STUDENTS, student,
            { headers: { "Authorization": localStorage.getItem('token') } });
        const getResponse: any = response.data;
        if (getResponse.status === true) {
            toaster.notify(getResponse.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleAddStudentSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleAddStudentFail(dispatch, response.data);
        }
    } catch (e) {
        handleAddStudentFail(dispatch, e);
    }
};

const handleAddStudent = (dispatch: Dispatch<AddStudent>) => {
    dispatch({ type: StudentActionTypes.ADD_STUDENT });
};

const handleAddStudentSuccess = (
    dispatch: Dispatch<AddStudentSuccess>,
    response: StudentType
) => {
    dispatch({ type: StudentActionTypes.ADD_STUDENT_SUCCESS, payload: response });
    history.push('/student');
};

const handleAddStudentFail = (dispatch: Dispatch<AddStudentFail>, response: any) => {
    setTimeout(() => {
        dispatch({ type: StudentActionTypes.ADD_STUDENT_FAIL, payload: response });
    }, notificationMsg.duration);
};

// EDIT Student

interface EditStudent {
    type: StudentActionTypes.EDIT_STUDENT;
}

interface EditStudentSuccess {
    type: StudentActionTypes.EDIT_STUDENT_SUCCESS;
    payload: StudentType;
}

interface EditStudentFail {
    type: StudentActionTypes.EDIT_STUDENT_FAIL;
    payload: any;
}

export const editStudent = (editedStudent: StudentType): ThunkResult<void> => async dispatch => {    
    handleEditStudent(dispatch);
    try {
        const response: AxiosResponse<StudentType> = await baseAPI.put(`/api/students/${editedStudent.id}/`, editedStudent,
            { headers: { "Authorization": localStorage.getItem('token') } });
        const getResponse: any = response.data;
        if (getResponse.status === true) {
            toaster.notify(getResponse.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleEditStudentSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleEditStudentFail(dispatch, response.data);
        }
    }
    catch (e) {
        handleEditStudentFail(dispatch, e);
    }
};
const handleEditStudent = (dispatch: Dispatch<EditStudent>): void => {
    dispatch({ type: StudentActionTypes.EDIT_STUDENT });
};
const handleEditStudentSuccess = (dispatch: Dispatch<EditStudentSuccess>, editedSchool: StudentType) => {
    dispatch({ type: StudentActionTypes.EDIT_STUDENT_SUCCESS, payload: editedSchool });
    history.push('/student');
};

const handleEditStudentFail = (dispatch: Dispatch<EditStudentFail>, response: any) => {
    setTimeout(() => {
        dispatch({ type: StudentActionTypes.EDIT_STUDENT_FAIL, payload: response });
    }, notificationMsg.duration);
};

// DELETE Student

interface DeleteStudent {
    type: StudentActionTypes.DELETE_STUDENT;
}

interface DeleteStudentSuccess {
    type: StudentActionTypes.DELETE_STUDENT_SUCCESS;
    payload: StudentType;
}

interface DeleteStudentFail {
    type: StudentActionTypes.DELETE_STUDENT_FAIL;
}
export const deleteStudent = (deletedId: any): ThunkResult<void> => async dispatch => {
    const getvalue = {
        academic_year: deletedId.academic_year,
        is_active: deletedId.isActive
    }
    handleDeleteStudent(dispatch);
    try {
        const response: AxiosResponse<StudentType> = await baseAPI.post(`/api/students/${deletedId.id}/`, getvalue, 
        { headers: { "Authorization": localStorage.getItem('token') } });
        const getResponse:any = response.data;
        if (getResponse.status === true) {
            toaster.notify(getResponse.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleDeleteStudentSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleDeleteStudentFail(dispatch);
        }

    } catch (e) {
        handleDeleteStudentFail(dispatch);
    }
};

const handleDeleteStudent = (dispatch: Dispatch<DeleteStudent>) => {
    dispatch({ type: StudentActionTypes.DELETE_STUDENT });
};

const handleDeleteStudentSuccess = (
    dispatch: Dispatch<DeleteStudentSuccess>,
    response: StudentType
) => {
    dispatch({ type: StudentActionTypes.DELETE_STUDENT_SUCCESS, payload: response });
};

const handleDeleteStudentFail = (dispatch: Dispatch<DeleteStudentFail>) => {
    dispatch({ type: StudentActionTypes.DELETE_STUDENT_FAIL });
};

export type StudentAction =
    | FetchStudent
    | FetchStudentSuccess
    | FetchStudentFail
    | FetchStudentId
    | FetchStudentSuccessId
    | FetchStudentFailId
    | AddStudent
    | AddStudentSuccess
    | AddStudentFail
    | EditStudent
    | EditStudentSuccess
    | EditStudentFail
    | DeleteStudent
    | DeleteStudentSuccess
    | DeleteStudentFail
    | FetchParent
    | FetchParentSuccess
    | FetchParentFail;