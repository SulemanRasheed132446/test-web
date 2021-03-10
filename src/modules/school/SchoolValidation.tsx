import * as yup from 'yup';
import { FormvalidationMessage, formValidationSize, formValidationPatten, FormInvalidMessage, formValidationSizeMsg } from '../../services/Constants';
import moment from 'moment';

export const SchoolValidation = yup.object({
    school_name: yup.string()
        .required(FormvalidationMessage.schoolErrorMsg)
        .min(formValidationSize.nameMinSize, formValidationSizeMsg.schoolNameMinMsg)
        .max(formValidationSize.schoolIdMaxSize, formValidationSizeMsg.schoolNameMaxMsg)
        .matches(formValidationPatten.schoolNamePattern, FormInvalidMessage.invalidSchoolName),
    address: yup.string()
        .required(FormvalidationMessage.address)
        .min(formValidationSize.nameMinSize, formValidationSizeMsg.addressMixMsg)
        .max(formValidationSize.addressMaxSize, formValidationSizeMsg.addressMaxMsg)
        .matches(formValidationPatten.address, FormInvalidMessage.invalidAddress),
    name: yup.string()
        .required(FormvalidationMessage.name)
        .matches(formValidationPatten.namePatten, FormInvalidMessage.invalidName)
        .min(formValidationSize.nameMinSize, formValidationSizeMsg.nameMixMsg)
        .max(formValidationSize.nameMaxSize, formValidationSizeMsg.nameMaxMsg),
    designation: yup.string()
        .required(FormvalidationMessage.designation)
        .matches(formValidationPatten.namePatten, FormInvalidMessage.invaliddesignation)
        .min(formValidationSize.nameMinSize, formValidationSizeMsg.designationMinMsg)
        .max(formValidationSize.designation, formValidationSizeMsg.designationMaxMsg),
    phone_number: yup.string()
        .required(FormvalidationMessage.phone_number)
        .matches(formValidationPatten.phoneRegExp, FormInvalidMessage.invalidPhoneNumber)
        .min(formValidationSize.mobileNoSize, formValidationSizeMsg.phoneMinMsg)
        .max(formValidationSize.mobileNoMax, formValidationSizeMsg.phoneMaxMsg),
    email_id: yup.string()
        .required(FormvalidationMessage.email_id)
        .matches(formValidationPatten.emailPatten, FormInvalidMessage.invalidEmailId),
    acadamic_start_month: yup.string()
        .required(FormvalidationMessage.acadamic_start_month),
    acadamic_end_month: yup.string()
        .required(FormvalidationMessage.acadamic_end_month),
    start_time: yup.string()
        .required(FormvalidationMessage.start_time),
    end_time: yup.string()
        .required(FormvalidationMessage.end_time)
        .test("is-greater", FormInvalidMessage.endTimeInvalid, function (value) {
            const { start_time } = this.parent;
            return moment(value, "HH:mm").isAfter(moment(start_time, "HH:mm"));
        }),
    category: yup.string()
        .required(FormvalidationMessage.schoolCategory)
})