import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { baseAPIAuth, baseAPI } from '../../Service';
import { RootState, RootActions } from '../Index';
import { TeacherActionTypes, TeacherType } from './Type';
import { LoadMoreType } from '../../components/type';
import history from '../../History';
import {  USERNAMENAGE, Teacher } from '../../services/Config'
import { notificationMsg } from '../../services/Constants'
import toaster from "toasted-notes";

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;
//Farch Teacher Details
interface FetchTeachers {
    type: TeacherActionTypes.FETCH_TEACHER;
}

interface FetchTeachersSuccess {
    type: TeacherActionTypes.FETCH_TEACHER_SUCCESS;
    payload: TeacherType;
}

interface FetchTeachersFail {
    type: TeacherActionTypes.FETCH_TEACHER_FAIL;
}

export const fetchTeachersPost = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchTeachers(dispatch);
    try {
        const response: AxiosResponse<TeacherType> = await baseAPIAuth.get(USERNAMENAGE.GETUSER,{   
            params:loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchTeachersSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchTeachersFail(dispatch);
    }
};

export const handleFetchTeachers = (dispatch: Dispatch<FetchTeachers>) => {
    dispatch({ type: TeacherActionTypes.FETCH_TEACHER });
};

export const handleFetchTeachersSuccess = (
    dispatch: Dispatch<FetchTeachersSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_SUCCESS,
        payload: response,
        records: response.data.records,
        per_page: response.data.per_page,
        page: response.data.page,
        total: response.data.total
    });
    
};

export const handleFetchTeachersFail = (dispatch: Dispatch<FetchTeachersFail>) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_FAIL
    });
};

//Farch Teacher mapping Details
interface FetchSubjectMapping {
    type: TeacherActionTypes.FETCH_TEACHER_MAPPING;
}

interface FetchSubjectMappingSuccess {
    type: TeacherActionTypes.FETCH_TEACHER_MAPPING_SUCCESS;
    payload: any;
}

interface FetchSubjectMappingFail {
    type: TeacherActionTypes.FETCH_TEACHER_MAPPING_FAIL;
}

export const FetchSubjectMappingPost = (TeacherSubject:any): ThunkResult<void> => async dispatch => {
    handleSubjectMapping(dispatch);
    const postValue = {
        page_no:TeacherSubject.page_no,
        academic_year:TeacherSubject.academic_year
    }
    try {
        const response: AxiosResponse<any> = await baseAPI.get(`${Teacher.TeacherPost}${TeacherSubject.teacher_id}/`,{   
            params:postValue,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
            handleSubjectMappingSuccess(dispatch, response.data);
    } catch (e) {
        handleSubjectMappingFail(dispatch);
    }
};

export const handleSubjectMapping = (dispatch: Dispatch<FetchSubjectMapping>) => {
    dispatch({ type: TeacherActionTypes.FETCH_TEACHER_MAPPING });
};

export const handleSubjectMappingSuccess = (
    dispatch: Dispatch<FetchSubjectMappingSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_MAPPING_SUCCESS,
        payload: response,
        getSubjectList: response.data.records,
        Subject_per_page: response.data.per_page,
        Subject_page: response.data.page,
        Subject_total: response.data.total
    });
};

export const handleSubjectMappingFail = (dispatch: Dispatch<FetchSubjectMappingFail>) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_MAPPING_FAIL
    });
};

//Farch Teacher mapping Details
interface ClassInchargeMapping {
    type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING;
}

interface ClassInchargeMappingSuccess {
    type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_SUCCESS;
    payload: any;
}

interface ClassInchargeMappingFail {
    type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_FAIL;
}

export const fetchClassInchargeMappingPost = (TeacherSubject:any): ThunkResult<void> => async dispatch => {
    handleFetchClassInchargeMapping(dispatch);
    const postValue = {
        page_no:TeacherSubject.page_no,
        academic_year:TeacherSubject.academic_year
    }
    try {
        const response: AxiosResponse<any> = await baseAPI.get(`${Teacher.TeacherClass}${TeacherSubject.teacher_id}/`,{   
            params:postValue,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchClassInchargeSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchTeachersFail(dispatch);
    }
};

export const handleFetchClassInchargeMapping = (dispatch: Dispatch<ClassInchargeMapping>) => {
    dispatch({ type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING });
};

export const handleFetchClassInchargeSuccess = (
    dispatch: Dispatch<ClassInchargeMappingSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_SUCCESS,
        payload: response,
        classRecords: response.data.records,
        classPer_page: response.data.per_page,
        classPage: response.data.page,
        classTotal: response.data.total
    });
};

export const handleFetchClassInchargeMappingFail = (dispatch: Dispatch<ClassInchargeMappingFail>) => {
    dispatch({
        type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_FAIL
    });
};

// Fetch teacher details Id
interface FetchTeacherId {
    type: TeacherActionTypes.FETCH_TEACHER_ID;
}

interface FetchTeacherSuccessId {
    type: TeacherActionTypes.FETCH_TEACHER_SUCCESS_ID;
    payload: TeacherType;
}

interface FetchTeacherFailId {
    type: TeacherActionTypes.FETCH_TEACHER_FAIL_ID;
}

export const fetchTeacherPostId = (id:string): ThunkResult<void> => async dispatch => {
    handleFetchTeacherId(dispatch);
    try {
        const response: AxiosResponse<TeacherType> = await baseAPIAuth.get(`/auth/user/?id=${id}`, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            handleFetchTeacherSuccessId(dispatch, response.data);
        } else {
            handleFetchTeacherFailId(dispatch);
        }
        
    } catch (e) {
        handleFetchTeacherFailId(dispatch);
    }
};

export const handleFetchTeacherId = (dispatch: Dispatch<FetchTeacherId>) => {
    dispatch({ type: TeacherActionTypes.FETCH_TEACHER_ID });
};

export const handleFetchTeacherSuccessId = (
    dispatch: Dispatch<FetchTeacherSuccessId>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_SUCCESS_ID,
        payload: response,
        TeacherId:response.data.ldap_id,
        TeacherProfile:response.data        
    });
};

export const handleFetchTeacherFailId = (dispatch: Dispatch<FetchTeacherFailId>) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_FAIL_ID
    });
};


// Add Classes
interface AddTeacher {
    type: TeacherActionTypes.ADD_TEACHER;
}

interface AddTeacherSuccess {
    type: TeacherActionTypes.ADD_TEACHER_SUCCESS;
    payload: TeacherType;
}

interface AddTeacherFail {
    type: TeacherActionTypes.ADD_TEACHER_FAIL;
}

export const AddTeacherPost = (userManage:TeacherType): ThunkResult<void> => async dispatch => {
    handleAddTeacher(dispatch);
    try {
        const response: AxiosResponse<TeacherType> = await baseAPIAuth.post(USERNAMENAGE.USERMANAGE, userManage, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleAddTeacherSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleAddTeacherFail(dispatch);
        }
       
    } catch (e) {
        handleAddTeacherFail(dispatch);
    }
};

export const handleAddTeacher = (dispatch: Dispatch<AddTeacher>) => {
    dispatch({ type: TeacherActionTypes.ADD_TEACHER });
};

export const handleAddTeacherSuccess = (
    dispatch: Dispatch<AddTeacherSuccess>,
    response: TeacherType
) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_SUCCESS,
        payload: response
    });
    history.push('/teacher');
};

export const handleAddTeacherFail = (dispatch: Dispatch<AddTeacherFail>) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_FAIL
    });
};

// Add Class incharge mapping
interface TeacherClassMapping {
    type: TeacherActionTypes.ADD_TEACHER;
}

interface TeacherClassMappingSuccess {
    type: TeacherActionTypes.ADD_TEACHER_SUCCESS;
    payload: any;
}

interface TeacherClassMappingFail {
    type: TeacherActionTypes.ADD_TEACHER_FAIL;
}

export const TeacherClassMappingPost = (teacherMap:any): ThunkResult<void> => async dispatch => {
    const teacherMapPost:any = {
        academic_year: teacherMap.academic_year,
        class_incharge:teacherMap.class_incharge
    }
    handleTeacherClassMapping(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(`${Teacher.TeacherClass}${teacherMap.teacher_id}/`, teacherMapPost, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherClassMappingSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherClassMappingFail(dispatch);
        }
       
    } catch (e) {
        handleTeacherClassMappingFail(dispatch);
    }
};

export const handleTeacherClassMapping = (dispatch: Dispatch<TeacherClassMapping>) => {
    dispatch({ type: TeacherActionTypes.ADD_TEACHER });
};

export const handleTeacherClassMappingSuccess = (
    dispatch: Dispatch<TeacherClassMappingSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_SUCCESS,
        payload: response,
        teacher_id:response.data.teacher_id
    });
    history.push(`/teacher/${response.data.teacher_id}`);
};

export const handleTeacherClassMappingFail = (dispatch: Dispatch<TeacherClassMappingFail>) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_FAIL
    });
};

// Add Mapping Subject
interface TeacherSubjectMapping {
    type: TeacherActionTypes.ADD_TEACHER;
}

interface TeacherSubjectMappingSuccess {
    type: TeacherActionTypes.ADD_TEACHER_SUCCESS;
    payload: any;
}

interface TeacherSubjectMappingFail {
    type: TeacherActionTypes.ADD_TEACHER_FAIL;
    payload: any;
}

export const TeacherSubjectMappingPost = (teacherMap:any): ThunkResult<void> => async dispatch => {
    const teacherMapPost:any = {
        academic_year: teacherMap.academic_year,
        subject_id: teacherMap.subject_id,
        class_ids:teacherMap.class_ids
    }
    handleTeacherSubjectMapping(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(`${Teacher.TeacherPost}${teacherMap.teacher_id}/`, teacherMapPost, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherSubjectMappingSuccess(dispatch, response.data);
        } else if(getResponse.status=== false && getResponse.data){
            toaster.notify(getResponse.data.teacher_id, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherSubjectMappingFail(dispatch, response.data);
        } else {
            handleTeacherSubjectMappingFail(dispatch, response.data);
        }
       
    } catch (e) {
        handleTeacherSubjectMappingFail(dispatch, e);
    }
};

export const handleTeacherSubjectMapping = (dispatch: Dispatch<TeacherSubjectMapping>) => {
    dispatch({ type: TeacherActionTypes.ADD_TEACHER });
};

export const handleTeacherSubjectMappingSuccess = (
    dispatch: Dispatch<TeacherSubjectMappingSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_SUCCESS,
        payload: response,
        teacher_id:response.data.teacher_id
    });
    history.push(`/teacher/${response.data.teacher_id}`);
};
export const handleTeacherSubjectMappingFail = (dispatch: Dispatch<TeacherSubjectMappingFail>, response: any) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_FAIL,
        payload: response,
        getResponseError: response.data
    });
};

// Add Mapping Subject
interface TeacherEditSubjectMapping {
    type: TeacherActionTypes.ADD_TEACHER;
}

interface TeacherEditSubjectMappingSuccess {
    type: TeacherActionTypes.ADD_TEACHER_SUCCESS;
    payload: any;
}

interface TeacherEditSubjectMappingFail {
    type: TeacherActionTypes.ADD_TEACHER_FAIL;
    payload: any;
}

export const TeacherEditSubjectMappingPost = (teacherMap:any): ThunkResult<void> => async dispatch => {
    const teacherMapPost:any = {
        academic_year: teacherMap.academic_year,
        subject_id: teacherMap.subject_id,
        class_ids:teacherMap.class_ids
    }
    handleTeacherEditSubjectMapping(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(`${Teacher.TeacherPost}${teacherMap.teacher_id}/`, teacherMapPost, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherEditSubjectMappingSuccess(dispatch, response.data);
        } else if(getResponse.status=== false && getResponse.data){
            toaster.notify(getResponse.data.teacher_id, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherEditSubjectMappingFail(dispatch, response.data);
        } else {
            handleTeacherEditSubjectMappingFail(dispatch, response.data);
        }
       
    } catch (e) {
        handleTeacherEditSubjectMappingFail(dispatch, e);
    }
};

export const handleTeacherEditSubjectMapping = (dispatch: Dispatch<TeacherEditSubjectMapping>) => {
    dispatch({ type: TeacherActionTypes.ADD_TEACHER });
};

export const handleTeacherEditSubjectMappingSuccess = (
    dispatch: Dispatch<TeacherEditSubjectMappingSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_SUCCESS,
        payload: response,
        teacher_id:response.data.teacher_id
    });
    history.push(`/teacher/${response.data.teacher_id}`);
};

export const handleTeacherEditSubjectMappingFail = (dispatch: Dispatch<TeacherEditSubjectMappingFail>, response: any) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_FAIL,
        payload: response,
        getResponseError: response.data
    });    
};

// Edit User management
interface EditTeacher {
    type: TeacherActionTypes.EDIT_TEACHER;
}

interface EditTeacherSuccess {
    type: TeacherActionTypes.EDIT_TEACHER_SUCCESS;
    payload: TeacherType;
}

interface EditTeacherFail {
    type: TeacherActionTypes.EDIT_TEACHER_FAIL;
}

export const EditTeacherPost = (userManage:TeacherType): ThunkResult<void> => async dispatch => {
    handleEditTeacher(dispatch);
    try {
        const response: AxiosResponse<TeacherType> = await baseAPIAuth.put(`/auth/user/?id=${userManage.ldap_id}`, userManage, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === "true"){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleEditTeacherSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleEditTeacherFail(dispatch);
        }
    } catch (e) {
        handleEditTeacherFail(dispatch);
    }
};

export const handleEditTeacher = (dispatch: Dispatch<EditTeacher>) => {
    dispatch({ type: TeacherActionTypes.EDIT_TEACHER });
};

export const handleEditTeacherSuccess = (
    dispatch: Dispatch<EditTeacherSuccess>,
    response: TeacherType
) => {
    dispatch({
        type: TeacherActionTypes.EDIT_TEACHER_SUCCESS,
        payload: response
    });  
    history.push('/teacher');  
};

export const handleEditTeacherFail = (dispatch: Dispatch<EditTeacherFail>) => {
    dispatch({
        type: TeacherActionTypes.EDIT_TEACHER_FAIL
    });
};

// DELETE Teacher MANAGE

interface DeleteTeacher {
    type: TeacherActionTypes.DELETE_TEACHER;
}

interface DeleteTeacherSuccess {
    type: TeacherActionTypes.DELETE_TEACHER_SUCCESS;
    payload: TeacherType;
}

interface DeleteTeacherFail {
    type: TeacherActionTypes.DELETE_TEACHER_FAIL;
}

export const deletePost = ( deletedId: any ): ThunkResult<void> => async dispatch => {
    const getDeleteValue = { "is_active" : deletedId.isActive } 
    handleDeleteTeacher(dispatch);
    try {
        const response: AxiosResponse<TeacherType> = await baseAPIAuth.patch(`/auth/user/?id=${deletedId.ldapId}`, getDeleteValue, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true || getResponse.status === "true"){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleDeleteTeacherSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleDeleteTeacherFail(dispatch);
        }
       
    } catch (e) {
        handleDeleteTeacherFail(dispatch);
    }
};

const handleDeleteTeacher = (dispatch: Dispatch<DeleteTeacher>) => {
    dispatch({ type: TeacherActionTypes.DELETE_TEACHER });
};

const handleDeleteTeacherSuccess = (
    dispatch: Dispatch<DeleteTeacherSuccess>,
    response: TeacherType
) => {
    dispatch({ type: TeacherActionTypes.DELETE_TEACHER_SUCCESS, payload: response });
};
const handleDeleteTeacherFail = (dispatch: Dispatch<DeleteTeacherFail>) => {
    dispatch({ type: TeacherActionTypes.DELETE_TEACHER_FAIL });
};

export type TeacherAction =
    | FetchTeachers
    | FetchTeachersSuccess
    | FetchTeachersFail
    | FetchTeacherId
    | FetchTeacherSuccessId
    | FetchTeacherFailId
    | FetchSubjectMapping
    | FetchSubjectMappingSuccess
    | FetchSubjectMappingFail
    | AddTeacher
    | AddTeacherSuccess
    | AddTeacherFail
    | DeleteTeacher
    | DeleteTeacherSuccess
    | DeleteTeacherFail
    | EditTeacher
    | EditTeacherSuccess
    | EditTeacherFail
    | ClassInchargeMapping
    | ClassInchargeMappingSuccess
    | ClassInchargeMappingFail;