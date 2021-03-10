import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxThunk, { ThunkMiddleware } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from "history";

import { schoolReducer } from './school/Reducer'
import { SchoolsAction } from './school/Actions';
import { SchoolsState } from './school/Types';

import { SubjectReducer } from './subject/Reducer'
import { SubjectsAction } from './subject/Actions';
import { SubjectsState } from './subject/Types';

//Login form details 
import { authenticationReducer } from './authentication/Reducer'
import { LoginAction } from './authentication/Actions'
import { AuthState } from './authentication/Types'

import { ProfileAction } from './profile/Actions'
import { ProfileReducer } from './profile/Reducer'
import { ProfileState } from './profile/Types'

import { ClassesAction } from './classes/Actions';
import { classesReducer } from './classes/Reducer';
import { ClassesState } from './classes/Type';

import { UserAction } from './usermanage/Actions';
import { userReducer } from './usermanage/Reducer';
import { UserState } from './usermanage/Type';

import { StudentAction } from './student/Actions';
import { studentReducer } from './student/Reducer';
import { StudentState } from './student/Types';

import { TeacherAction } from './teacher/Actions';
import { TeacherReducer } from './teacher/Reducer';
import { TeacherState } from './teacher/Type';

import { diaryReducer } from './diary/Reducer';
import { diaryState } from './diary/Types';

import { QuestionAction } from './question/Actions';
import { questionReducer } from './question/Reducer';
import { QuestionState } from './question/Types';

export interface RootState {
    schools: SchoolsState;
    login:AuthState;
    subjects: SubjectsState;
    profile: ProfileState;
    classes: ClassesState;
    userManage:UserState;
    student:StudentState;
    teacher:TeacherState;
    diary:diaryState;
    questionset:QuestionState;
}

const rootReducer = combineReducers<RootState>({
    login: authenticationReducer,
    schools: schoolReducer,
    subjects: SubjectReducer,
    profile: ProfileReducer,
    classes: classesReducer,
    userManage:userReducer,
    student:studentReducer,
    teacher:TeacherReducer,
    diary:diaryReducer,
    questionset:questionReducer
});


export type RootActions  = SchoolsAction & SubjectsAction & LoginAction & ClassesAction; // | CommentsAction | etc.
export type RootActionsType = UserAction & StudentAction & TeacherAction & ProfileAction & QuestionAction;

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(reduxThunk as ThunkMiddleware<RootState, RootActions, RootActionsType>)
    )
);

export default createBrowserHistory();