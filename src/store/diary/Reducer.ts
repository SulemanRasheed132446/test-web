import { Reducer } from 'redux'
import { DiaryActionTypes, diaryState } from './Types';

export const initialState: diaryState = {
    items: [],
    loading: false,
    isAuthenticated: null,
    errors: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0,
    studentList: [],
    classList:[],
    getImageURL:[],
    getClassList:[],
    getStudentList:[]
}

const reducer: Reducer<diaryState> = (state = initialState, action) => {
    switch (action.type) {
        case DiaryActionTypes.ADD_DIARY:
        case DiaryActionTypes.FETCH_ALLCLASS_LIST_ID:
        case DiaryActionTypes.FETCH_DIARY:
        case DiaryActionTypes.FETCH_DIARY_ID:
        case DiaryActionTypes.FETCH_STUDENT_LIST_ID: 
        case DiaryActionTypes.ADD_DIARY_IMAGE:  
            return {
                ...state,
                loading: true,
                gradelist:[],
                getClassList:[],
                getStudentList:[]
            };
        case DiaryActionTypes.ADD_DIARY_FAIL:
        case DiaryActionTypes.DELETE_DIARY_FAIL:
        case DiaryActionTypes.EDIT_DIARY_FAIL:
        case DiaryActionTypes.FETCH_ALLCLASS_LIST_FAIL_ID:
        case DiaryActionTypes.FETCH_DIARY_FAIL:
        case DiaryActionTypes.FETCH_DIARY_FAIL_ID:
        case DiaryActionTypes.FETCH_STUDENT_LIST_FAIL_ID:
        case DiaryActionTypes.FETCH_SEARCH_STUDENT_LIST: 
        case DiaryActionTypes.FETCH_SEARCH_STUDENT_LIST_FAIL: 
        case DiaryActionTypes.FETCH_SEARCH_STUDENT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                getSearchStudentList: action.payload
            };
        case DiaryActionTypes.ADD_DIARY_IMAGE_FAIL: 
            return {
                ...state,
                errors: action.payload,
                loading: false,
                isAuthenticated: true
            };

        case DiaryActionTypes.ADD_DIARY_SUCCESS:            
            return {
                ...state,
                loading: false,
                data: action.payload,
                isAuthenticated: false,
                modelPop: false
            };
        case DiaryActionTypes.ADD_DIARY_IMAGE_SUCCESS:
        const { ImageURL } = action;
        return { 
            ...state, 
            isAuthenticated: true,
            loading: false,
            items: action.payload,
            getImageURL: ImageURL
        }; 
        case DiaryActionTypes.FETCH_DIARY_SUCCESS:
            let classList:any;
            let studentList:any;
            const { payload, records, per_page, page, total } = action;
            if(records){
                records.forEach((item:any)=>{                   
                    classList = item.class_list;
                    studentList = item.student_list;
                })
            }
            if (page === 1) {
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
                getClassList:classList,
                getStudentList:studentList
            }

            case DiaryActionTypes.FETCH_ALLCLASS_LIST_SUCCESS_ID:
            return {
                ...state,
                loading: false,
                gradelist: action.payload
            };

            case DiaryActionTypes.FETCH_STUDENT_LISTSUCCESS_ID:
            return {
                ...state,
                loading: false,
                standardList: action.payload
            };
            default:
                return state;
    }
}

export { reducer as diaryReducer }