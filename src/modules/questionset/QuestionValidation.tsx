import * as yup from 'yup';
export const QuestionValidation = yup.object({
    question_name: yup.string()
    .required('Please enter the question set name'),
    select_class: yup.string()
    .required('Please select class'),
    select_subject: yup.string()
    .required('Please select subject'),
    question: yup.string()
    .required('Please enter the question'),
    add_topics: yup.string()
    .required('Please enter the topics'),
    question_name_A: yup.string()
    .required('Please enter the  option A'),
    question_name_B: yup.string()
    .required('Please enter the  option B'),
    question_name_C: yup.string()
    .required('Please enter the  option C'),
    question_name_D: yup.string()
    .required('Please enter the option D'),
    answer: yup.string()
    .required('Please select the correct answer')
})


export const  validationSchemaTest = yup.object().shape({
    question_name: yup.string()
    .required('Please enter the question name'),
    select_class: yup.string()
    .required('Please select class'),
    select_subject: yup.string()
    .required('Please select subject'),
    questionlist: yup.array().of(
        yup.object().shape({
            question: yup.string()
            .required('Please enter question'),
            add_topics: yup.string()
            .required('Please enter add topics'),
            question_name_A: yup.string()
            .required('Please eneter question name A'),
            question_name_B: yup.string()
            .required('Please eneter question name B'),
            question_name_C: yup.string()
            .required('Please eneter question name C'),
            question_name_D: yup.string()
            .required('Please eneter question name D'),
            answer: yup.string()
            .required('Please select answer'),
            })
        )
    });