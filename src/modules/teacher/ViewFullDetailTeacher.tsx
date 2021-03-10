import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import BreadCrumb from '../../components/BreadCrumb'
import { fetchTeacherPostId, FetchSubjectMappingPost, fetchClassInchargeMappingPost } from '../../store/teacher/Actions';
import { RouteComponentProps } from 'react-router';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';
import CommonLoader from '../../components/CommonLoader';
import { fetchGetAllClassList } from '../../store/diary/Actions';
import { GetCorrectSubject } from '../../store/subject/Actions';
import history from '../../History';
import {TeacherDetails} from '../../router/Roles';

interface OwnTeacherViewFormProps extends RouteComponentProps<OwnPropsParams> {
    fetchTeacherPostId: (id: string) => void;
    FetchSubjectMappingPost: (teacherDetails: any) => void;
    fetchClassInchargeMappingPost: (classIncharge:any) =>void;
    fetchGetAllClassList: (postValue:any) => void;
    GetCorrectSubject: (postValue:any) => void;
    loading: boolean;
    errorMessage: any;
    getTeacherViewId: any;
    getTeacherViewData: any;
    getTeacherid: any;
    deleteDetails: any;
    page: number;
    per_page: number;
    totalPage: number;
    records: any;
    classInchargeRecords:any
    total: number;
    ClassNameList: any;
    SubjectList: any,
    getSubjectClasslist:any;
    totalSubjectClassCount:any;
    totalClassCount:any;
};

export class ViewFullDetailTeacher extends React.Component<OwnTeacherViewFormProps> {
    getClassId: any = [];
    getSubjectId:any = [];
    mapClassSubject: any = [];
    mappingClassData: any = [];
    classInchargeList:any = [];
    componentDidMount(): void {
        this.props.fetchTeacherPostId(String(this.props.match.params.id));
        const postValue = {
            academic_year:'2020'
        }
        this.props.fetchGetAllClassList(postValue);
        this.props.GetCorrectSubject(postValue);
        this.getTeacherDetails();
    }
    getTeacherDetails() {
        if (this.props.match.params.id) {
            const postValue: any = {
                page_no: 1,
                academic_year: 2021,
                teacher_id: this.props.match.params.id
            }
            this.props.FetchSubjectMappingPost(postValue);
            this.props.fetchClassInchargeMappingPost(postValue);
        }
    }
    updateSubjectClass(getValue:any, getTeacherId:any){
        let classIdData;
        if(getValue.class_id) {            
            classIdData = getValue.class_id.map((el:any)=>parseInt(el))            
            getValue['class_id'] = classIdData;
        }
        history.push({
            pathname: TeacherDetails.TeacherSubjectEdit,
            state: {
              class_id: getValue.class_id,
              teacherId: getTeacherId,
              class_name: getValue.class_name,
              subject_id: getValue.subject_id
            }
          })
    }
    updateClass(getClassId:any, getTeacherId:any){
        let classId:any;
        let classNameList:any;
        if(getClassId.length > 0){
            getClassId.forEach((items:any) =>{
                classId = items.class_id;
                classNameList = items.class_name;
            })
        }
        history.push({
            pathname: TeacherDetails.TeacherClassEdit,
            state: {
              class_id: classId,
              class_name:classNameList,
              teacherId: getTeacherId
            }
          })
    }
    render() {  
        const getsubjectMapping:any = this.props.getSubjectClasslist;
        const getClassIncharge:any = this.props.classInchargeRecords;
        let TeacherList: any
        let InchargeList:any
        let classInchargeList:any = [];
        if (getsubjectMapping) {
            TeacherList = getsubjectMapping        
                if (TeacherList) {
                    TeacherList.forEach((element:any) => {                        
                        if(element){
                            const classid = element.class_id;
                            if(classid){
                                let pushClassName:any = [];                            
                                element.class_id.forEach((classId:any, index:any)=>{
                                    if (this.props.ClassNameList) {                            
                                      let getClassList =  this.props.ClassNameList.find((item:any)=> item.id === parseInt(classId)) 
                                      if(getClassList){
                                        pushClassName.push(getClassList.grade_standard);                          
                                      }                          
                                      element['class_name'] = pushClassName;
                                    } 
                                })
                            }
                        
                        }                       
                         
                        if (this.props.SubjectList) {  
                            let SubjectList:any = this.props.SubjectList.data;
                            if(SubjectList) {
                                let getSubjectList =  SubjectList.find((item:any)=> item.id === parseInt(element.subject_id))   
                                if(getSubjectList) {
                                    element['Subject_name'] = getSubjectList.name;
                                }
                            }
                        }
                    });    
            }                     
        }
        if (getClassIncharge) {
            InchargeList = getClassIncharge            
                if (InchargeList) {           
                   let classNameArray:any = [];
                   classInchargeList = [];
                    InchargeList.forEach((element:any, index:any) => {
                        if (this.props.ClassNameList) {                            
                          let getClassList =  this.props.ClassNameList.find((item:any)=> item.id === parseInt(element)) 
                          if(getClassList){
                            classNameArray.push(getClassList.grade_standard);
                          }   
                                         
                        }  
                    });   
                     const getClassInchargeDetails = {
                            class_name: classNameArray,
                            class_id: InchargeList
                          }
                          classInchargeList.push(getClassInchargeDetails)    
            }            
        }
        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['Teacher']}
                                homeName={['Home']}
                                url={['dashboard']}
                                baseName={['Teacher']}
                                baseURL={['teacher']}
                                mainPageTitle={['Teacher Profile']} />
                            <div className="row">
                                <div className="col-md-11">

                                </div>
                                <div className="col-md-1 mb-2">
                                    <Link to={'/teacher'} className="btn btn-info btn-circle pull-right">Back</Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    {this.props.getTeacherViewData ?
                                        <div className="profile-sidebar">
                                            <div className="card card-topline-aqua">
                                                <div className="card-body no-padding height-9">
                                                    <div className="row">
                                                        <div className="profile-userpic">
                                                            <img src="../assets/img/user/teacher-profile.jpg" className="img-responsive" alt="" /> </div>
                                                    </div>
                                                    <div className="profile-usertitle">
                                                        <div className="profile-usertitle-name">{this.props.getTeacherViewData.firstname} {this.props.getTeacherViewData.lastname}</div>
                                                    </div>
                                                    <ul className="list-group list-group-unbordered">
                                                        <li className="list-group-item">
                                                            <div className="row">
                                                            <div className="col-md-6">
                                                            <b>Phone Number </b>
                                                            </div>
                                                            <div className="col-md-6">
                                                            <div className="profile-desc-item">{this.props.getTeacherViewData.phone_number}</div>
                                                            </div>
                                                            </div> 
                                                        </li>
                                                        <li className="list-group-item">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                            <b>Email Id </b>
                                                            </div>
                                                            <div className="col-md-6">
                                                            <div className="profile-desc-item">{this.props.getTeacherViewData.email}</div>
                                                            </div>
                                                            </div>                                                             
                                                        </li>
                                                        <li className="list-group-item">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                            <b>Designation</b>
                                                            </div>
                                                            <div className="col-md-6">
                                                            <div className="profile-desc-item">{this.props.getTeacherViewData.role}</div>
                                                            </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div className="row list-separated profile-stat">
                                                        <div className="col-md-4 col-sm-4 col-6">
                                                        </div>
                                                        <div className="col-md-4 col-sm-4 col-6">
                                                            <div className="uppercase profile-stat-title"> {this.props.totalSubjectClassCount} </div>
                                                            <div className="uppercase profile-stat-text"> Total Class </div>
                                                        </div>
                                                        <div className="col-md-4 col-sm-4 col-6">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        : <SpinnerLoader />}
                                    <div className="profile-content">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card card-topline-red">
                                                <div className="card-head">
                                                    <header>Subject & Class Mapping</header>
                                                        <div className="pull-right mr-3 mb-2 mt-1">
                                                            <Link to={'/map_subject'}>
                                                                <button className="btn btn-pink">Map Subject</button>
                                                            </Link>
                                                            
                                                             </div>
                                                    </div>
                                                    <div className="card-body no-padding height-9">
                                                        <div className="row">
                                                            <div className="table-responsive">
                                                                <table className="table table-striped custom-table table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>
                                                                                <button
                                                                                    title="Ascending order"
                                                                                    className="headerBold">
                                                                                    Subject&nbsp;
                                                                                    <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                                                                                </button>
                                                                            </th>
                                                                            <th>
                                                                                <button
                                                                                    title="Ascending order" className="headerBold">
                                                                                    Class&nbsp;
                                                                                    <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                                                                                </button>
                                                                            </th>
                                                                            {/* <th>Action</th> */}
                                                                        </tr>
                                                                    </thead>
                                                                    {getsubjectMapping.length > 0 ?
                                                                        <tbody>
                                                                            {getsubjectMapping.map((element:any) => (

                                                                                <tr>
                                                                                    <td >{element.Subject_name}</td>
                                                                                    <td >{element.class_name.map((classInfo:any) => (
                                                                                     <span className="btn btn-pink btn-circle">{classInfo}</span>   
                                                                                    )) }</td>
                                                                                    {/* <th>
                                                                                    <button className="btn btn-primary btn-xs"  onClick={() => this.updateSubjectClass(element, this.props.match.params.id)}
                                                                                    title="Edit Class"><i className="fa fa-pencil" aria-hidden="true" ></i></button></th> */}
                                                                                </tr> 
                                                                            )                                                                                  
                                                                            )}
                                                                        </tbody>
                                                                        : <CommonLoader />}
                                                                </table>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="card card-topline-red">
                                                <div className="card-head">
                                                    <header>Class Incharge</header>
                                                        <div className="pull-right mr-3 mb-2 mt-1">
                                                     
                                                        <div className="tools">
                                                        {getClassIncharge.length > 0 ?
                                                              null
                                                            :
                                                            <>
                                                            <Link to={'/class_incharge_add'}>
                                                            <button className="btn btn-pink p-2">Add Class</button>
                                                           </Link>
                                                           </>}
                                                        </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-body no-padding height-9">
                                                        <div className="row">
                                                            <div className="table-responsive">
                                                                <table className="table table-striped custom-table table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>
                                                                                <button
                                                                                    title="Ascending order"
                                                                                    className="headerBold">
                                                                                    Class Incharge&nbsp;
                                                                                    <i className="fa fa-sort-amount-asc" aria-hidden="true"></i>
                                                                                </button>
                                                                            </th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    {classInchargeList.length > 0 ? 
                                                                    <tbody>
                                                                        {classInchargeList.map((items: any) => (
                                                                            <>
                                                                            {items.class_name.length > 0?
                                                                            <tr>
                                                                                <td >{items.class_name.map((classInfo:any) => (
                                                                                     <span className="btn btn-pink btn-circle">{classInfo}</span>   
                                                                                    )) }</td>
                                                                                <td> 
                                                                                    
                                                                                    <button className="btn btn-primary btn-xs"
                                                                                    title="Edit Class" onClick={() => this.updateClass(classInchargeList, this.props.match.params.id)}><i className="fa fa-pencil" aria-hidden="true" 
                                                                                    ></i></button>
                                                                                </td>
                                                                            </tr>
                                                                            :<CommonLoader />}
                                                                            </>
                                                                        ))}

                                                                    </tbody>
                                                                    :null}
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

interface OwnPropsParams {
    id: string;
}
const mapStateToProps = (state: any, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        getTeacherViewId: state.teacher.items[Number(ownProps.match.params.id)],
        loading: state.teacher.loading,
        errorMessage: state.teacher.errors,
        getTeacherViewData: state.teacher.GetTeacherProfile,
        getTeacherid: state.teacher.TeacherId,
        records: state.teacher.records,
        ClassNameList: state.diary.gradelist,
        SubjectList: state.subjects.category,
        getSubjectClasslist: state.teacher.getSubjectClass,
        classInchargeRecords: state.teacher.classRecords,
        totalSubjectClassCount: state.teacher.SubjectTotal,
        totalClassCount: state.teacher.classTotal

    };
}

export default connect(mapStateToProps, { fetchTeacherPostId, 
    FetchSubjectMappingPost, 
    fetchGetAllClassList, 
    GetCorrectSubject, 
    fetchClassInchargeMappingPost })(ViewFullDetailTeacher)
