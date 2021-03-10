import * as yup from 'yup';
import { FormvalidationMessage, formValidationSize, formValidationPatten, FormInvalidMessage, formValidationSizeMsg } from '../../services/Constants';

export const SubjectValidation = yup.object({
    name: yup.string()
        .required(FormvalidationMessage.subject_name)
        .min(formValidationSize.subjectNameMinSize, formValidationSizeMsg.subjectNameMinMsg)
        .max(formValidationSize.subjectNameMaxSize, formValidationSizeMsg.subjectNameMaxSize)
        .matches(formValidationPatten.schoolNamePattern, FormInvalidMessage.invalidSubjectName),
    short_name: yup.string()
        .required(FormvalidationMessage.short_name)
        .min(formValidationSize.shortNameMinSize, formValidationSizeMsg.shortNameMinMsg)
        .max(formValidationSize.shortNameMaxSize, formValidationSizeMsg.shortNameMaxMsg)
        .matches(formValidationPatten.schoolNamePattern, FormInvalidMessage.invalidShortName),
    category: yup.string()
        .required(FormvalidationMessage.category)
})