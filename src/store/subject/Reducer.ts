import { Reducer } from 'redux'
import { SubjectsActionTypes, SubjectsState, CategoryActionTypes } from './Types'

export const initialState: SubjectsState = {
    items: [],
    loading: false,
    isAuthenticated: null,
    modelPop:false,
    category: [],
    errors: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0,
    GetCorrectSubject:[]
}

const reducer: Reducer<SubjectsState> = (state = initialState, action) => {
    switch (action.type) {
        case SubjectsActionTypes.FETCH_SUBJECT_ID:
        case SubjectsActionTypes.FETCH_SUBJECTS:
        case SubjectsActionTypes.ADD_SUBJECT:
        case SubjectsActionTypes.EDIT_SUBJECT:
        case CategoryActionTypes.FETCH_CATEGORY:
        case CategoryActionTypes.FETCH_SUBJECT_LIST:
            return { 
                ...state, 
                loading: true 
            };

        case SubjectsActionTypes.FETCH_SUBJECT_FAIL_ID:
        case SubjectsActionTypes.FETCH_SUBJECTS_FAIL:
        case CategoryActionTypes.FETCH_CATEGORY_FAIL:
        case CategoryActionTypes.FETCH_SUBJECT_LIST_FAIL:
        case SubjectsActionTypes.EDIT_SUBJECT_FAIL:
        case SubjectsActionTypes.ADD_SUBJECT_FAIL:
            return {
                ...state,
                errors: action.payload,
                loading: false,
                isAuthenticated: true
            };

        case SubjectsActionTypes.ADD_SUBJECT_SUCCESS:
        case SubjectsActionTypes.EDIT_SUBJECT_SUCCESS:
            return { 
                ...state, 
                loading: false,
                isAuthenticated: true,
                errors:[]
            };

        case SubjectsActionTypes.FETCH_SUBJECT_SUCCESS_ID:
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false, 
                modelPop: false 
            };

        case SubjectsActionTypes.FETCH_SUBJECTS_SUCCESS:
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
    
        case SubjectsActionTypes.DELETE_SUBJECT_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false,
                isAuthenticated: true
            };           
            
        case CategoryActionTypes.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.payload,
                loading: false
            }
        case CategoryActionTypes.FETCH_SUBJECT_LIST_SUCCESS:
            const { StudentData } = action;
            return {
                ...state,
                GetCorrectSubject: StudentData,
                loading: false
            }
        default:
            return state;
    }
}
export { reducer as SubjectReducer }