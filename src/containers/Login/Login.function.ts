import * as Yup from 'yup'


export interface FormValues {
    username: string;
    password: string;
}

export const initialValues = {
    username: '',
    password: '',
}


export function validationSchema() {
    return Yup.object().shape({
        username: Yup.string().required('Username is required field').min(1),
        password: Yup.string().required('Password is required field').min(1)
    })
}