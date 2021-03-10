import * as React from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import ViewSubjectDetails from '../modules/subject/ViewSubjectDetails'
import EditSubject from '../modules/subject/EditSubject'
import AddNewSubject from '../modules/subject/AddNewSubject'
import ViewSchoolDetails from '../modules/school/ViewSchoolDetails'
import DashboardIndexPage from '../modules/dashboard/Index'
import ForgotPassword from '../modules/authentication/ForgotPassword'
import ResetPassword from '../modules/authentication/ResetPassword'
import AddNewSchool from '../modules/school/AddNewSchool'
import EditSchool from '../modules/school/EditSchool'
import history from '../History';
import {AuthRoutes, NonAuthRoutes, 
	SchoolManage, UserManagementUrl, StudentDetails, 
	TeacherDetails, DiaryList, NoticeBoard, Question } from './Roles';
import { UserRoles } from '../services/Constants'
import AuthRoute from './AuthRoute'
import BaseLayout from '../layout/BaseLayout';
import UnAuthorized from '../modules/errorhandlers/unautheration';
import UserLogin from '../modules/authentication/UserLogin';
import UserLoginPassword from '../modules/authentication/UserLoginPassword';
import UserRegister from '../modules/authentication/UserRegister';
import ViewClassesDetails  from '../modules/classes/ViewClassesDetails';
import AddNewClasses from '../modules/classes/AddNewClasses';
import EditClasses from '../modules/classes/EditClasses';
import SchoolAdminProfile from '../modules/school/SchoolAdminProfile';
import UserManagement from '../modules/usermanagement/UserManagement';
import AddUserManage  from '../modules/usermanagement/AddUserManage';
import EditUserManage from '../modules/usermanagement/EditUserManage';
import UserRegisterPassword from '../modules/authentication/UserRegisterPassword';
import OtpValidation from '../modules/authentication/OtpValidation';
import ViewStudentDetails from '../modules/student/ViewStudentDetails';
import AddStudent from '../modules/student/AddStudent';
import EditStudent from '../modules/student/EditStudent';
import TeacherView from '../modules/teacher/TeacherView';
import ViewFullDetailTeacher from '../modules/teacher/ViewFullDetailTeacher';
import AddSubject from '../modules/teacher/AddSubject';
import AddTeacher from '../modules/teacher/AddTeacher';
import ViewStudentFullDetails from '../modules/student/ViewStudentFullDetails';
import AddClassInCharge from '../modules/teacher/AddClassInCharge';
import EditTeacher from '../modules/teacher/EditTeacher';
import ViewDiaryDetails from '../modules/diary/ViewDiaryDetails';
import ViewNoticeBoard from '../modules/noticeboard/ViewNoticeBoard';
import ForgotOTPCheck from '../modules/authentication/ForgotOTPCheck';
import NotFoundPage from '../modules/errorhandlers/NotFoundPage';
import ViewQuestion from '../modules/questionset/ViewQuestion';
import AddQuestion from '../modules/questionset/AddQuestion';
import viewQuestionDetails from '../modules/questionset/viewQuestionDetails';
import AddMoreQuestion from '../modules/questionset/AddMoreQuestion';
import EditClassInCharge from '../modules/teacher/EditClassInCharge';
import EditTeacherSubject from '../modules/teacher/EditTeacherSubject';

const Pages: React.FC = () => (
  <Router history={history}>
      <Switch>
            <AuthRoute
              exact 
              path={AuthRoutes.dashboard}
              Component={DashboardIndexPage}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.acadamicAdmin), String(UserRoles.schoolAdmin), String(UserRoles.teacher)]}
            />        
           <AuthRoute
              exact 
              path={AuthRoutes.viewschooldetails}
              Component={ViewSchoolDetails}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.acadamicAdmin)]}
            /> 
            <AuthRoute
              exact 
              path={AuthRoutes.viewsubjectdetails}
              Component={ViewSubjectDetails}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            /> 
                              
          {/* School manage menu  */}
            <AuthRoute
              exact 
              path={AuthRoutes.addnewschool}
              Component={AddNewSchool}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.acadamicAdmin)]}
            />              
              <AuthRoute
              exact 
              path={AuthRoutes.editSubject}
              Component={EditSubject}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            /> 
            <AuthRoute
              exact 
              path={AuthRoutes.addSubject}
              Component={AddNewSubject}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            /> 
            <AuthRoute
              exact 
              path={AuthRoutes.editschool}
              Component={EditSchool}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.acadamicAdmin), String(UserRoles.schoolAdmin)]}
            /> 
             <AuthRoute
              exact 
              path={SchoolManage.viewclasses}
              Component={ViewClassesDetails}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
            <AuthRoute
              exact 
              path={SchoolManage.addclasses}
              Component={AddNewClasses}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
            <AuthRoute
              exact 
              path={SchoolManage.editclasses}
              Component={EditClasses}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
             <AuthRoute
              exact 
              path={AuthRoutes.viewSchool}
              Component={SchoolAdminProfile}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
            {/* User management details */}
            <AuthRoute
              exact 
              path={UserManagementUrl.userManageView}
              Component={UserManagement}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.acadamicAdmin)]}
            />
            <AuthRoute
              exact 
              path={UserManagementUrl.addUserManage}
              Component={AddUserManage}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin), String(UserRoles.acadamicAdmin)]}
            />
            <AuthRoute
              exact 
              path={UserManagementUrl.editUserManage}
              Component={EditUserManage}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin), String(UserRoles.acadamicAdmin)]}
            />
            {/* student menu list */}
              <AuthRoute
              exact 
              path={StudentDetails.studentView}
              Component={ViewStudentDetails}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
               <AuthRoute
              exact 
              path={StudentDetails.studentAdd}
              Component={AddStudent}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
              <AuthRoute
              exact 
              path={StudentDetails.studentEdit}
              Component={EditStudent}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
             <AuthRoute
              exact 
              path={StudentDetails.studnetFullDetails}
              Component={ViewStudentFullDetails}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
            
            {/* teacher menu list */}
            <AuthRoute
              exact 
              path={TeacherDetails.teacherView}
              Component={TeacherView}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
            <AuthRoute
              exact 
              path={TeacherDetails.teacherFullDetails}
              Component={ViewFullDetailTeacher}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
             <AuthRoute
              exact 
              path={TeacherDetails.addSubject}
              Component={AddSubject}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
             <AuthRoute
              exact 
              path={TeacherDetails.teacherAdd}
              Component={AddTeacher}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
            <AuthRoute
              exact 
              path={TeacherDetails.teacherEdit}
              Component={EditTeacher}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />            
            <AuthRoute
              exact 
              path={TeacherDetails.AddClassInCharge}
              Component={AddClassInCharge}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
             <AuthRoute
              exact 
              path={TeacherDetails.TeacherClassEdit}
              Component={EditClassInCharge}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
            <AuthRoute
              exact 
              path={TeacherDetails.TeacherSubjectEdit}
              Component={EditTeacherSubject}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin)]}
            />
            
            {/* Diary List */}
            <AuthRoute
              exact 
              path={DiaryList.diaryView}
              Component={ViewDiaryDetails}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin), String(UserRoles.teacher)]}
            />
            {/* Notice board List */}
            <AuthRoute
              exact 
              path={NoticeBoard.noticeView}
              Component={ViewNoticeBoard}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin), String(UserRoles.teacher)]}
            />
            {/* server side issues */}
            <AuthRoute
              exact 
              path={NonAuthRoutes.pageNoFound}
              Component={NotFoundPage}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin), String(UserRoles.acadamicAdmin), String(UserRoles.teacher)]}
            />
             {/* Question List */}
             <AuthRoute
              exact 
              path={Question.ViewQuestion}
              Component={ViewQuestion}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin), String(UserRoles.teacher)]}
            />
            <AuthRoute
              exact 
              path={Question.AddQuestion}
              Component={AddQuestion}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin), String(UserRoles.teacher)]}
            />
             <AuthRoute
              exact 
              path={Question.ViewQuestionlist}
              Component={viewQuestionDetails}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin), String(UserRoles.teacher)]}
            />
             <AuthRoute
              exact 
              path={Question.AddMoreQuestion}
              Component={AddMoreQuestion}
              LayoutComponent={BaseLayout}
              requiredRoles={[String(UserRoles.schoolAdmin), String(UserRoles.teacher)]}
            />
            <Route
              exact 
              path={NonAuthRoutes.login}
              component={UserLogin}
            />
              <Route
              exact 
              path={NonAuthRoutes.loginUser}
              component={UserLoginPassword}
            />
             <Route
              exact 
              path={NonAuthRoutes.userregister}
              component={UserRegister}
            />
              <Route
              exact path={NonAuthRoutes.userregisterpassword}
              component={UserRegisterPassword}
            />
               <Route
              exact path={NonAuthRoutes.userrotp}
              component={OtpValidation}
            />
              <Route
              exact 
              path={NonAuthRoutes.forgotpassword}
              component={ForgotPassword}
            />
             <Route
              exact 
              path={NonAuthRoutes.resetpassword}
              component={ResetPassword}
            />
            <Route
              exact 
              path={NonAuthRoutes.ForgotOTP}
              component={ForgotOTPCheck}
            />
            
            <Route path={NonAuthRoutes.unautheration} render={(props: any) => (<UnAuthorized/>)} />

            <Redirect from="/" to="/" />
   
        <Route component={() => <div>Not Found</div>} />
      </Switch>
    </Router>
  )

  
  export default Pages