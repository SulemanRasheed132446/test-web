import * as yup from 'yup';
import { FormvalidationMessage } from '../../services/Constants';

export const ClassValidation = yup.object({
    grade: yup.string()
        .required(FormvalidationMessage.grade),
    standard: yup.string()
        .required(FormvalidationMessage.standard)
})