import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import history from '../../History';
import { baseAPI } from '../../Service';
import {  SUBJECTMANAGE, CATEGORYMANAGE } from '../../services/Config'
import { RootState, RootActions } from '../Index';
import { SubjectsActionTypes, SubjectFieldsType, CategoryActionTypes, CategoryFieldsType, loadMoreType } from './Types'
import toaster from "toasted-notes";
import { notificationMsg } from '../../services/Constants'

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;


interface FetchCategory {
    type: CategoryActionTypes.FETCH_CATEGORY;
}

interface FetchCategorySuccess {
    type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS;
    payload: CategoryFieldsType;
}

interface FetchCategoryFail {
    type: CategoryActionTypes.FETCH_CATEGORY_FAIL;
}

export const fetchCategoryPost = (): ThunkResult<void> => async dispatch => {
    handleFetchCategory(dispatch);
    try {
        const response: AxiosResponse<CategoryFieldsType> = await baseAPI.get(CATEGORYMANAGE.CATEGORYMANAGEVIEW, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        handleFetchCategorySuccess(dispatch, response.data);
    } catch (e) {
        handleFetchCategoryFail(dispatch);
    }
};

export const handleFetchCategory = (dispatch: Dispatch<FetchCategory>) => {
    dispatch({ type: CategoryActionTypes.FETCH_CATEGORY });
};

export const handleFetchCategorySuccess = (
    dispatch: Dispatch<FetchCategorySuccess>,
    response: CategoryFieldsType
) => {
    
    dispatch({
        type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS,
        payload: response      
    });
    
};

export const handleFetchCategoryFail = (dispatch: Dispatch<FetchCategoryFail>) => {
    dispatch({
        type: CategoryActionTypes.FETCH_CATEGORY_FAIL
    });
};

// get Correct Subject details list

interface FetchSubjectList {
    type: CategoryActionTypes.FETCH_SUBJECT_LIST;
}

interface FetchSubjectListSuccess {
    type: CategoryActionTypes.FETCH_SUBJECT_LIST_SUCCESS;
    payload: any;
}

interface FetchSubjectListFail {
    type: CategoryActionTypes.FETCH_SUBJECT_LIST_FAIL;
}

export const GetCorrectSubject = (loadMoreType:loadMoreType): ThunkResult<void> => async dispatch => {  
    handleFetchSubjectList(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(SUBJECTMANAGE.SubjectList, 
            { 
                params:loadMoreType,
                headers: {"Authorization" : localStorage.getItem('token')} });
        handleFetchCategorySuccess(dispatch, response.data);
    } catch (e) {
        handleFetchCategoryFail(dispatch);
    }
};

export const handleFetchSubjectList = (dispatch: Dispatch<FetchSubjectList>) => {
    dispatch({ type: CategoryActionTypes.FETCH_SUBJECT_LIST });
};

export const handleFetchSubjectListSuccess = (
    dispatch: Dispatch<FetchSubjectListSuccess>,
    response: any
) => {
    
    dispatch({
        type: CategoryActionTypes.FETCH_SUBJECT_LIST_SUCCESS,
        payload: response,
        StudentData:response.data.data     
    });
    
};

export const handleFetchSubjectListFail = (dispatch: Dispatch<FetchSubjectListFail>) => {
    dispatch({
        type: CategoryActionTypes.FETCH_SUBJECT_LIST_FAIL
    });
};

interface FetchSubjects {
    type: SubjectsActionTypes.FETCH_SUBJECTS;
}

interface FetchSubjectsSuccess {
    type: SubjectsActionTypes.FETCH_SUBJECTS_SUCCESS;
    payload: SubjectFieldsType;
}

interface FetchSubjectsFail {
    type: SubjectsActionTypes.FETCH_SUBJECTS_FAIL;
}

export const fetchSubjectsPost = (loadMoreType:loadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchSubjects(dispatch);
    try {
        const response: AxiosResponse<SubjectFieldsType> = await baseAPI.get(SUBJECTMANAGE.SUBJECTMANAGEVIEW,{   
            params:loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchSubjectsSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchSubjectsFail(dispatch);
    }
};

export const handleFetchSubjects = (dispatch: Dispatch<FetchSubjects>) => {
    dispatch({ type: SubjectsActionTypes.FETCH_SUBJECTS });
};

export const handleFetchSubjectsSuccess = (
    dispatch: Dispatch<FetchSubjectsSuccess>,
    response: SubjectFieldsType
) => {
    dispatch({
        type: SubjectsActionTypes.FETCH_SUBJECTS_SUCCESS,
        payload: response,
        records: response.data.records,
        per_page: response.data.per_page,
        page: response.data.page,
        total: response.data.total
    });
    
};

export const handleFetchSubjectsFail = (dispatch: Dispatch<FetchSubjectsFail>) => {
    dispatch({
        type: SubjectsActionTypes.FETCH_SUBJECTS_FAIL
    });
};

// FETCH SUBJECT edit details

interface FetchSubject {
    type: SubjectsActionTypes.FETCH_SUBJECT_ID;
}

interface FetchSubjectSuccess {
    type: SubjectsActionTypes.FETCH_SUBJECT_SUCCESS_ID;
    payload: SubjectFieldsType;
}

interface FetchSubjectFail {
    type: SubjectsActionTypes.FETCH_SUBJECT_FAIL_ID;
}

export const fetchSubject = (id: number): ThunkResult<void> => async dispatch => {
    handleFetchSubject(dispatch);
    try {
        const response: AxiosResponse<SubjectFieldsType> = await baseAPI.get(`/api/subject/${id}/`, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            handleFetchSubjectSuccess(dispatch, getResponse.data);
        } else {
            handleFetchSubjectFail(dispatch);
        }
       
    } catch (e) {
        handleFetchSubjectFail(dispatch);
    }
};

export const handleFetchSubject = (dispatch: Dispatch<FetchSubject>) => {
    dispatch({ type: SubjectsActionTypes.FETCH_SUBJECT_ID });
};

const handleFetchSubjectSuccess = (
    dispatch: Dispatch<FetchSubjectSuccess>,
    response: SubjectFieldsType
) => {
    dispatch({
        type: SubjectsActionTypes.FETCH_SUBJECT_SUCCESS_ID,
        payload: response
    });
};

const handleFetchSubjectFail = (dispatch: Dispatch<FetchSubjectFail>) => {
    dispatch({
        type: SubjectsActionTypes.FETCH_SUBJECT_FAIL_ID
    });
};

// ADD SUBJECT

interface AddSubject {
    type: SubjectsActionTypes.ADD_SUBJECT;
}

interface AddSubjectSuccess {
    type: SubjectsActionTypes.ADD_SUBJECT_SUCCESS;
    payload: SubjectFieldsType;
}

interface AddSubjectFail {
    type: SubjectsActionTypes.ADD_SUBJECT_FAIL;
    payload:any;
}

export const addSubject = (subject: SubjectFieldsType): ThunkResult<void> => async dispatch => {
    handleAddSubject(dispatch);
    
    try {
        const response: AxiosResponse<SubjectFieldsType> = await baseAPI.post(SUBJECTMANAGE.SUBJECTMANAGEVIEW, subject, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        if(response.data.status === true) {
            toaster.notify(response.data.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
            handleAddSubjectSuccess(dispatch, response.data);
          } else {
            handleAddSubjectFail(dispatch, response.data);
            toaster.notify(response.data.data.non_field_errors, {
                position: 'top', 
                duration: notificationMsg.duration
              });
          
          } 
        
    } catch (e) {
        handleAddSubjectFail(dispatch, e);
    }
    
};

const handleAddSubject = (dispatch: Dispatch<AddSubject>) => {
    dispatch({ type: SubjectsActionTypes.ADD_SUBJECT });
};

const handleAddSubjectSuccess = (
    dispatch: Dispatch<AddSubjectSuccess>,
    response: SubjectFieldsType
) => {
    dispatch({ type: SubjectsActionTypes.ADD_SUBJECT_SUCCESS, payload: response });
    history.push('/subject');
};

const handleAddSubjectFail = (dispatch: Dispatch<AddSubjectFail>, response: any) => {   
        dispatch({ type: SubjectsActionTypes.ADD_SUBJECT_FAIL, 
        payload: response
     });     
};

// EDIT SUBJECT

interface EditSubject {
    type: SubjectsActionTypes.EDIT_SUBJECT;
}

interface EditSubjectSuccess {
    type: SubjectsActionTypes.EDIT_SUBJECT_SUCCESS;
    payload: SubjectFieldsType;
}

interface EditSubjectFail {
    type: SubjectsActionTypes.EDIT_SUBJECT_FAIL;
    payload:any;
}

export const editSubject = (editedSubject: SubjectFieldsType): ThunkResult<void> => async dispatch => {
    handleEditSubject(dispatch);    
    try {        
        const response: AxiosResponse<SubjectFieldsType> = await baseAPI.put( `/api/subject/${editedSubject.id}/`,editedSubject, 
        { headers: {"Authorization" : localStorage.getItem('token')}});     
               if(response.data.status === true){
                toaster.notify(response.data.message, {
                    position: 'top', 
                duration: notificationMsg.duration
                  });
                handleEditSubjectSuccess(dispatch, response.data);
                history.push('/subject');
            } else {
                toaster.notify(response.data.message, {
                    position: 'top', 
                duration: notificationMsg.duration
                  });
                handleEditSubjectFail(dispatch, response.data);
            }   } 
                catch (e) {        
                    handleEditSubjectFail(dispatch, e);    
                }};
        const handleEditSubject = (dispatch: Dispatch<EditSubject>): void => {   
            dispatch({ type: SubjectsActionTypes.EDIT_SUBJECT });
        };
   
const handleEditSubjectSuccess = (
    dispatch: Dispatch<EditSubjectSuccess>,
    response: SubjectFieldsType
) => {
    dispatch({ type: SubjectsActionTypes.EDIT_SUBJECT_SUCCESS, payload: response });
    history.push('/subject');
};

        const handleEditSubjectFail = (dispatch: Dispatch<EditSubjectFail>, response: any) => {
           // setTimeout(() => {
                dispatch({ type: SubjectsActionTypes.EDIT_SUBJECT_FAIL, payload: response });
           // }, notificationMsg.duration);
        };

// DELETE SUBJECT

interface DeleteSubject {
    type: SubjectsActionTypes.DELETE_SUBJECT;
}

interface DeleteSubjectSuccess {
    type: SubjectsActionTypes.DELETE_SUBJECT_SUCCESS;
    payload: SubjectFieldsType;
}

interface DeleteSubjectFail {
    type: SubjectsActionTypes.DELETE_SUBJECT_FAIL;
}

export const deletePost = ( deletedId: any ): ThunkResult<void> => async dispatch => {
    const getvalue = {
        id : deletedId.id,
        is_active:deletedId.isActive
    }
    handleDeleteSubject(dispatch);
    try {
        const response: AxiosResponse<SubjectFieldsType> = await baseAPI.post(`/api/subject/${deletedId.id}/`, getvalue, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        if(response.data.status === true){
            toaster.notify(response.data.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleDeleteSubjectSuccess(dispatch, response.data);
        } else {
            toaster.notify(response.data.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleDeleteSubjectFail(dispatch);
        }
       
    } catch (e) {
        handleDeleteSubjectFail(dispatch);
    }
};

const handleDeleteSubject = (dispatch: Dispatch<DeleteSubject>) => {
    dispatch({ type: SubjectsActionTypes.DELETE_SUBJECT });
};

const handleDeleteSubjectSuccess = (
    dispatch: Dispatch<DeleteSubjectSuccess>,
    response: SubjectFieldsType
) => {
    dispatch({ type: SubjectsActionTypes.DELETE_SUBJECT_SUCCESS, payload: response });
    history.push('/subject');
};
const handleDeleteSubjectFail = (dispatch: Dispatch<DeleteSubjectFail>) => {
    dispatch({ type: SubjectsActionTypes.DELETE_SUBJECT_FAIL });
    history.push('/subject');
};


export type SubjectsAction =
    | FetchSubjects
    | FetchSubjectsSuccess
    | FetchSubjectsFail
    | FetchSubject
    | FetchSubjectSuccess
    | FetchSubjectFail
    | AddSubject
    | AddSubjectSuccess
    | AddSubjectFail
    | EditSubject
    | EditSubjectSuccess
    | EditSubjectFail
    | DeleteSubject
    | DeleteSubjectSuccess
    | DeleteSubjectFail;
