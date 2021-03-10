export interface ProfilelDetailsType extends ApiResponse {
    id?:number,
    email: string,
    firstname: string,
    usertype: number,
    lastname: string,
    school_id: string,
    role: string,
    timezone: string,
    school_name: string
}
export type ApiResponse = Record<string, any>

export interface ProfileState {
    loading: boolean;
    items: any;
    isAuthenticated: boolean | null;
    schoolId:string;
    profileData:any;
}

//Schools fetch details
export enum ProfileActionTypes {
    FETCH_PROFILE = 'FETCH_PROFILE',
    FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS',
    FETCH_PROFILE_FAIL = 'FETCH_PROFILE_FAIL',
    TOKEN_VALIDATION_REQUEST = "TOKEN_VALIDATION_REQUEST",
    TOKEN_VALIDATION_ERROR = "TOKEN_VALIDATION_ERROR",
    TOKEN_VALIDATION_SUCCESS = "TOKEN_VALIDATION_SUCCESS"
}