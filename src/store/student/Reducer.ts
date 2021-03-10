import { Reducer } from 'redux';
import { StudentState, StudentActionTypes } from './Types';

export const initialState: StudentState = {
    items: [],
    loading: false,
    isAuthenticated: false,
    getParentStatus:false,
    errors: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0,
    parentDetails:[],
    parentList:false,
    ImageURL:[],
    getStudentEditResponse:[]
}

const reducer: Reducer<StudentState> = (state = initialState, action) => {
    switch (action.type) {
        case StudentActionTypes.ADD_STUDENT:
        case StudentActionTypes.DELETE_STUDENT:
        case StudentActionTypes.EDIT_STUDENT:
        case StudentActionTypes.FETCH_STUDENT:
        case StudentActionTypes.FETCH_STUDENT_ID:
        case StudentActionTypes.FETCH_PARENT:
        case StudentActionTypes.FETCH_STUDENT_IMAPGE:
            return { 
                ...state, 
                loading: true,
                isAuthenticated: false
            };

        case StudentActionTypes.ADD_STUDENT_SUCCESS:
            return { 
                ...state, 
                loading: false,
                isAuthenticated: true 
            }; 
        case StudentActionTypes.FETCH_STUDENT_IMAPGE_SUCCESS:
            const { ImageURL } = action;
            return { 
                ...state, 
                loading: false,
                isAuthenticated: true,
                items: action.payload,
                ImageURL: ImageURL
            }; 
        case StudentActionTypes.FETCH_STUDENT_SUCCESS:
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

            case StudentActionTypes.FETCH_STUDENT_SUCCESS_ID: 
            const { getStudentEditResponse } = action;
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                getStudentEditResponse: getStudentEditResponse
            };
            case StudentActionTypes.FETCH_PARENT_SUCCESS:     
            const { parentDetails } = action;  
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                parentDetails: parentDetails,
                getParentStatus:true
            };
            case StudentActionTypes.DELETE_STUDENT_SUCCESS:
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true
                };

            case StudentActionTypes.ADD_STUDENT_FAIL:
            case StudentActionTypes.DELETE_STUDENT_FAIL:
            case StudentActionTypes.EDIT_STUDENT_FAIL:                            
            case StudentActionTypes.FETCH_STUDENT_FAIL_ID:
            case StudentActionTypes.FETCH_PARENT_FAIL:
            case StudentActionTypes.FETCH_STUDENT_IMAPGE_FAIL:
            return {
                ...state,
                errors: action.payload,
                loading: false,
                isAuthenticated: false,
                getParentStatus:false
            };

            case StudentActionTypes.FETCH_STUDENT_FAIL:  
            
            return {
                ...state,
                errors: action.payload,
                loading: false,
                isAuthenticated: false,
                records:[]
            };

        default:
            return state;        
    }
}

export { reducer as studentReducer }