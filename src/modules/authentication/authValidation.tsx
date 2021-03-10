import * as yup from 'yup';
import { formValidationPatten, FormInvalidMessage, formValidationSize } from '../../services/Constants';

export const registerPassword = yup.object({
    newPassword:
    yup.string()
    .required('Please enter your Password')
    .min(formValidationSize.minlengthpassword, FormInvalidMessage.incalidpassPatten)
    .max(formValidationSize.maxlengthpassword, FormInvalidMessage.incalidpassPatten)
    .matches(formValidationPatten.passwordPatten, FormInvalidMessage.incalidpassPatten
    ),
    confirmPassword:
    yup.string()
    .required('Please enter the Confirm Password')
    .oneOf([yup.ref("newPassword")], "Password and confirm password must match")
})