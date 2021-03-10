export interface SchoolDetailsType extends ApiResponse {
    id?:number,
    school_name : string,
    address : string,
    contact_persons : [{
        name : string,
        designation : string,
        phone_number : string,
        email_id : string
    }],
    category : string,
    school_coordinates : [{
        latitude : string,
        longitude : string
    }],
    acadamic_start_month: string,
    acadamic_end_month : string
    start_time:string;
    end_time:string;
    }
export type ApiResponse = Record<string, any>

export interface SchoolFieldsType  {
        id?:number,
        school_name : string;
        address : string;
        name : string;
        designation : string;
        phone_number : string;
        email_id : string;
        category : string;
        latitude : string;
        longitude : string;
        acadamic_start_month: string;
        acadamic_end_month : string;
        start_time: any;
        end_time: any;
    }

    export interface SchoolFieldsEditType  {
        id?:number,
        schoolName : string;
        addressSchool : string;
        nameSchool : string;
        designationSchool : string;
        phoneNumber : string;
        emailId : string;
        category : string;
        latitude : string;
        longitude : string;
        acadamicStartMonth: string;
        acadamicEndMonth : string;
        startTime: any;
        endTime: any;
    }
    export interface SchoolTypes {
        [id: number]: SchoolDetailsType;
    }

export interface SchoolsState {
    loading: boolean;
    items: SchoolTypes;
    isAuthenticated: boolean | null;
    modelPop?:boolean;
    errors?:any
    page: number,
    per_page: number,
    records: any,
    total: number
}

export interface TokenType {
    token:string
}
//Schools fetch details
export enum SchoolsActionTypes {
    FETCH_SCHOOLS = 'FETCH_SCHOOLS',
    FETCH_SCHOOLS_SUCCESS = 'FETCH_SCHOOLS_SUCCESS',
    FETCH_SCHOOLS_FAIL = 'FETCH_SCHOOLS_FAIL',
    FETCH_SCHOOL_ID = 'FETCH_SCHOOL_ID',
    FETCH_SCHOOL_SUCCESS_ID = 'FETCH_SCHOOL_SUCCESS_ID',
    FETCH_SCHOOL_FAIL_ID = 'FETCH_SCHOOL_FAIL_ID',
    ADD_SCHOOL = 'ADD_SCHOOL',
    ADD_SCHOOL_SUCCESS = 'ADD_SCHOOL_SUCCESS',
    ADD_SCHOOL_FAIL = 'ADD_SCHOOL_FAIL',
    EDIT_SCHOOL = 'EDIT_SCHOOL',
    EDIT_SCHOOL_SUCCESS = 'EDIT_SCHOOL_SUCCESS',
    EDIT_SCHOOL_FAIL = 'EDIT_SCHOOL_FAIL',
    DELETE_SCHOOL = 'DELETE_SCHOOL',
    DELETE_SCHOOL_SUCCESS = 'DELETE_SCHOOL_SUCCESS',
    DELETE_SCHOOL_FAIL = 'DELETE_SCHOOL_FAIL'
}


