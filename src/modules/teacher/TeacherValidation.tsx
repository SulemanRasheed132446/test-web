import * as yup from 'yup';
import { formValidationSize, userFormValidations, formValidationPatten } from '../../services/Constants';

export const TeacherValidation = yup.object({
    teacherfirstname: yup.string()
        .required(userFormValidations.firstName)
        .min(userFormValidations.firstNameSizeMin, userFormValidations.firstNameMin)
        .max(userFormValidations.firstNameSizeMax, userFormValidations.firstNameMax)
        .matches(formValidationPatten.namePatten, userFormValidations.firstNameInvalid),
    teacherlastname: yup.string()
        .required(userFormValidations.lastName)
        .min(userFormValidations.lastNameSizeMin, userFormValidations.lastNameMin)
        .max(userFormValidations.lastNameSizeMax, userFormValidations.lastNameMax)
        .matches(formValidationPatten.namePatten, userFormValidations.lastNameInvalid),
    teacheremailid: yup.string()
        .required(userFormValidations.emailId)
        .matches(formValidationPatten.emailPatten, userFormValidations.emailIdInvalid),
    teacherphonenumber: yup.string()
        .required(userFormValidations.phoneNumber)
        .matches(formValidationPatten.phoneRegExp, userFormValidations.phoneNumbervalid)
        .min(formValidationSize.mobileNoSize, userFormValidations.phoneMinMsg)
        .max(formValidationSize.mobileNoSize, userFormValidations.phoneMaxMsg)
})
