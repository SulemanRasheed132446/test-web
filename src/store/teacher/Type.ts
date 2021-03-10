export interface TeacherType {
        id?:number;
        ldap_id?:string;
        firstname: string;
        lastname: string;
        email_id: string;
        phone_number: string;
        role: string;
        school_id?: string,
        timezone?: string,
        school_name?:string,
        is_active?:any
}
export interface TeacherTypes {
    [id: number]: TeacherType;
}
export interface TeacherState {
    items: TeacherTypes,
    loading: boolean,
    isAuthenticated: boolean | null,
    modelPop?:boolean,
    errors?:any;
    page: number,
    per_page: number,
    records: any,
    total: number,
    TeacherId:string,
    GetTeacherProfile?:any,
    getSubjectClass?:any,
    classPage: number,
    classPer_page: number,
    classRecords: any,
    classTotal: number,
    getSubjectMapping?:any,
    SubjectTotal?:any
}

export interface teacherDetails {
    teacherfirstname: string,
    teacherlastname: string,
    teacheremailid: string,
    teacherphonenumber: string,
    teacherrole: string,
    school_id?: string,
    timezone?:string,
    id?:number,
    ldap_id?:string
}

//TEACHER ACTION TYPES
export enum TeacherActionTypes {
    FETCH_TEACHER = 'FETCH_TEACHER',
    FETCH_TEACHER_SUCCESS = 'FETCH_TEACHER_SUCCESS',
    FETCH_TEACHER_FAIL = 'FETCH_TEACHER_FAIL',
    FETCH_TEACHER_MAPPING = 'FETCH_TEACHER_MAPPING',
    FETCH_TEACHER_MAPPING_SUCCESS = 'FETCH_TEACHER_MAPPING_SUCCESS',
    FETCH_TEACHER_MAPPING_FAIL = 'FETCH_TEACHER_MAPPING_FAIL',    
    FETCH_CLASS_INCHARGE_MAPPING = 'FETCH_CLASS_INCHARGE_MAPPING',
    FETCH_CLASS_INCHARGE_MAPPING_SUCCESS = 'FETCH_CLASS_INCHARGE_MAPPING_SUCCESS',
    FETCH_CLASS_INCHARGE_MAPPING_FAIL = 'FETCH_CLASS_INCHARGE_MAPPING_FAIL',
    FETCH_TEACHER_ID = 'FETCH_TEACHER_ID',
    FETCH_TEACHER_SUCCESS_ID = 'FETCH_TEACHER_SUCCESS_ID',
    FETCH_TEACHER_FAIL_ID = 'FETCH_TEACHER_FAIL_ID',
    ADD_TEACHER = 'ADD_TEACHER',
    ADD_TEACHER_SUCCESS = 'ADD_TEACHER_SUCCESS',
    ADD_TEACHER_FAIL = 'ADD_TEACHERT_FAIL',
    EDIT_TEACHER = 'EDIT_TEACHER',
    EDIT_TEACHER_SUCCESS = 'EDIT_TEACHER_SUCCESS',
    EDIT_TEACHER_FAIL = 'EDIT_TEACHER_FAIL',
    DELETE_TEACHER = 'DELETE_TEACHER',
    DELETE_TEACHER_SUCCESS = 'DELETE_TEACHER_SUCCESS',
    DELETE_TEACHER_FAIL = 'DELETE_TEACHER_FAIL'
   }

   export interface EditClasslist {
    ClassList:any
}