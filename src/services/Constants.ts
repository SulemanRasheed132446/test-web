export const CATEGORY = [{
  lable: "KG",
  value: "KG"
},
{
  lable: "Primary",
  value: "Primary"
},
{
  lable: "Higher Secondary",
  value: "Higher Secondary"
}]

export const STANDARD = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
  { label: "C", value: "C" },
  { label: "D", value: "D" },
  { label: "E", value: "E" },
  { label: "F", value: "F" },
  { label: "G", value: "G" },
  { label: "H", value: "H" },
  { label: "I", value: "I" },
  { label: "J", value: "J" }]

export const MONTHLIST = [
  { code: "JAN", month: "January" },
  { code: "FEB", month: "February" },
  { code: "MAR", month: "March" },
  { code: "APR", month: "April" },
  { code: "MAY", month: "May" },
  { code: "JUN", month: "June" },
  { code: "JUL", month: "July" },
  { code: "AUG", month: "August" },
  { code: "SEP", month: "September" },
  { code: "OCT", month: "October" },
  { code: "NOV", month: "November" },
  { code: "DEC", month: "December" }];

export const teacherDetails = [
  { name: 'Saba khanum', phoneNo: '9876543210', emailid: 'sabakhanum@mailinator.com' },
  { name: 'John', phoneNo: '9876543211', emailid: 'johnben@mailinator.com' },
  { name: 'Saleem', phoneNo: '9876543211', emailid: 'saleem@mailinator.com' },
  { name: 'Mani', phoneNo: '9876543211', emailid: 'mani@mailinator.com' },
  { name: 'khanum', phoneNo: '9876543210', emailid: 'khanum@mailinator.com' },
  { name: 'Saba', phoneNo: '9876543211', emailid: 'Saba@mailinator.com' },
  { name: 'Sathish', phoneNo: '9876543211', emailid: 'Sathish@mailinator.com' },
  { name: 'Kumar', phoneNo: '9876543211', emailid: 'Kumar@mailinator.com' }
];
export const teacherSubjectList = [
  { label: 'Tamil', value: 'Tamil' },
  { label: 'English', value: 'English' },
  { label: 'Social Science', value: 'Social Science' },
  { label: 'Social', value: 'Social' },
  { label: 'Arabi', value: 'Arabi' }
];
export const teacherClassList = [
  { label: '1st-A', value: '1st-A' },
  { label: '1st-B', value: '1st-B' },
  { label: '1st-C', value: '1st-C' },
  { label: '1st-D', value: '1st-D' },
  { label: '1st-E', value: '1st-E' },
];
export const teacherSubjectDetails = [
  { subject: 'Tamil', class: '1st-A', section: 'A' },
  { subject: 'English', class: '2st-B', section: 'B' },
  { subject: 'Social Science', class: '2st-C', section: 'C' },
  { subject: 'Social', class: '1st-B', section: 'A' },
  { subject: 'Arabi', class: '1st-D', section: 'A' }
];
export const studentClassName = [
  {
    id: '1',
    name: 'light-dark-bgcolor'
  },
  {
    id: '2',
    name: 'bg-b-purple'
  },
  {
    id: '3',
    name: 'cyan-bgcolor'
  },
  {
    id: '4',
    name: 'bg-b-orange'
  },
  {
    id: '5',
    name: 'bg-b-green'
  },
  {
    id: '6',
    name: 'bg-b-pink'
  }
];
//Error message
export interface validationMessage {
  schoolErrorMsg: string,
  address: string,
  name: string,
  designation: string,
  phone_number: string,
  email_id: string,
  acadamic_start_month: string,
  acadamic_end_month: string,
  start_time: string,
  end_time: string,
  short_name: string,
  subject_name: string,
  category: string,
  failuserpass: string,
  loginUser: string,
  schoolCategory: string,
  otpCode: string,
  standard: string,
  grade: string,
  InvalidPhoneNo: string,
  InvalidEmailId: string
}

export const FormvalidationMessage: validationMessage = {
  schoolErrorMsg: "Please enter the School Name",
  address: "Please enter the School Address",
  name: "Please enter the Contact Person Name",
  schoolCategory: "Please select the School Category",
  designation: "Please enter the Contact Person Designation",
  phone_number: "Please enter the Contact Person Phone Number",
  email_id: "Please enter the Contact Person Email Id",
  acadamic_start_month: "Please select the Academic Start Month",
  acadamic_end_month: "Please select the Academic End Month",
  start_time: "Please select the Start Time",
  end_time: "Please select the End Time",
  short_name: "Please enter the Subject Short Name",
  subject_name: "Please enter the Subject Name",
  category: "Please select the Subject Category",
  failuserpass: "Please enter your password",
  loginUser: "Please enter the Email Id or Phone Number",
  otpCode: "Please enter your OTP",
  standard: 'Please enter Standard',
  grade: 'Please enter Grade',
  InvalidPhoneNo: 'Please enter a valid Phone Number',
  InvalidEmailId: 'Please enter a valid Email Id'
}

export interface invalidMessage {
  invalidPhoneNumber: string,
  invalidName: string,
  invaliddesignation: string,
  invalidAddress: string,
  invalidEmailId: string,
  InvalidCategory: string,
  invalidSchoolName: string,
  invalidSubjectName: string,
  invalidShortName: string,
  incalidpassPatten: string,
  invalidUserName: string,
  endTimeInvalid: string,
  startTimeInvalid: string,
  loginUserName: string,
  otpInvalid: string
}

export const FormInvalidMessage: invalidMessage = {
  invalidPhoneNumber: "Please enter a valid Person Phone Number",
  invalidSchoolName: "Please enter a valid School Name",
  invalidName: "Please enter a valid Contact Person Name",
  invaliddesignation: "Please enter a valid Contact Person Designation",
  invalidAddress: "Please enter a valid Contact Person Address",
  invalidEmailId: "Please enter a valid Contact Person Email Id",
  InvalidCategory: "Please enter a valid Contact Person Category",
  invalidSubjectName: "Please enter a valid Subject Name",
  invalidShortName: "Please enter a valid Subject Short Name",
  incalidpassPatten: "Must contain 8 characters, one uppercase letter, one lowercase letter, one number and one special character",
  invalidUserName: "Please enter a valid Email Id",
  endTimeInvalid: "End Time should be longer than Start Time",
  startTimeInvalid:'End Time should be greater than Start Time',
  loginUserName: "Please enter a valid Email Id or Phone Number",
  otpInvalid: "Please enter a valid OTP Number"
}

//Number validation value

export interface validationSize {
  nameMinSize: number,
  nameMaxSize: number,
  addressMaxSize: number,
  mobileNoSize: number,
  schoolMaxSize: number,
  subjectNameMaxSize: number,
  subjectNameMinSize: number,
  shortNameMaxSize: number,
  shortNameMinSize: number,
  schoolIdMaxSize: number,
  designation: number,
  mobileNoMax: number,
  categoryMax: number,
  maxpassword: number,
  minpassword: number,
  phoneNo: number,
  otpMax: number,
  otpMin: number,
  minLastName: number,
  maxlengthpassword: number,
  minlengthpassword: number
}

export const formValidationSize: validationSize = {
  nameMinSize: 3,
  schoolMaxSize: 50,
  nameMaxSize: 50,
  addressMaxSize: 250,
  mobileNoSize: 10,
  subjectNameMaxSize: 50,
  subjectNameMinSize: 2,
  shortNameMaxSize: 10,
  shortNameMinSize: 2,
  schoolIdMaxSize: 150,
  designation: 75,
  mobileNoMax: 15,
  categoryMax: 50,
  maxpassword: 12,
  minpassword: 8,
  phoneNo: 10,
  otpMax: 6,
  otpMin: 6,
  minLastName: 1,
  maxlengthpassword: 12,
  minlengthpassword: 8
}
export interface validationSizeMessage {
  schoolNameMinMsg: string,
  schoolNameMaxMsg: string,
  nameMixMsg: string,
  nameMaxMsg: string,
  addressMixMsg: string,
  addressMaxMsg: string,
  phoneMinMsg: string,
  phoneMaxMsg: string,
  designationMinMsg: string,
  designationMaxMsg: string,
  subjectNameMinMsg: string,
  shortNameMaxMsg: string,
  shortNameMinMsg: string,
  subjectNameMaxSize: string,
  minvaluepasssize: string,
  maxvaluepasssize: string,
  minUserNo: string,
  otpMaxMsg: string,
  otpMixMsg: string
}
export const formValidationSizeMsg: validationSizeMessage = {
  schoolNameMinMsg: "Please enter at least 3 characters",
  schoolNameMaxMsg: "School Name should not be more than 150 chatacters",
  nameMixMsg: "Please enter at least 3 characters",
  nameMaxMsg: "Contact Person Name should not be more than 50 chatacters",
  addressMixMsg: "Please enter at least 3 characters",
  addressMaxMsg: " Contact Person Address should not be more than 250 chatacters",
  phoneMinMsg: "Contact Person Phone Number minimum 10 digits",
  phoneMaxMsg: "Contact Person Phone Number maximum 15 digits",
  designationMinMsg: "Please enter at least 3 characters",
  designationMaxMsg: "Contact Person Designation should not be more than 75 chatacters",
  subjectNameMinMsg: "Please enter at least 2 characters",
  shortNameMaxMsg: "Subject Name should not be more than 10 chatacters",
  shortNameMinMsg: "Please enter at least 2 characters",
  subjectNameMaxSize: "Subject Name should not be more than 50  chatacters",
  minvaluepasssize: "Please enter at least 8 characters",
  maxvaluepasssize: "Password should not be more than 12  chatacters",
  minUserNo: "Email Id or Phone Number minimum 10 digits",
  otpMaxMsg: "OTP Number should not be more than 6 chatacters",
  otpMixMsg: "Please enter at least 6 characters"
}

//reg.exp pattens
export interface validationPatten {
  numberPatten: RegExp,
  namePatten: RegExp,
  emailPatten: RegExp,
  passwordPatten: RegExp,
  phoneRegExp: RegExp,
  emailIdPhoneNo: RegExp,
  address: RegExp,
  schoolNamePattern: RegExp
}
export const formValidationPatten: validationPatten = {
  namePatten: /^[a-zA-z]+([\s][a-zA-Z]+)*$/,
  schoolNamePattern: /^([a-zA-Z@_&.,'-]+\s)*[a-zA-Z@_&.,'-]+$/,
  numberPatten: /^[0-9]+$/,
  emailPatten: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
  passwordPatten: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  phoneRegExp: /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  emailIdPhoneNo: /^([_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5}))|(\d+$)$/,
  address: /^\S+(?: \S+)*$/
}

export enum UserRoles {
  acadamicAdmin = "1",
  schoolAdmin = "2",
  teacher = "3",
  parent = "4",
  nonAdmin = "0"
}

export interface notificationMessage {
  position: string,
  duration: number,
  getDuration:number
}

export const notificationMsg: notificationMessage = {
  position: "top-right",
  duration: 2000,
  getDuration:500
}

export interface userManagevalidaType {
  firstName: string,
  lastName: string,
  phoneNumber: string,
  role: string,
  emailId: string,
  firstNameMin: string,
  firstNameMax: string,
  firstNameSizeMin: number,
  firstNameSizeMax: number,
  firstNameInvalid: string,
  lastNameMin: string,
  lastNameMax: string,
  lastNameSizeMin: number,
  lastNameSizeMax: number,
  lastNameInvalid: string,
  schoolName: string,
  emailIdInvalid: string,
  phoneNumbervalid: string,
  phoneMinMsg: string,
  phoneMaxMsg: string,
  dirayTitleMax:string,
  dirayTitleMin:string
}

export const userFormValidations: userManagevalidaType = {
  firstName: "Please enter the first name",
  lastName: "Please enter the last name",
  phoneNumber: "Please enter the phone number",
  role: "Please select the role",
  emailId: "Please enter the email id",
  schoolName: "Please enter the school name",
  firstNameMin: "First name minimum 3 characters",
  firstNameMax: "First name maximum 50 characters",
  firstNameInvalid: "Invalid first name",
  lastNameMin: "Last name minimum 1 characters",
  lastNameMax: "Last name maximum 50 characters",
  lastNameInvalid: "Invalid last name",
  emailIdInvalid: "Invalid Email Id",
  phoneNumbervalid: "Invalid Phone number",
  phoneMinMsg: "Phone Number minimum 10 digits",
  phoneMaxMsg: "Phone Number maximum 10 digits",
  firstNameSizeMin: 3,
  firstNameSizeMax: 50,
  lastNameSizeMin: 1,
  lastNameSizeMax: 50,
  dirayTitleMax:'Your title maximum 50 characters',
  dirayTitleMin:'Your title minimum 3 characters'
}

interface studentValidation {
  phone_number: string,
  student_name: string,
  profile_picture: string,
  email_id: string,
  maxphonenumber: number,
  minphonenumber: number,
  maxphoneinvalid: string,
  minphoneinvalid: string,
  invalidphone: string,
  invalidstudentname: string,
  maxstudentname: string,
  minstudentname: string,
  invalidemailid: string,
  grade: string,
  standard: string,
  parentFirstName: string,
  maxparentFirstName: string,
  minparentFirstName: string,
  invalidparentFirstName: string,
  parentLastName: string,
  maxparentLastName: string,
  minparentLastName: string,
  invalidparentLastName: string
}

export const studentValida: studentValidation = {
  phone_number: 'Please enter your Phone Number',
  student_name: 'Please enter the Student Name',
  profile_picture: 'please upload profile picture',
  email_id: 'Please enter your Email ID',
  maxphonenumber: 10,
  minphonenumber: 10,
  maxphoneinvalid: 'Phone Number maximum 10 digits',
  minphoneinvalid: 'Phone Number minimum 10 digits',
  invalidphone: 'Invalid Phone Number',
  invalidstudentname: 'Invalid Student Name',
  maxstudentname: 'Student name maximum 50 characters',
  minstudentname: 'Student name minimum 3 characters',
  invalidemailid: 'Invalid Email Id',
  grade: 'Please select Class',
  standard: 'Please select Section',
  parentFirstName: 'Please enter your Parent First Name',
  parentLastName: 'Please enter your Parent Last Name',
  maxparentFirstName: 'Parent First Name maximum 50 characters',
  minparentFirstName: 'Parent First Name minimum 3 characters',
  invalidparentFirstName: 'Invalid Parent First Name',
  maxparentLastName: 'Parent Last Name maximum 50 characters',
  minparentLastName: 'Parent Last Name minimum 3 characters',
  invalidparentLastName: 'Invalid Parent Last Name'
}