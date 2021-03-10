import React from 'react';
import { connect } from 'react-redux';
import { fetchSchoolsPost } from '../../store/school/Actions'
import { Field, Formik, Form } from 'formik';
import { RootState } from '../../store/Index';
import { FormGroup } from '@material-ui/core';
import { SchoolFieldsType } from '../../store/school/Types'
import { Link } from 'react-router-dom';
import BreadCrumb from '../../components/BreadCrumb'
import history from '../../History';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { LoadMoreType } from '../../components/type';
import { TextField } from 'formik-material-ui';
import moment from 'moment';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export interface PostsListProps {
    loading: boolean
    schoolDetails: any;
    fetchSchoolsPost: (loadMoreType: LoadMoreType) => any;
}
const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 13.067439,
    lng: 80.237617
};

class SchoolAdminProfile extends React.Component<PostsListProps>  {
    componentDidMount(): void {
        const postValue = {
            page_no: 1
        }
        this.props.fetchSchoolsPost(postValue);
    }

    render() {
        const getToken = localStorage.getItem('token');
        if (!getToken) {
            history.push("/");
        }
        const getAdminDetail: any = this.props.schoolDetails;
        let schoolAdmin;
        let schoolName;
        let position: any;
        let contactPersonsName;
        let contactPersonsDesignation;
        let contactPersonsPhoneNumber;
        let contactPersonsemailId;
        let contactPersons;
        let schoolCoordinates;
        let latitude;
        let longitude;
        let getStatTime;
        let getEndTime;
        let schoolAdminId;
        let schoolAdminName;
        let schoolAdminAddress;
        let schoolAdminStartTime;
        let schoolAdminEndTime;
        let schoolAdminCategory;
        if (getAdminDetail) {
            const getRecodeList = getAdminDetail;
            if (getRecodeList.length > 0) {
                schoolAdmin = getRecodeList[0];
                schoolName = schoolAdmin.school_name;
                contactPersons = schoolAdmin.contact_persons;
                schoolCoordinates = schoolAdmin.school_coordinates;
                schoolAdminId = schoolAdmin.id;
                schoolAdminName = schoolAdmin.school_name;
                schoolAdminAddress = schoolAdmin.address;
                schoolAdminStartTime = schoolAdmin.acadamic_start_month;
                schoolAdminEndTime = schoolAdmin.acadamic_end_month;
                schoolAdminCategory = schoolAdmin.category;
            }
            if (schoolAdmin) {
                getStatTime = schoolAdmin.start_time;
                getEndTime = schoolAdmin.end_time;
            }
            if (schoolCoordinates) {
                position = {
                    lat: parseFloat(schoolCoordinates[0].latitude),
                    lng: parseFloat(schoolCoordinates[0].longitude)
                }
                latitude = schoolCoordinates[0].latitude;
                longitude = schoolCoordinates[0].longitude;
            }
            if (contactPersons) {
                contactPersonsName = contactPersons[0].name;
                contactPersonsDesignation = contactPersons[0].designation;
                contactPersonsPhoneNumber = contactPersons[0].phone_number;
                contactPersonsemailId = contactPersons[0].email_id;
            }
        }

        const initialSchoolManage: SchoolFieldsType = {
            id: schoolAdminId,
            school_name: schoolAdminName,
            address: schoolAdminAddress,
            name: contactPersonsName,
            designation: contactPersonsDesignation,
            phone_number: contactPersonsPhoneNumber,
            email_id: contactPersonsemailId,
            category: schoolAdminCategory,
            latitude: latitude,
            longitude: longitude,
            acadamic_start_month: schoolAdminStartTime,
            acadamic_end_month: schoolAdminEndTime,
            start_time: moment(getStatTime, ["h:mm A"]).format("HH:mm"),
            end_time: moment(getEndTime, ["h:mm A"]).format("HH:mm")
        }

        return (
            <div>
                <div className="page-wrapper">
                    <div className="page-content-wrapper">
                        <div className="page-content pt-3">
                            <BreadCrumb
                                titleName={['School']}
                                homeName={['Home']}
                                url={['dashboard']}
                                mainPageTitle={['View School']} />
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-12">
                                    {getAdminDetail && schoolName && schoolAdmin ?
                                        <div className="card">                                          
                                            <div className="card-head card-topline-red">                                            
                                                <header>View School</header>
                                                <div className="tools">
                                                    <Link to={"/edit_school/" + schoolAdmin.id}>
                                                        <button
                                                            className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-circle btn-primary"
                                                            title="Edit Profile">Edit <i className="fa fa-pencil" aria-hidden="true" ></i></button>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="card-body no-padding height-9">
                                                <Formik
                                                    initialValues={initialSchoolManage} onSubmit={(values, formikHelpers) => {

                                                    }}>
                                                    {({ values, errors, isSubmitting, isValidating, dirty, touched }) => (
                                                        <Form>
                                                            <div>

                                                                <div className="mb-3">
                                                                    <div className="row">
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div className="mdl-textfield 
                                                                            mdl-js-textfield mdl-textfield--floating-label 
                                                                            txt-full-width pt-0">
                                                                                <FormGroup>
                                                                                    <Field
                                                                                        label='School Name*'
                                                                                        type="text"
                                                                                        name="school_name"
                                                                                        component={TextField}
                                                                                        className="textfield__input"
                                                                                        disabled={false}
                                                                                    />
                                                                                </FormGroup>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 categoryPadding">
                                                                            <div className="mdl-textfield 
                                                                            mdl-js-textfield mdl-textfield--floating-label 
                                                                            txt-full-width mt-2 pt-0">
                                                                                <FormGroup>
                                                                                    <Field
                                                                                        label='Category*'
                                                                                        type="text"
                                                                                        name="category"
                                                                                        component={TextField}
                                                                                        className="textfield__input"
                                                                                        disabled={false}
                                                                                    />
                                                                                </FormGroup>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                    <div className="row">
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield 
                                                                                mdl-js-textfield mdl-textfield--floating-label 
                                                                                txt-full-width pt-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            label='Contact Person Name*'
                                                                                            type="text"
                                                                                            name="name"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield 
                                                                                mdl-js-textfield mdl-textfield--floating-label 
                                                                                txt-full-width pt-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            label='Contact Person Designation*'
                                                                                            type="text"
                                                                                            name="designation"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield 
                                                                                mdl-js-textfield mdl-textfield--floating-label 
                                                                                txt-full-width pt-0  pb-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            label='Contact Person Phone Number*'
                                                                                            type="text"
                                                                                            name="phone_number"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield 
                                                                                mdl-js-textfield mdl-textfield--floating-label 
                                                                                txt-full-width pt-0 pb-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            label='Contact Person Email Id*'
                                                                                            type="text"
                                                                                            name="email_id"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="p-t-20">
                                                                        <div className="mdl-textfield 
                                                                        mdl-js-textfield mdl-textfield--floating-label 
                                                                        txt-full-width">
                                                                            <FormGroup>
                                                                                <Field
                                                                                    name="address"
                                                                                    component={TextField}
                                                                                    label="Address*"
                                                                                    className="textfield__input"
                                                                                    rows="1"
                                                                                    disabled={false}
                                                                                />
                                                                            </FormGroup>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield 
                                                                                mdl-js-textfield mdl-textfield--floating-label 
                                                                                txt-full-width pt-0  pb-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            type="time"
                                                                                            name="start_time"
                                                                                            label="Start Time*"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                            InputLabelProps={{
                                                                                                shrink: true,
                                                                                            }}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield 
                                                                                mdl-js-textfield mdl-textfield--floating-label 
                                                                                txt-full-width pt-0  pb-0">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            type="time"
                                                                                            name="end_time"
                                                                                            label="End Time*"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                            InputLabelProps={{
                                                                                                shrink: true,
                                                                                            }}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield 
                                                                                mdl-js-textfield mdl-textfield--floating-label 
                                                                                txt-full-width">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            label='Academic Start Month*'
                                                                                            type="text"
                                                                                            name="acadamic_start_month"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 p-t-20">
                                                                            <div>
                                                                                <div className="mdl-textfield 
                                                                                mdl-js-textfield mdl-textfield--floating-label 
                                                                                txt-full-width">
                                                                                    <FormGroup>
                                                                                        <Field
                                                                                            label='Academic End Month*'
                                                                                            type="text"
                                                                                            name="acadamic_end_month"
                                                                                            component={TextField}
                                                                                            className="textfield__input"
                                                                                            fullwidth="true"
                                                                                            disabled={false}
                                                                                        />
                                                                                    </FormGroup>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mt-3 mb-3">
                                                                        <LoadScript
                                                                            googleMapsApiKey="AIzaSyCk__DGKYrWV5NmfnpWvVJeiV5kuyC8MmQ"
                                                                        >
                                                                            <GoogleMap
                                                                                mapContainerStyle={containerStyle}
                                                                                center={center}
                                                                                zoom={15}
                                                                            >
                                                                                <Marker
                                                                                    position={position}
                                                                                    draggable={true}
                                                                                />
                                                                                <></>
                                                                            </GoogleMap>
                                                                        </LoadScript>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Form>
                                                    )}
                                                </Formik>

                                            </div>
                                        </div>
                                        : <div><SpinnerLoader /></div>}
                                </div>
                                <div className="col-md-2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ schools }: RootState) => {
    return {
        schoolDetails: schools.records,
        loading: schools.loading
    };
};

export default connect(
    mapStateToProps, { fetchSchoolsPost }
)(SchoolAdminProfile);