// This file holds our state type, as well as any other types related to this Redux store.

// Use `enum`s for better autocompletion of action type names. These will
// be compiled away leaving only the final value in your compiled code.
//
// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.

export interface SubjectFieldsType extends ApiResponse {
    id?:number,
    category: string;
    name: string;
    short_name: string;
    school_id : string;
    created_by?: string;
 }
export interface CategoryFieldsType extends ApiResponse {
    id?:number,
    name: string;
}
export interface SubjectTypes {
    [id: number]: SubjectFieldsType;
}

export interface SubjectEditType {
    id?:number,
    category: string;
    subjectName: string;
    shortName: string;
    schoolId : string;
 }
export interface SubjectsState {
    items: SubjectTypes,
    loading: boolean,
    isAuthenticated: boolean | null,
    modelPop?:boolean,
    category: CategoryFieldsType[],
    errors?:any;
    page: number,
    per_page: number,
    records: any,
    total: number,
    GetCorrectSubject?:any
}
export type ApiResponse = Record<string, any>

export interface TokenType {
 token:string
}
export interface loadMoreType {
    page_no:number;
    search?:string;
    sort_by?:string;
    order_by?:string;
}
//Subjects fetch details
export enum SubjectsActionTypes {
 FETCH_SUBJECTS = 'FETCH_SUBJECTS',
 FETCH_SUBJECTS_SUCCESS = 'FETCH_SUBJECTS_SUCCESS',
 FETCH_SUBJECTS_FAIL = 'FETCH_SUBJECTS_FAIL',
 FETCH_SUBJECT_ID = 'FETCH_SUBJECT_ID',
 FETCH_SUBJECT_SUCCESS_ID = 'FETCH_SUBJECT_SUCCESS_ID',
 FETCH_SUBJECT_FAIL_ID = 'FETCH_SUBJECT_FAIL_ID',
 ADD_SUBJECT = 'ADD_SUBJECT',
 ADD_SUBJECT_SUCCESS = 'ADD_SUBJECT_SUCCESS',
 ADD_SUBJECT_FAIL = 'ADD_SUBJECT_FAIL',
 EDIT_SUBJECT = 'EDIT_SUBJECT',
 EDIT_SUBJECT_SUCCESS = 'EDIT_SUBJECT_SUCCESS',
 EDIT_SUBJECT_FAIL = 'EDIT_SUBJECT_FAIL',
 DELETE_SUBJECT = 'DELETE_SUBJECT',
 DELETE_SUBJECT_SUCCESS = 'DELETE_SUBJECT_SUCCESS',
 DELETE_SUBJECT_FAIL = 'DELETE_SUBJECT_FAIL',
 FETCH_PROFILEINFO ='FETCH_PROFILEINFO',
 FETCH_PROFILEINFO_SUCCESS ='FETCH_PROFILEINFO_SUCCESS',
 FETCH_PROFILEINFO_FAIL ='FETCH_PROFILEINFO_FAIL'
}
export enum CategoryActionTypes {
    FETCH_CATEGORY = 'FETCH_CATEGORY',
    FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS',
    FETCH_CATEGORY_FAIL = 'FETCH_CATEGORY_FAIL',
    FETCH_SUBJECT_LIST ='FETCH_SUBJECT_LIST',
    FETCH_SUBJECT_LIST_SUCCESS ='FETCH_PROFILEINFO_SUCCESS',
    FETCH_SUBJECT_LIST_FAIL ='FETCH_SUBJECT_LIST_FAIL'
   }

export interface ISearchBarState {
    show:boolean,
    showDelete:boolean,
    addShow: boolean,
    acadamicAdmin: boolean,
    schoolAdmin: boolean,
    bothData:boolean,
    teacher: boolean,
    parent: boolean,
    deleteSubjectId:any,
    query:string,
    hasMore:boolean,
    subjectsData:any,
    prev:number,
    next:any,
    acsOrder:boolean,
    descOrder:boolean,
    subjectsTotal:number,
    getResponseData?:any,
    page:number,
    sortOrder?:string | undefined,
    orderName?:string | undefined,
    search?:string | undefined,
    SortOrderData:string,
    OrderNameData:string
  }