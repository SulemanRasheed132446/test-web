export interface AUTHAPITYPE {
    CHECKUSER:string,
    LOGIN:string,
    FORGOTPASSWORD:string,
    RESETPASSWORD:string,
    REGISTERUSER:string
    LOGOUT:string,
    PROFILE:string,
    OTPCHECK:string,
    GENERATOTP:string,
    CHECKTOKENVALIDATION:string
}

export const AUTHAPI: AUTHAPITYPE = {
    CHECKUSER:"/auth/checkuser/",
    LOGIN:"/auth/login/?app=web",
    FORGOTPASSWORD:"/auth/password/",
    RESETPASSWORD:"/auth/resetpassword/",
    REGISTERUSER:"/auth/register/",
    LOGOUT:'/auth/logout/',
    PROFILE:'/auth/profile/',
    OTPCHECK:"/auth/verifyotp/",
    GENERATOTP:"/auth/generateotp/",
    CHECKTOKENVALIDATION:"/auth/validatetoken/"
};

export interface SCHOOLMANGETYPE {
    SCHOOLMANAGEVIEW:string,
    SCHOOLMANAGEDELETE:string,
    CLASSES:string,
    GRADELIST:string,
    GRADESTANDARD:string
}
export const SCHOOLMANAGE: SCHOOLMANGETYPE ={
    SCHOOLMANAGEVIEW:'/api/school/',
    SCHOOLMANAGEDELETE:'/api/users/deactivate/',
    CLASSES:'/api/classes/',
    GRADELIST:'/api/lovs/grade/',
    GRADESTANDARD:'/api/lovs/standard'
}

export interface SUBJECTMANGETYPE {
    SUBJECTMANAGEVIEW:string,
    SUBJECTMANAGEDELETE:string,
    SubjectList:string
}
export const SUBJECTMANAGE: SUBJECTMANGETYPE ={
    SUBJECTMANAGEVIEW:'/api/subject/',
    SUBJECTMANAGEDELETE:'/api/users/deactivate/',
    SubjectList:'/api/subject/getallsubject/'
}

export interface CATEGORYMANAGETYPE {
    CATEGORYMANAGEVIEW:string
}
export const CATEGORYMANAGE: CATEGORYMANAGETYPE = {
    CATEGORYMANAGEVIEW:'/api/lovs/subject_category/'
}

export interface subjectRequestData {
    "url": "/api/subject/",
}

export const USERNAMENAGE = {
    USERMANAGE:'/auth/user/',
    GETUSER:'/auth/getusers/',
    GETSCHOOLCATEGORY:'/api/school/schoollist'
}

export const STUDENTS = {
    STUDENTS:'/api/students/',
    CHECKPARENT:'/auth/parentcheck/',
    STUDNETSIMAGEUPDATE:'/api/students/uploadprofile/'
}

export const IMAGEUPLOAD = {
    STUDENTIMAGEUPLOAD:'/api/students/uploadprofile/'
}

export const DIARYAPI = {
    DIARY:'/api/diary/',
    GETALLSTUDENTLIST:'/api/classes/getallstandards/',
    GETSTUDENTLIST:'/api/classes/studentlist/',
    DIARYAPIIMAGEUPDATE:'/api/diary/upload/',
    GETALLSTUDENTSEARCHLIST: '/api/students/getallstudents/'
}

export const Teacher = {
    TeacherPost:'/api/teacher/subjectmapping/',
    TeacherId:'/api/teacher/details/',
    TeacherClass:'api/teacher/classincharge/',
    TeacherSubjectClassEdit:'/api/teacher/details/'
}

export const QuestionSet = {
    Question:'/api/questionset/'
}

export const NoticesBoard = {
    noticeboard:'/api/notice_board/',
    noticeboardImage:'/api/notice_board/upload/'
}