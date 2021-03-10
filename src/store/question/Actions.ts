import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../Index';
import { AxiosResponse } from 'axios';
import history from '../../History';
import { baseAPI } from '../../Service';
import toaster from "toasted-notes";
import { notificationMsg } from '../../services/Constants';
import { QuestionActionTypes } from './Types'
import { QuestionSet } from '../../services/Config';

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

interface FetchQuestionSet {
    type: QuestionActionTypes.FETCH_QUESTION;
}

interface FetchQuestionSetSuccess {
    type: QuestionActionTypes.FETCH_QUESTION_SUCCESS;
    payload: any;
}

interface FetchQuestionSetFail {
    type: QuestionActionTypes.FETCH_QUESTION_FAIL;
}

export const fetchQuestionSetPost = (loadMoreType: any): ThunkResult<void> => async dispatch => {
    handleFetchQuestionSet(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(QuestionSet.Question, {
            params: loadMoreType,
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
        handleFetchQuestionSetSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchQuestionSetFail(dispatch);
    }
};

export const handleFetchQuestionSet = (dispatch: Dispatch<FetchQuestionSet>) => {
    dispatch({ type: QuestionActionTypes.FETCH_QUESTION });
};

export const handleFetchQuestionSetSuccess = (
    dispatch: Dispatch<FetchQuestionSetSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.FETCH_QUESTION_SUCCESS,
        payload: response,
        records: response.data.records,
        per_page: response.data.per_page,
        page: response.data.page,
        total: response.data.total
    });

};

export const handleFetchQuestionSetFail = (dispatch: Dispatch<FetchQuestionSetFail>) => {
    dispatch({
        type: QuestionActionTypes.FETCH_QUESTION_FAIL
    });
};

//Add Question set

interface AddQuestionSet {
    type: QuestionActionTypes.ADD_QUESTION;
}

interface AddQuestionSetSuccess {
    type: QuestionActionTypes.ADD_QUESTION_SUCCESS;
    payload: any;
}

interface AddQuestionSetFail {
    type: QuestionActionTypes.ADD_QUESTION_FAIL;
    payload: any;
}

export const addQuestion = (question: any): ThunkResult<void> => async dispatch => {
    handleAddSchool(dispatch);

    try {
        const response: AxiosResponse<any> = await baseAPI.post(QuestionSet.Question, question,
            { headers: { "Authorization": localStorage.getItem('token') } });
        if (response.data.status === true) {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleAddSchoolSuccess(dispatch, response.data);
        } else {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleAddSchoolFail(dispatch, response.data);
        }
    } catch (e) {
        handleAddSchoolFail(dispatch, e);
    }
};

const handleAddSchool = (dispatch: Dispatch<AddQuestionSet>) => {
    dispatch({ type: QuestionActionTypes.ADD_QUESTION });
};

const handleAddSchoolSuccess = (
    dispatch: Dispatch<AddQuestionSetSuccess>,
    response: any
) => {
    dispatch({ type: QuestionActionTypes.ADD_QUESTION_SUCCESS, payload: response });
    history.push('/question');
};

const handleAddSchoolFail = (dispatch: Dispatch<AddQuestionSetFail>, response: any) => {
    setTimeout(() => {
        dispatch({ type: QuestionActionTypes.ADD_QUESTION_FAIL, payload: response });
    }, notificationMsg.duration);
};


//Add Question set

interface AddMoreQuestionSet {
    type: QuestionActionTypes.ADD_QUESTION;
}

interface AddMoreQuestionSetSuccess {
    type: QuestionActionTypes.ADD_QUESTION_SUCCESS;
    payload: any;
}

interface AddMoreQuestionSetFail {
    type: QuestionActionTypes.ADD_QUESTION_FAIL;
    payload: any;
}

export const AddMoreQuestionPost = (question: any): ThunkResult<void> => async dispatch => {
    handleAddMoreQuestionSet(dispatch);

    try {
        const response: AxiosResponse<any> = await baseAPI.put(`${QuestionSet.Question}${question.id}/`, question,
            { headers: { "Authorization": localStorage.getItem('token') } });
        if (response.data.status === true) {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleAddMoreQuestionSetSuccess(dispatch, response.data);
        } else {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleddMoreQuestionSetFail(dispatch, response.data);
        }
    } catch (e) {
        handleddMoreQuestionSetFail(dispatch, e);
    }
};

const handleAddMoreQuestionSet = (dispatch: Dispatch<AddMoreQuestionSet>) => {
    dispatch({ type: QuestionActionTypes.ADD_QUESTION });
};

const handleAddMoreQuestionSetSuccess = (
    dispatch: Dispatch<AddMoreQuestionSetSuccess>,
    response: any
) => {
    dispatch({ type: QuestionActionTypes.ADD_QUESTION_SUCCESS, payload: response });
    history.push('/question');
};

const handleddMoreQuestionSetFail = (dispatch: Dispatch<AddMoreQuestionSetFail>, response: any) => {
    setTimeout(() => {
        dispatch({ type: QuestionActionTypes.ADD_QUESTION_FAIL, payload: response });
    }, notificationMsg.duration);
};

// FETCH Student edit details

interface FetchQuestionSetId {
    type: QuestionActionTypes.FETCH_QUESTION_ID;
}

interface FetchQuestionSetSuccessId {
    type: QuestionActionTypes.FETCH_QUESTION_SUCCESS_ID;
    payload: any;
}

interface FetchQuestionSetFailId {
    type: QuestionActionTypes.FETCH_QUESTION_FAIL_ID;
}

export const fetchQuestionSet = (id: number): ThunkResult<void> => async dispatch => {    
    handleFetchQuestionSetId(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(`${QuestionSet.Question}${id}/?academic_year=2021`,
        { headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchQuestionSetSuccessId(dispatch, response.data);
    } catch (e) {
        handleFetchQuestionSetFailId(dispatch);
    }
};

export const handleFetchQuestionSetId = (dispatch: Dispatch<FetchQuestionSetId>) => {
    dispatch({ type: QuestionActionTypes.FETCH_QUESTION_ID });
};

const handleFetchQuestionSetSuccessId = (
    dispatch: Dispatch<FetchQuestionSetSuccessId>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.FETCH_QUESTION_SUCCESS_ID,
        payload: response,
        getData: response.data
    });
};

const handleFetchQuestionSetFailId = (dispatch: Dispatch<FetchQuestionSetFailId>) => {
    dispatch({
        type: QuestionActionTypes.FETCH_QUESTION_FAIL_ID
    });
};

export type QuestionAction =
    | FetchQuestionSetSuccess
    | FetchQuestionSetFail
    | FetchQuestionSetSuccessId
    | FetchQuestionSetFailId
    | AddMoreQuestionSetSuccess;