import { Reducer } from 'redux'
import { SchoolsActionTypes, SchoolsState } from './Types'

export const initialState: SchoolsState = {
    items: [],
    loading: false,
    isAuthenticated: null,
    modelPop:false,
    errors: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0
}

const reducer: Reducer<SchoolsState> = (state = initialState, action) => {
    switch (action.type) {
        case SchoolsActionTypes.FETCH_SCHOOL_ID:
        case SchoolsActionTypes.FETCH_SCHOOLS:
        case SchoolsActionTypes.ADD_SCHOOL:
        case SchoolsActionTypes.EDIT_SCHOOL:
            return { 
                ...state, 
                loading: true 
            };

        case SchoolsActionTypes.ADD_SCHOOL_SUCCESS:
            return { 
                ...state, 
                loading: false,
                isAuthenticated: true 
            }; 
        
        case SchoolsActionTypes.FETCH_SCHOOLS_SUCCESS:
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
        
        case SchoolsActionTypes.FETCH_SCHOOL_SUCCESS_ID:       
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false, 
                modelPop: false 
            };
           
        case SchoolsActionTypes.DELETE_SCHOOL_SUCCESS:
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true
                };
        case SchoolsActionTypes.FETCH_SCHOOL_FAIL_ID:
        case SchoolsActionTypes.FETCH_SCHOOLS_FAIL:
        case SchoolsActionTypes.EDIT_SCHOOL_FAIL:
        case SchoolsActionTypes.DELETE_SCHOOL_FAIL:            
        case SchoolsActionTypes.ADD_SCHOOL_FAIL:
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

export { reducer as schoolReducer }