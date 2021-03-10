import { object, string, ref } from 'yup';
import { formValidationPatten, FormInvalidMessage, formValidationSize } from '../../services/Constants';

export const ResetValidation = object({
    resetnewpassword:
    string()
    .required('Please Enter your password')
    .min(formValidationSize.minlengthpassword, FormInvalidMessage.incalidpassPatten)
    .max(formValidationSize.maxlengthpassword, FormInvalidMessage.incalidpassPatten)
    .matches(formValidationPatten.passwordPatten, FormInvalidMessage.incalidpassPatten
    ),
    resetconfirmpassword:
    string()
    .required()
    .oneOf([ref("resetnewpassword")], "Password and confirm password must match")
})