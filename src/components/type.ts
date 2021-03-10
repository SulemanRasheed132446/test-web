export interface LoadMoreType {
    page_no:number;
    search?:string;
    sort_by?:string;
    order_by?:string;
    academic_year?:string;
}

export interface CommonState {
    show?: boolean,
    showDelete?: boolean,
    addShow?: boolean,
    acadamicAdmin?: boolean,
    schoolAdmin?: boolean,
    bothData?: boolean,
    teacher?: boolean,
    parent?: boolean,
    deleteClassesId?: any,
    query?: string,
    hasMore?: any,
    classData?: any,
    prev?: number,
    next?: number,
    acsOrder?: boolean,
    descOrder?: boolean,
    subjectsTotal?: number,
    page?: any,
    per_page?:  number | undefined,
    records?: any,
    total?: number,
    totalPage?: number,
    search?: string,
    SortOrderData?: string,
    OrderNameData?: string,
    deleteStudentId?: any,
    studentData?: any,
    checkedstudent?:boolean,
    academic_year?:any,
    class_id?:any
    deleteTeacherId?:any,
    TeacherData?:any,
    role?:any,
    grade?:any,
    standard?:any,
    page_no?: any
  }


  export interface TecherMapping {
    academic_year: string,
    teacher_id: string,
    subject_class?: any,
    class_incharge?: any
  }