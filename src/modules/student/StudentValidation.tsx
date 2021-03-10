import * as yup from 'yup';
import { studentValida, formValidationSize, formValidationPatten } from '../../services/Constants';

export const StudentValidation = yup.object({
    student_name: yup.string()
        .required(studentValida.student_name)
        .min(formValidationSize.nameMinSize, studentValida.minstudentname)
        .max(formValidationSize.nameMaxSize, studentValida.maxstudentname)
        .matches(formValidationPatten.namePatten, studentValida.invalidstudentname),
    phone_number: yup.string()
        .required(studentValida.phone_number)
        .min(formValidationSize.mobileNoSize, studentValida.minphoneinvalid)
        .max(formValidationSize.mobileNoSize, studentValida.maxphoneinvalid)
        .matches(formValidationPatten.numberPatten, studentValida.invalidphone),
    email_id: yup.string()
        .required(studentValida.email_id)
        .matches(formValidationPatten.emailPatten, studentValida.invalidemailid),
    grade: yup.string()
        .required(studentValida.grade),
    standard: yup.string()
        .required(studentValida.standard),
    parent_firstname: yup.string()
        .required(studentValida.parentFirstName)
        .min(formValidationSize.nameMinSize, studentValida.minparentFirstName)
        .max(formValidationSize.nameMaxSize, studentValida.maxparentFirstName)
        .matches(formValidationPatten.namePatten, studentValida.invalidparentFirstName),
    parent_lastname: yup.string()
        .required(studentValida.parentLastName)
        .min(formValidationSize.minLastName, studentValida.minparentLastName)
        .max(formValidationSize.nameMaxSize, studentValida.maxparentLastName)
        .matches(formValidationPatten.namePatten, studentValida.invalidparentLastName)
})