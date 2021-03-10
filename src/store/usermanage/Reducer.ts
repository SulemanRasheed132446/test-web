import { Reducer } from 'redux';
import { UserActionTypes, UserState } from './Type'

export const initialState: UserState = {
    items: [],
    loading: false,
    isAuthenticated: null,
    category: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0
}

const reducer: Reducer<UserState> = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER:
        case UserActionTypes.ADD_USER:
        case UserActionTypes.DELETE_USER:
        case UserActionTypes.EDIT_USER:
        case UserActionTypes.FETCH_USER_ID:
        case UserActionTypes.FETCH_USER_CATEGORY:
            return { 
                ...state, 
                loading: true 
            };

        case UserActionTypes.FETCH_USER_FAIL:
        case UserActionTypes.FETCH_USER_FAIL_ID:
        case UserActionTypes.EDIT_USER_FAIL:
        case UserActionTypes.DELETE_USER_FAIL:
        case UserActionTypes.ADD_USER_FAIL:
        case UserActionTypes.ADD_USER_SUCCESS:
        case UserActionTypes.EDIT_USER_SUCCESS:
        case UserActionTypes.FETCH_USER_FAIL_CATEGORY:
            return { 
                ...state, 
                loading: false,
                isAuthenticated: true 
            }; 

       
        case UserActionTypes.FETCH_USER_SUCCESS_ID:
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false
            };
        case UserActionTypes.FETCH_USER_SUCCESS:
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
        case UserActionTypes.DELETE_USER_SUCCESS:
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true
                };
        case UserActionTypes.FETCH_USER_SUCCESS_CATEGORY:
                return {
                    ...state,
                    category: action.payload,
                    loading: false
                }
        default:
            return state;
    }
}

export { reducer as userReducer }