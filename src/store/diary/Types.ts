export interface diaryType  extends ApiResponse {
   school_id: string,
   class_list: [{
       class_id: string,
       is_all: boolean
     }],
   student_list: [{
       student_id: string,
       student_name: string,
       parent_id: string
     }],
   subject_id: string,
   diary_type: string,
   title: string,
   message: string,
   images: string,
   reply: [{
       parent_id: string,
       message: string
     }]
 }
export type ApiResponse = Record<string, any>
  export interface DiaryTypes {
        [id: number]: diaryType;
    }

export interface diaryState {
    loading: boolean;
    items: DiaryTypes;
    isAuthenticated: boolean | null;
    errors?:any
    page: number,
    per_page: number,
    records: any,
    total: number,
    studentList?:any,
    classList?:any,
    gradelist?:any,
    getImageURL?:any,
    getClassList?:any,
    getStudentList?:any
}

export interface diaryList {
   classlist?:any,
   studentlist?:any,
   fruites?:any,
   checkedListAll?:any,
   ItemsChecked?:any,
   ShowStudentList?:any,
   selected?:any,
   setSelected?:any,
   images?:any,
   setImages?:any,
   maxNumber?:number,
   AllStudent?:any,
   getClass?:string, 
   search?: string,
   SortOrderData?:any,
   OrderNameData?:any,
   page?:any,
   studentList?:any,
   SelectValue?:string,
   standardlist?: any,
   allstudentslist?: any,
   currentCheckboxAllStudent?: boolean,
   currentSelectedStandard?: any,
   selectedDiariesList?: any,
   getDiaryImage?:any
   }
//Diary fetch details
export enum DiaryActionTypes {
   FETCH_DIARY = 'FETCH_DIARY',
   FETCH_DIARY_SUCCESS = 'FETCH_DIARY_SUCCESS',
   FETCH_DIARY_FAIL = 'FETCH_DIARY_FAIL',
   FETCH_DIARY_ID = 'FETCH_DIARY_ID',
   FETCH_DIARY_SUCCESS_ID = 'FETCH_DIARY_SUCCESS_ID',
   FETCH_DIARY_FAIL_ID = 'FETCH_DIARY_FAIL_ID',
   FETCH_STUDENT_LIST_ID = 'FETCH_STUDENT_LIST_ID',
   FETCH_STUDENT_LISTSUCCESS_ID = 'FETCH_STUDENT_LIST_SUCCESS_ID',
   FETCH_STUDENT_LIST_FAIL_ID = 'FETCH_STUDENT_LIST_FAIL_ID',
   FETCH_ALLCLASS_LIST_ID = 'FETCH_ALLCLASS_LIST_ID',
   FETCH_ALLCLASS_LIST_SUCCESS_ID = 'FETCH_ALLCLASS_LIST_SUCCESS_ID',
   FETCH_ALLCLASS_LIST_FAIL_ID = 'FETCH_ALLCLASS_LIST_FAIL_ID',
   FETCH_SEARCH_STUDENT_LIST="FETCH_SEARCH_STUDENT_LIST",
   FETCH_SEARCH_STUDENT_LIST_SUCCESS="FETCH_SEARCH_STUDENT_LIST",
   FETCH_SEARCH_STUDENT_LIST_FAIL="FETCH_SEARCH_STUDENT_LIST",
   ADD_DIARY = 'ADD_DIARY',
   ADD_DIARY_SUCCESS = 'ADD_DIARY_SUCCESS',
   ADD_DIARY_FAIL = 'ADD_DIARY_FAIL',
   EDIT_DIARY = 'EDIT_DIARY',
   EDIT_DIARY_SUCCESS = 'EDIT_DIARY_SUCCESS',
   EDIT_DIARY_FAIL = 'EDIT_DIARY_FAIL',
   DELETE_DIARY = 'DELETE_DIARY',
   DELETE_DIARY_SUCCESS = 'DELETE_DIARY_SUCCESS',
   DELETE_DIARY_FAIL = 'DELETE_DIARY_FAIL',
   ADD_DIARY_IMAGE = 'DIARY_IMAGE_UPDATE',
   ADD_DIARY_IMAGE_SUCCESS = 'DIARY_IMAGE_UPDATE',
   ADD_DIARY_IMAGE_FAIL = 'DIARY_IMAGE_UPDATE'
}

export interface DiaryPostTypes { 
  class_id:string, 
  studentslist: 
  [
    {
    studendid:string,
    studenname:string}
  ], 
  all: boolean 
}