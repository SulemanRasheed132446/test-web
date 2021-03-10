import React from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import { AddTeacherForm } from './AddTeacherForm';
import { AddTeacherPost } from '../../store/teacher/Actions';
import { teacherDetails } from '../../store/teacher/Type';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'

const initialTeacherValues: teacherDetails = {
    teacherfirstname: '',
    teacherlastname: '',
    teacheremailid: '',
    teacherphonenumber: '',
    teacherrole: 'Teacher',
    timezone: 'Asia/Kolkata'
}
export type OwnTeacherFormProps = {
    AddTeacherPost: (userManage: any) => void;
    loading: boolean;
};
export class AddTeacher extends React.Component<OwnTeacherFormProps> {

    render() {
        const { loading } = this.props;
        const loadingTeacherAdd = { display: loading ? "block" : "none" };
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
                                mainPageTitle={['Add Teacher']} />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card-box">
                                        <div className="card-head">
                                            <header>Add Teacher</header>
                                        </div>
                                        <div className="card-body">
                                            <AddTeacherForm
                                                initialValues={initialTeacherValues}
                                                onSubmit={this.props.AddTeacherPost} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={loadingTeacherAdd}><SpinnerLoader /></div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.teacher.loading
    };
}

export default connect(mapStateToProps, { AddTeacherPost })(AddTeacher)
