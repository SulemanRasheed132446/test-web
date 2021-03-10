import { Reducer } from 'redux'
import { TeacherState, TeacherActionTypes } from './Type'

export const initialState: TeacherState = {
    items: [],
    loading: false,
    isAuthenticated: null,
    modelPop:false,
    errors: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0,
    TeacherId:'',
    GetTeacherProfile:[],
    getSubjectClass:[],
    classPage:1,
    classPer_page:10,
    classRecords:[],
    classTotal:0,
    getSubjectMapping:[],
    SubjectTotal:0
}

const reducer: Reducer<TeacherState> = (state = initialState, action) => {
    switch (action.type) {
            case TeacherActionTypes.FETCH_TEACHER_ID:
            case TeacherActionTypes.FETCH_TEACHER:
            case TeacherActionTypes.ADD_TEACHER:
            case TeacherActionTypes.EDIT_TEACHER:
            case TeacherActionTypes.FETCH_TEACHER_MAPPING:
            case TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING:
                return { 
                    ...state, 
                    loading: true,
                    errors:[]
                };
    
            case TeacherActionTypes.FETCH_TEACHER_FAIL_ID:
            case TeacherActionTypes.ADD_TEACHER_FAIL:
            case TeacherActionTypes.EDIT_TEACHER_FAIL:
            case TeacherActionTypes.FETCH_TEACHER_FAIL:
            case TeacherActionTypes.FETCH_TEACHER_MAPPING_FAIL:
            case TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_FAIL:
                const { getResponseError } = action;
                return {
                    ...state,
                    errors: getResponseError,
                    loading: false,
                    isAuthenticated: true
                };
    
            case TeacherActionTypes.ADD_TEACHER_SUCCESS:
                return { 
                    ...state, 
                    loading: false,
                    isAuthenticated: true,
                    errors:[] 
                };
    
            case TeacherActionTypes.FETCH_TEACHER_SUCCESS_ID:
                const { TeacherId, TeacherProfile } = action;
                return {
                    ...state, 
                    loading: false, 
                    items: action.payload,
                    isAuthenticated: false, 
                    TeacherId: TeacherId,
                    GetTeacherProfile:TeacherProfile,
                    errors:[]
                };
    
            case TeacherActionTypes.FETCH_TEACHER_SUCCESS:
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
                    errors:[],
                }

                case TeacherActionTypes.FETCH_TEACHER_MAPPING_SUCCESS:
                    const { getSubjectList, Subject_per_page, Subject_page, Subject_total } = action;
                    if(Subject_page === 1) {
                        state.getSubjectClass = []
                    }            
                    return {
                        ...state, 
                        loading: false, 
                        items: action.payload,
                        page: Subject_page,
                        per_page: Subject_per_page,
                        getSubjectClass: [...state.getSubjectClass, ...getSubjectList],
                        total: Subject_total,
                        totalPage: Math.ceil(Subject_total / Subject_per_page),
                        isAuthenticated: false,
                        errors:[],
                        SubjectTotal:Subject_total
                    }

                case TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_SUCCESS:
                    const { classRecords, classPer_page, classPage, classTotal } = action;
                    if(classPage === 1) {
                        state.classRecords = []
                    }            
                    return {
                        ...state, 
                        loading: false, 
                        items: action.payload,
                        classPage: classPage,
                        classPer_page: classPer_page,
                        classRecords: classRecords,
                        isAuthenticated: false,
                        errors:[],
                        classTotal:classTotal
                    }
            case TeacherActionTypes.DELETE_TEACHER_SUCCESS:
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true,
                    errors:[]
                };   
        default:
            return state;
    }
}
export { reducer as TeacherReducer }