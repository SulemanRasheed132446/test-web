import * as yup from 'yup';
import { userFormValidations } from '../../services/Constants';

export const NoticesBoardValidation = yup.object({
    your_title: yup.string()
    .required('Please enter the your title')
    .min(userFormValidations.firstNameSizeMin, userFormValidations.dirayTitleMin)
    .max(userFormValidations.lastNameSizeMax, userFormValidations.dirayTitleMax),
    message: yup.string()
    .required('Please enter the message')
})