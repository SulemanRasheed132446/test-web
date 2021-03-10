import React from 'react';
import { connect } from 'react-redux';
import { Field, Formik, Form } from 'formik';
import { SchoolDetailsType, SchoolFieldsType } from '../../store/school/Types'
import { Button, FormGroup, MenuItem } from '@material-ui/core';
import { CATEGORY, MONTHLIST } from '../../services/Constants'
import { addSchool } from '../../store/school/Actions';
import BreadCrumb from '../../components/BreadCrumb'
import history from '../../History';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { TextField } from 'formik-material-ui';
import SpinnerLoader from '../../components/spinner/SpinnerLoader'
import { RootState } from '../../store/Index'
import { SchoolValidation } from './SchoolValidation'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 13.067439,
    lng: 80.237617
};

const position = {
    lat: 13.067439,
    lng: 80.237617
}
const initialSchoolValues: SchoolFieldsType = {
    school_name: '',
    address: '',
    name: '',
    designation: '',
    phone_number: '',
    email_id: '',
    category: '',
    latitude: '',
    longitude: '',
    acadamic_start_month: '',
    acadamic_end_month: '',
    start_time: '',
    end_time: ''
}

export type OwnSchoolFormProps = {
    addSchool: (school: SchoolDetailsType) => void;
    loading: boolean;
    errorMessage: any;
};
type SchoolState = { latitude: '', longitude: '' };

class AddNewSchool extends React.Component<OwnSchoolFormProps, SchoolState>  {
    formik:any;
    public onMarkerDragEnd = ({ e }: { e: any }) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        this.setState({
            latitude: lat,
            longitude: lng,
        })
    };
    componentDidUpdate() { 
        if(this.props.errorMessage.length === undefined){
            this.formik.setFieldError("school_name", this.props.errorMessage.data.school_name);
            this.formik.setFieldError("category", this.props.errorMessage.data.category); 
            this.formik.setFieldError("name", this.props.errorMessage.data.name);  
            this.formik.setFieldError("designation", this.props.errorMessage.data.designation);  
            this.formik.setFieldError("phone_number", this.props.errorMessage.data.phone_number); 
            this.formik.setFieldError("email_id", this.props.errorMessage.data.email_id); 
            this.formik.setFieldError("address", this.props.errorMessage.data.address);  
            this.formik.setFieldError("start_time", this.props.errorMessage.data.start_time); 
            this.formik.setFieldError("end_time", this.props.errorMessage.data.end_time);   
            this.formik.setFieldError("acadamic_start_month", this.props.errorMessage.data.acadamic_start_month);  
            this.formik.setFieldError("acadamic_end_month", this.props.errorMessage.data.acadamic_end_month);           
        }        
    }
     // Synchronous validation

    render() {
        const { loading } = this.props;
        const loadingTextCSS = { display: loading ? "block" : "none" };
        const getToken = localStorage.getItem('token');
        const lat = this.state ? this.state.latitude : '';
        const lng = this.state ? this.state.longitude : '';
        const CategoryList:any = CATEGORY;
        const MonthList:any = MONTHLIST;
        if (!getToken) {
            history.push("/");
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
                                mainPageTitle={['Add School']}
                                baseName={['School']}
                                baseURL={['school']} />
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card-box">
                                        <div className="card-head">
                                            <header>Add School</header>
                                        </div>
                                        <div className="card-body">
                                        <Formik
                                            ref={node=>this.formik = node}
                                            validationSchema={SchoolValidation}                                            
                                            initialValues={initialSchoolValues} 
                                           
                                            onSubmit={(values, actions) => {
                                                const startTime = values.start_time;
                                                const endTime = values.end_time;

                                                const initialValuesList: SchoolDetailsType = {
                                                    school_name: values.school_name,
                                                    address: values.address,
                                                    contact_persons: [{
                                                        name: values.name,
                                                        designation: values.designation,
                                                        phone_number: values.phone_number,
                                                        email_id: values.email_id
                                                    }],
                                                    category: values.category,
                                                    school_coordinates: [{
                                                        latitude: lat,
                                                        longitude: lng
                                                    }],
                                                    acadamic_start_month: values.acadamic_start_month,
                                                    acadamic_end_month: values.acadamic_end_month,
                                                    start_time: moment(startTime, 'hh:mm').format('hh:mm A'),
                                                    end_time: moment(endTime, 'hh:mm').format('hh:mm A')
                                                }
                                                this.props.addSchool(initialValuesList)
                                                
                                            }}>
                                            {({ values, errors, isSubmitting, isValidating, dirty, touched, handleBlur }) => {
                                            const isSchoolEmpty = (!values.school_name 
                                                || !values.category 
                                                || !values.name 
                                                || !values.phone_number 
                                                || !values.email_id 
                                                || !values.designation
                                                || !values.address
                                                || !values.start_time
                                                || !values.end_time
                                                || !values.acadamic_start_month
                                                || !values.acadamic_end_month);
                                            return(                                                
                                                <Form >
                                                    <div>                                                    
                                                        <div className="">
                                                            <div className="row">
                                                                <div className="col-md-6 p-t-20">
                                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
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
                                                                <div className="col-md-6 p-t-20">
                                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                        <FormGroup>
                                                                            <Field
                                                                                label='Category*'
                                                                                name="category"
                                                                                select
                                                                                component={TextField}
                                                                                className="textfield__input"
                                                                                fullwidth="true"
                                                                                disabled={false}
                                                                            >
                                                                                {CategoryList.map((item:any)=> (
                                                                                    <MenuItem value={item.value}>{item.value}</MenuItem>
                                                                                ))}
                                                                            </Field>
                                                                        </FormGroup>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6 p-t-20">
                                                                    <div>
                                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
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
                                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
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
                                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
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
                                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
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
                                                            <div className="row">
                                                                <div className="col-md-12 p-b-5 p-t-5">
                                                                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width">
                                                                        <FormGroup>
                                                                            <Field
                                                                                name="address"
                                                                                component={TextField}
                                                                                label="Address*"
                                                                                className="textfield__input"
                                                                                rows="1"
                                                                                disabled={false}                                                                                
                                                                                onBlur={handleBlur}
                                                                                isValid={touched.address && !errors.address}
                                                                                isInvalid={touched.address && errors.address}
                                                                            />
                                                                        </FormGroup>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6 p-t-20">
                                                                    <div>
                                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
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
                                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
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
                                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                            <FormGroup>
                                                                                <Field
                                                                                    name="acadamic_start_month"
                                                                                    select
                                                                                    component={TextField}
                                                                                    className="textfield__input"
                                                                                    label="Academic Start Month*"
                                                                                    fullwidth="true"
                                                                                    disabled={false}
                                                                                >
                                                                                    {MonthList.map((item:any) => (
                                                                                        <MenuItem value={item.code}>{item.code}</MenuItem>
                                                                                    ))}
                                                                                </Field>
                                                                            </FormGroup>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6 p-t-20">
                                                                    <div>
                                                                        <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width pt-0">
                                                                            <FormGroup>
                                                                                <Field
                                                                                    name="acadamic_end_month"
                                                                                    select
                                                                                    component={TextField}
                                                                                    className="textfield__input"
                                                                                    label="Academic End Month*"
                                                                                    fullwidth="true"
                                                                                    disabled={false}
                                                                                >
                                                                                    {MonthList.map((item:any) => (
                                                                                        <MenuItem value={item.code}>{item.code}</MenuItem>
                                                                                    ))}
                                                                                </Field>
                                                                            </FormGroup>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 mb-3">
                                                                <LoadScript googleMapsApiKey="AIzaSyCk__DGKYrWV5NmfnpWvVJeiV5kuyC8MmQ">
                                                                    <GoogleMap
                                                                        mapContainerStyle={containerStyle}
                                                                        center={center}
                                                                        zoom={15}
                                                                    >
                                                                        <Marker
                                                                            position={position}
                                                                            onDragEnd={(e) => this.onMarkerDragEnd({ e: e })}
                                                                            draggable={true}
                                                                        />
                                                                        <></>
                                                                    </GoogleMap>
                                                                </LoadScript>
                                                            </div>
                                                            <div className="text-right mb-3 mr-2 mt-4">
                                                                <Button className="btn btn-pink mr-1 ml-1 w-15 mt-1" 
                                                                 disabled={isSchoolEmpty || isValidating 
                                                                    || !dirty || !!(errors.acadamic_end_month && touched.acadamic_end_month) 
                                                                    || !!(errors.acadamic_start_month && touched.acadamic_start_month)||
                                                                    !!(errors.end_time && touched.end_time) || 
                                                                    !!(errors.phone_number && touched.phone_number) || 
                                                                    !!(errors.email_id && touched.email_id) || 
                                                                    !!(errors.start_time && touched.start_time) || 
                                                                    !!(errors.address && touched.address) || 
                                                                    !!(errors.email_id && touched.email_id) || 
                                                                    !!(errors.phone_number && touched.phone_number) || 
                                                                    !!(errors.designation && touched.designation) || 
                                                                    !!(errors.name && touched.name) || 
                                                                    !!(errors.category && touched.category) || 
                                                                    !!(errors.school_name && touched.school_name)} type="submit">Submit</Button>
                                                                <Link to="/school"><Button className="btn btn-default mr-1 ml-1 w-15">Cancel</Button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Form>
                                                )}
                                            }
                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={loadingTextCSS}><SpinnerLoader /></div>
            </div>
        );
    }
}

const mapStateToProps = ({ schools }: RootState) => {
    return {
        loading: schools.loading,
        errorMessage: schools.errors
    };
};

export default connect(
    mapStateToProps, { addSchool }
)(AddNewSchool);