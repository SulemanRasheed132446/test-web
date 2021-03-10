import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../Index';
import { AxiosResponse } from 'axios';
import history from '../../History';
import { baseAPI } from '../../Service';
import { SCHOOLMANAGE } from '../../services/Config';
import toaster from "toasted-notes";
import { notificationMsg } from '../../services/Constants';
import { ClassesActionTypes, ClassesType, GradeFieldsType, ClassesActionGradeType } from '../../store/classes/Type';
import { LoadMoreType } from '../../components/type';

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

// Fetch Classes
interface FetchClasses {
    type: ClassesActionTypes.FETCH_CLASSES;
}

interface FetchClassesSuccess {
    type: ClassesActionTypes.FETCH_CLASSES_SUCCESS;
    payload: ClassesType;
}

interface FetchClassesPaginationSuccess {
    type: ClassesActionTypes.FETCH_CLASSES_PAGE_ONLOAD;
    payload: ClassesType;
}

interface FetchClassesFail {
    type: ClassesActionTypes.FETCH_CLASSES_FAIL;
}

export const fetchClassesPagination = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchClasses(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.get(SCHOOLMANAGE.CLASSES, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchClassesPaginationSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchClassesFail(dispatch);
    }
};

export const fetchClassesPost = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchClasses(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.get(SCHOOLMANAGE.CLASSES, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchClassesSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchClassesFail(dispatch);
    }
};

export const handleFetchClasses = (dispatch: Dispatch<FetchClasses>) => {
    dispatch({ type: ClassesActionTypes.FETCH_CLASSES });
};

export const handleFetchClassesSuccess = (
    dispatch: Dispatch<FetchClassesSuccess>,
    response: ClassesType
) => {
    dispatch({
        type: ClassesActionTypes.FETCH_CLASSES_SUCCESS,
        payload: response
        
    });
    
};

export const handleFetchClassesPaginationSuccess = (
    dispatch: Dispatch<FetchClassesPaginationSuccess>,
    response: any
) => {
    dispatch({
        type: ClassesActionTypes.FETCH_CLASSES_PAGE_ONLOAD,
        payload: response,
        records: response.data.records,
        per_page: response.data.per_page,
        page: response.data.page,
        total: response.data.total,
        
    });
    
};

export const handleFetchClassesFail = (dispatch: Dispatch<FetchClassesFail>) => {
    dispatch({
        type: ClassesActionTypes.FETCH_CLASSES_FAIL
    });
};


// Fetch Classes Id detail
interface FetchClassesId {
    type: ClassesActionTypes.FETCH_CLASSES_ID;
}

interface FetchClassesIdSuccess {
    type: ClassesActionTypes.FETCH_CLASSES_SUCCESS_ID;
    payload: ClassesType;
}

interface FetchClassesIdFail {
    type: ClassesActionTypes.FETCH_CLASSES_FAIL_ID;
}

export const fetchClassesIdPost = (id: number): ThunkResult<void> => async dispatch => {
    handleFetchClasses(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.get(`/api/classes/${id}/`, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        handleFetchClassesSuccess(dispatch, getResponse.data);
    } catch (e) {
        handleFetchClassesFail(dispatch);
    }
};

export const handleFetchClassesId = (dispatch: Dispatch<FetchClassesId>) => {
    dispatch({ type: ClassesActionTypes.FETCH_CLASSES_ID });
};

export const handleFetchClassesIdSuccess = (
    dispatch: Dispatch<FetchClassesIdSuccess>,
    response: ClassesType
) => {
    dispatch({
        type: ClassesActionTypes.FETCH_CLASSES_SUCCESS_ID,
        payload: response
    });
    
};

export const handleFetchClassesIdFail = (dispatch: Dispatch<FetchClassesIdFail>) => {
    dispatch({
        type: ClassesActionTypes.FETCH_CLASSES_FAIL_ID
    });
};

// Fetch Classes grade
interface FetchGrade {
    type: ClassesActionGradeType.FETCH_GRADE;
}

interface FetchGradeSuccess {
    type: ClassesActionGradeType.FETCH_GRADE_SUCCESS;
    payload: GradeFieldsType;
}

interface FetchGradeFail {
    type: ClassesActionGradeType.FETCH_GRADE_FAIL;
}

export const fetchGradePost = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchGrade(dispatch);
    try {
        const response: AxiosResponse<GradeFieldsType> = await baseAPI.get(SCHOOLMANAGE.GRADELIST, 
            { 
                params: loadMoreType,
                headers: {"Authorization" : localStorage.getItem('token')} });
        handleFetchGradeSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchGradeFail(dispatch);
    }
};

export const handleFetchGrade = (dispatch: Dispatch<FetchGrade>) => {
    dispatch({ type: ClassesActionGradeType.FETCH_GRADE });
};

export const handleFetchGradeSuccess = (
    dispatch: Dispatch<FetchGradeSuccess>,
    response: GradeFieldsType
) => {
    dispatch({
        type: ClassesActionGradeType.FETCH_GRADE_SUCCESS,
        payload: response
    });
    
};

export const handleFetchGradeFail = (dispatch: Dispatch<FetchGradeFail>) => {
    dispatch({
        type: ClassesActionGradeType.FETCH_GRADE_FAIL
    });
};

// Fetch Classes grade
interface FetchGradeStandard {
    type: ClassesActionGradeType.FETCH_GRADE_STANDARD;
}

interface FetchGradeSuccessStandard {
    type: ClassesActionGradeType.FETCH_GRADE_SUCCESS_STANDARD;
    payload: GradeFieldsType;
}

interface FetchGradeFailStandard {
    type: ClassesActionGradeType.FETCH_GRADE_FAIL_STANDARD;
}

export const fetchGradeStandardPost = (): ThunkResult<void> => async dispatch => {
    handleFetchGrade(dispatch);
    try {
        const response: AxiosResponse<GradeFieldsType> = await baseAPI.get(SCHOOLMANAGE.GRADESTANDARD, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        handleFetchGradeStandardSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchGradeStandardFail(dispatch);
    }
};

export const handleFetchGradeStandard = (dispatch: Dispatch<FetchGradeStandard>) => {
    dispatch({ type: ClassesActionGradeType.FETCH_GRADE_STANDARD });
};

export const handleFetchGradeStandardSuccess = (
    dispatch: Dispatch<FetchGradeSuccessStandard>,
    response: GradeFieldsType
) => {
    dispatch({
        type: ClassesActionGradeType.FETCH_GRADE_SUCCESS_STANDARD,
        payload: response
    });
    
};

export const handleFetchGradeStandardFail = (dispatch: Dispatch<FetchGradeFailStandard>) => {
    dispatch({
        type: ClassesActionGradeType.FETCH_GRADE_FAIL_STANDARD
    });
};

//Add Classes
interface AddClasses {
    type:ClassesActionTypes.ADD_CLASSES;
}

interface AddClassesSuccess {
    type: ClassesActionTypes.ADD_CLASSES_SUCCESS;
    payload: ClassesType;
}

interface AddClassesFail {
    type: ClassesActionTypes.ADD_CLASSES_FAIL;
    payload: any;
}

export const addClassesPost = (classes:ClassesType): ThunkResult<void> => async dispatch => {
    handleAddClasses(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.post(SCHOOLMANAGE.CLASSES, classes, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true) {
            handleAddClassesSuccess(dispatch, response.data);
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
        }else {
            handleAddClassesFail(dispatch, response.data);
            toaster.notify(getResponse.data.non_field_errors, {
                position: 'top', 
                duration: notificationMsg.duration
              });
        }        
    } catch (e) {
        handleAddClassesFail(dispatch, e);
    }
};

export const handleAddClasses = (dispatch: Dispatch<AddClasses>) => {
    dispatch({ type: ClassesActionTypes.ADD_CLASSES });
};

export const handleAddClassesSuccess = (
    dispatch: Dispatch<AddClassesSuccess>,
    response: ClassesType
) => {
    dispatch({
        type: ClassesActionTypes.ADD_CLASSES_SUCCESS,
        payload: response
    });
    history.push('/class');
};

export const handleAddClassesFail = (dispatch: Dispatch<AddClassesFail>, response: any) => {
    dispatch({
        type: ClassesActionTypes.ADD_CLASSES_FAIL, payload: response
    });
};

// EDIT Classes

interface EditClasses {
    type: ClassesActionTypes.EDIT_CLASSES;
}

interface EditClassesSuccess {
    type: ClassesActionTypes.EDIT_CLASSES_SUCCESS;
    payload: ClassesType;
}

interface EditClassesFail {
    type: ClassesActionTypes.EDIT_CLASSES_FAIL;
    payload: any;
}

export const EditClassesPost = (editedClasses:ClassesType): ThunkResult<void> => async dispatch => {
    handleAddClasses(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.put( `/api/classes/${editedClasses.id}/`,editedClasses, 
        { headers: {"Authorization" : localStorage.getItem('token')}}); 
        const getResponse =  JSON.parse(JSON.stringify(response.data))
        if(getResponse.status === true) {
            handleAddClassesSuccess(dispatch, response.data);
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
        } else {
              handleEditClassesFail(dispatch, response.data);
        }
    } catch (e) {
        handleEditClassesFail(dispatch, e);
    }
};

export const handleEditClasses = (dispatch: Dispatch<EditClasses>) => {
    dispatch({ type: ClassesActionTypes.EDIT_CLASSES });
};

export const handleEditClassesSuccess = (
    dispatch: Dispatch<EditClassesSuccess>,
    response: ClassesType
) => {   
    dispatch({
        type: ClassesActionTypes.EDIT_CLASSES_SUCCESS,
        payload: response
    });
    history.push('/class'); 
};

export const handleEditClassesFail = (dispatch: Dispatch<EditClassesFail>, response: any) => {
    setTimeout(() => {
    dispatch({
        type: ClassesActionTypes.EDIT_CLASSES_FAIL, payload: response
    });
    
}, notificationMsg.duration); 
};

// DELETE Classes

interface DeleteClasses {
    type: ClassesActionTypes.DELETE_CLASSES
}

interface DeleteClassesSuccess {
    type: ClassesActionTypes.DELETE_CLASSES_SUCCESS;
    payload: ClassesType;
}

interface DeleteClassesFail {
    type: ClassesActionTypes.DELETE_CLASSES_FAIL;
}

export const deletePost = ( deletedId: any ): ThunkResult<void> => async dispatch => {
    const getvalue = {
        id : deletedId.id,
        is_active:deletedId.isActive
    }
    handleDeleteSubject(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.post(`/api/classes/${deletedId.id}/`, getvalue, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        handleDeleteSubjectSuccess(dispatch, response.data);
       
    } catch (e) {
        handleDeleteSubjectFail(dispatch);
    }
};

const handleDeleteSubject = (dispatch: Dispatch<DeleteClasses>) => {
    dispatch({ type: ClassesActionTypes.DELETE_CLASSES });
};

const handleDeleteSubjectSuccess = (
    dispatch: Dispatch<DeleteClassesSuccess>,
    response: ClassesType
) => {
    dispatch({ type: ClassesActionTypes.DELETE_CLASSES_SUCCESS, payload: response });
    history.push('/class');
};
const handleDeleteSubjectFail = (dispatch: Dispatch<DeleteClassesFail>) => {
    dispatch({ type: ClassesActionTypes.DELETE_CLASSES_FAIL });
    history.push('/class');
};

export type ClassesAction =
    | FetchClasses
    | FetchClassesSuccess
    | FetchClassesFail
    |FetchGrade
    |FetchGradeSuccess
    |FetchGradeFail
    | AddClasses
    | AddClassesSuccess
    | AddClassesFail
    | EditClasses
    | EditClassesSuccess
    | EditClassesFail
    | DeleteClasses
    | DeleteClassesSuccess
    | DeleteClassesFail;