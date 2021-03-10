import { Reducer } from 'redux'
import { QuestionState, QuestionActionTypes } from './Types'

export const initialState: QuestionState = {
    items: [],
    loading: false,
    isAuthenticated: null,
    modelPop:false,
    errors: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0,
    QuestionId:'',
    getQuestionList:[]
}

const reducer: Reducer<QuestionState> = (state = initialState, action) => {
    switch (action.type) {
        case QuestionActionTypes.ADD_QUESTION:
        case QuestionActionTypes.DELETE_QUESTION:
        case QuestionActionTypes.EDIT_QUESTION:
        case QuestionActionTypes.FETCH_QUESTION:
        case QuestionActionTypes.FETCH_QUESTION_ID:
            return { 
                ...state, 
                loading: true 
            };

        case QuestionActionTypes.ADD_QUESTION_SUCCESS:
            return { 
                ...state, 
                loading: false,
                isAuthenticated: true 
            }; 
        case QuestionActionTypes.FETCH_QUESTION_SUCCESS:
            const { payload, records, per_page, page, total } = action;
            if(page === 1) {
                state.records = []
            }            
            return {
                ...state, 
                loading: false, 
                items: payload,
                page: page,
                per_page: per_page,
                records: [...state.records, ...records],
                total: total,
                totalPage: Math.ceil(total / per_page),
                isAuthenticated: false,
            }
        case QuestionActionTypes.FETCH_QUESTION_SUCCESS_ID:      
        const { getData } = action
        return {
            ...state, 
            loading: false, 
            items: action.payload,
            isAuthenticated: false,
            getQuestionList:getData
        };
        case QuestionActionTypes.ADD_QUESTION_FAIL:
        case QuestionActionTypes.DELETE_QUESTION_FAIL:
        case QuestionActionTypes.EDIT_QUESTION_FAIL:
        case QuestionActionTypes.FETCH_QUESTION_FAIL:            
        case QuestionActionTypes.FETCH_QUESTION_FAIL_ID:
            return {
                ...state,
                errors: action.payload,
                loading: false,
                isAuthenticated: true
            };
        default:
            return state;
    }
}

export { reducer as questionReducer }