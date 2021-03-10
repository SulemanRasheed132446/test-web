import * as yup from 'yup';
import { formValidationSize, userFormValidations, formValidationPatten } from '../../services/Constants';

export const UserManageValidation = yup.object({
        firstname: yup.string()
                .required(userFormValidations.firstName)
                .min(userFormValidations.firstNameSizeMin, userFormValidations.firstNameMin)
                .max(userFormValidations.firstNameSizeMax, userFormValidations.firstNameMax)
                .matches(formValidationPatten.namePatten, userFormValidations.firstNameInvalid),
        lastname: yup.string()
                .required(userFormValidations.lastName)
                .min(userFormValidations.lastNameSizeMin, userFormValidations.lastNameMin)
                .max(userFormValidations.lastNameSizeMax, userFormValidations.lastNameMax)
                .matches(formValidationPatten.namePatten, userFormValidations.lastNameInvalid),
        email_id: yup.string()
                .required(userFormValidations.emailId)
                .matches(formValidationPatten.emailPatten, userFormValidations.emailIdInvalid),
        role: yup.string()
                .required(userFormValidations.role),
        phone_number: yup.string()
                .required(userFormValidations.phoneNumber)
                .matches(formValidationPatten.phoneRegExp, userFormValidations.phoneNumbervalid)
                .min(formValidationSize.mobileNoSize, userFormValidations.phoneMinMsg)
                .max(formValidationSize.mobileNoSize, userFormValidations.phoneMaxMsg),
        school_id: yup.string()
                .required(userFormValidations.schoolName)
})