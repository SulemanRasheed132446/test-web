import * as yup from 'yup';
import { userFormValidations } from '../../services/Constants';

export const DiaryValidation = yup.object({
    diray_status: yup.string()
    .required('Please select message type'),
    your_title: yup.string()
    .required('Please enter the your title')
    .min(userFormValidations.firstNameSizeMin, userFormValidations.dirayTitleMin)
    .max(userFormValidations.lastNameSizeMax, userFormValidations.dirayTitleMax),
    message: yup.string()
    .required('Please enter the message')
})