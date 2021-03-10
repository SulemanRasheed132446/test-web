//Schools fetch details
export enum StudentActionTypes {
    FETCH_STUDENT = 'FETCH_STUDENT',
    FETCH_STUDENT_SUCCESS = 'FETCH_STUDENT_SUCCESS',
    FETCH_STUDENT_FAIL = 'FETCH_STUDENT_FAIL',
    FETCH_STUDENT_ID = 'FETCH_STUDENT_ID',
    FETCH_STUDENT_SUCCESS_ID = 'FETCH_STUDENT_SUCCESS_ID',
    FETCH_STUDENT_FAIL_ID = 'FETCH_STUDENT_FAIL_ID',
    FETCH_PARENT = 'FETCH_PARENT',
    FETCH_PARENT_SUCCESS = 'FETCH_PARENT_SUCCESS',
    FETCH_PARENT_FAIL = 'FETCH_PARENT_FAIL',
    ADD_STUDENT = 'ADD_STUDENT',
    ADD_STUDENT_SUCCESS = 'ADD_STUDENT_SUCCESS',
    ADD_STUDENT_FAIL = 'ADD_STUDENT_FAIL',
    EDIT_STUDENT = 'EDIT_STUDENT',
    EDIT_STUDENT_SUCCESS = 'EDIT_STUDENT_SUCCESS',
    EDIT_STUDENT_FAIL = 'EDIT_STUDENT_FAIL',
    DELETE_STUDENT = 'DELETE_STUDENT',
    DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS',
    DELETE_STUDENT_FAIL = 'DELETE_STUDENT_FAIL',
    FETCH_STUDENT_IMAPGE = 'FETCH_STUDENT_IMAPGE',
    FETCH_STUDENT_IMAPGE_SUCCESS = 'FETCH_STUDENT_IMAPGE_SUCCESS',
    FETCH_STUDENT_IMAPGE_FAIL = 'FETCH_STUDENT_IMAPGE_FAIL'
}

export interface StudentType {
    id?:number,
    school_id?:string,
    phone_number:string,
    email_id:string,
    student_id?:string,
    student_name:string,
    grade:string,
    standard:string,
    parent_firstname?:string,
    parent_lastname?:string,
    academic_year?:string,
    profile_picture?:string,
    user_id?:string
}
export interface StudentTypes {
    [id: number]: StudentType;
}

export interface StudentState {
    loading: boolean;
    items: StudentTypes;
    isAuthenticated: boolean | null;
    errors?:any
    page: number,
    per_page: number,
    records: any,
    total: number,
    parentDetails?: any,
    getParentStatus?:boolean | null,
    parentList?:boolean,
    ImageURL?:any,
    getStudentEditResponse?:any
}

export interface CategoryStudentType  {
    id?:number,
    name: string;
}



export interface studentInputTypes {
    id?:number,
    school_id?:string,
    phone_number:string,
    email_id:string,
    student_id?:string,
    student_name:string,
    grade:string,
    standard:string,
    parent_firstname?:string,
    parent_lastname?:string,
    academic_year?:string,
    profile_picture?:string,
    user_id?:string,
    checkParentList?:boolean,
    formik?:any
}