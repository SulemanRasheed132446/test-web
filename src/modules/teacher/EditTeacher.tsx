import React from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import { AddTeacherForm } from './AddTeacherForm';
import { EditTeacherPost, fetchTeacherPostId } from '../../store/teacher/Actions';
import { teacherDetails } from '../../store/teacher/Type';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../../store/Index';
import SpinnerLoader from '../../components/spinner/SpinnerLoader';

interface OwnTeacherEditFormProps extends RouteComponentProps<OwnPropsParams> {
    EditTeacherPost: (student: any) => void;
    fetchTeacherPostId: (id: string) => void;
    loading: boolean;    
    errorMessage: any;
    getTeacherId:any;
    getTeacherData:any;
};
export class EditTeacher extends React.Component<OwnTeacherEditFormProps> {
    componentDidMount(): void {
        this.props.fetchTeacherPostId(String(this.props.match.params.id)); 
    }
    render() {
        const { loading } = this.props;
        const loadingTeacher = { display: loading ? "block" : "none" };
        const getEditDetails:any = this.props.getTeacherData;
        const getTeacherData = getEditDetails.data;
        let teacherfirstname: any;
        let teacherlastname: any;
        let teacheremailId: any;
        let teacherphoneno: any;
        let teacherrole: any;
        let teacherschoolId: any;
        let teacheruserId: any;
        let teacherldapId: any;
        if(getTeacherData){
            if (getTeacherData) {
                teacherfirstname = getTeacherData.firstname;
                teacherlastname = getTeacherData.lastname;
                teacheremailId = getTeacherData.email;
                teacherphoneno = getTeacherData.phone_number;
                teacherrole = getTeacherData.role;
                teacherschoolId = getTeacherData.school_id;
                teacheruserId = getTeacherData.id;
                teacherldapId = this.props.match.params.id;
            }
        }
        const initialTeacherEditValues: teacherDetails = {
            teacherfirstname: teacherfirstname,
            teacherlastname: teacherlastname,
            teacheremailid: teacheremailId,
            teacherphonenumber: teacherphoneno,
            teacherrole: teacherrole,
            id: teacheruserId,
            school_id: teacherschoolId,
            ldap_id: teacherldapId,
            timezone: 'Asia/Kolkata'
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
                                mainPageTitle={['Edit Teacher']} />
                                { teacherfirstname && teacheremailId ?
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card-box">
                                            <div className="card-head">
                                                <header>Edit Teacher</header>
                                            </div>
                                            <div className="card-body">
                                                <AddTeacherForm
                                                    initialValues={initialTeacherEditValues}
                                                    onSubmit={this.props.EditTeacherPost} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            : <SpinnerLoader />}
                        </div>
                    </div>
                </div>
                <div style={loadingTeacher}><SpinnerLoader /></div>
            </div>
        )
    }
}
interface OwnPropsParams {
    id: string;
}
const mapStateToProps = ({teacher}: RootState, ownProps: RouteComponentProps<OwnPropsParams>) => {
    return {
        getTeacherId:teacher.items[Number(ownProps.match.params.id)],
        loading:teacher.loading,
        errorMessage: teacher.errors,
        getTeacherData:teacher.items
    };
}

export default connect(mapStateToProps, { fetchTeacherPostId, EditTeacherPost })(EditTeacher)
