export interface userType {
    id?:number;
    ldap_id?:string;
    firstname: string;
    lastname: string;
    email_id: string;
    phone_number: string;
    role: string;
    school_id: string,
    timezone: string,
    school_name?:string,
    is_active?:any
}

export interface userEditType {
    id?:number;
    ldap_id?:string;
    firstnameUser: string;
    lastnameUser: string;
    emailId: string;
    phoneNumber: string;
    roleUser: string;
    schoolId: string,
    timezone: string,
    schoolName?:string,
    is_active?:string
}

export interface userManageTypes {
    [id: number]: userType;
}
export interface CategoryFieldsType {
    id?:number,
    school_name: string;
}
export interface UserState {
    loading: boolean;
    items: userManageTypes;
    isAuthenticated: boolean | null;
    category: CategoryFieldsType[];
    page: number,
    per_page: number,
    records: any,
    total: number
}

export enum UserActionTypes {
    FETCH_USER = 'FETCH_USER',
    FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
    FETCH_USER_FAIL = 'FETCH_USER_FAIL',
    FETCH_USER_ID = 'FETCH_USER',
    FETCH_USER_SUCCESS_ID = 'FETCH_USER_SUCCESS_ID',
    FETCH_USER_FAIL_ID = 'FETCH_USER_FAIL_ID',
    FETCH_USER_CATEGORY = 'FETCH_USER_CATEGORY',
    FETCH_USER_SUCCESS_CATEGORY = 'FETCH_USER_SUCCESS_CATEGORY',
    FETCH_USER_FAIL_CATEGORY = 'FETCH_USER_FAIL_CATEGORY',
    ADD_USER = 'ADD_USER',
    ADD_USER_SUCCESS = 'ADD_USER_SUCCESS',
    ADD_USER_FAIL = 'ADD_USER_FAIL',
    EDIT_USER = 'EDIT_USER',
    EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS',
    EDIT_USER_FAIL = 'EDIT_USER_FAIL',
    DELETE_USER = 'DELETE_USER',
    DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS',
    DELETE_USER_FAIL = 'DELETE_USER_FAIL'
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
    deleteUserManageId:any,
    hasMore:boolean,
    userManageData:any,
    prev:number,
    next:number,
    acsOrder:boolean,
    page:number,
    search:string,
    SortOrderData:string,
    OrderNameData:string,
    role?:string
  }