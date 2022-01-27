import * as Yup from "yup";

export interface Payload {
  username: string;
  password: string;
}
export interface Error {
  status: string | null;
  description: string;
}

export interface FormValues {
  username: string;
  password: string;
}

export const initialValues = {
  username: "",
  password: "",
};

export function validationSchema() {
  return Yup.object().shape({
    username: Yup.string().required("Username is required field").min(1),
    password: Yup.string().required("Password is required field").min(1),
  });
}
