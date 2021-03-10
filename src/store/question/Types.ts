export interface QuestionState {
    items?: any,
    loading?: boolean,
    isAuthenticated?: boolean | null,
    modelPop?:boolean,
    errors?:any;
    page: number,
    per_page: number,
    records: any,
    total: number,
    QuestionId:string,
    getQuestionList?:any
}

export interface QuestionTypes {
    acsOrder?: boolean,
    recordPage?:any,
    academic_year?:any,
    search:string,
    grade?:string,
    standard?:string,
    hasMore:boolean,
    SortOrderData:string,
    OrderNameData:string
}


//Schools fetch details
export enum QuestionActionTypes {
  FETCH_QUESTION = 'FETCH_QUESTION',
  FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS',
  FETCH_QUESTION_FAIL = 'FETCH_QUESTION_FAIL',
  FETCH_QUESTION_ID = 'FETCH_QUESTION_ID',
  FETCH_QUESTION_SUCCESS_ID = 'FETCH_QUESTION_SUCCESS_ID',
  FETCH_QUESTION_FAIL_ID = 'FETCH_QUESTION_FAIL_ID',
  ADD_QUESTION = 'ADD_QUESTION',
  ADD_QUESTION_SUCCESS = 'ADD_QUESTION_SUCCESS',
  ADD_QUESTION_FAIL = 'ADD_QUESTIONL_FAIL',
  EDIT_QUESTION = 'EDIT_QUESTION',
  EDIT_QUESTION_SUCCESS = 'EDIT_QUESTION_SUCCESS',
  EDIT_QUESTION_FAIL = 'EDIT_QUESTION_FAIL',
  DELETE_QUESTION = 'DELETE_QUESTION',
  DELETE_QUESTION_SUCCESS = 'DELETE_QUESTION_SUCCESS',
  DELETE_QUESTION_FAIL = 'DELETE_QUESTION_FAIL'
}