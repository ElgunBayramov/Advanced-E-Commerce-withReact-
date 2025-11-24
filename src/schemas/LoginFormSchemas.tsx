import * as yup from "yup";

export const loginFormSchemas = yup.object().shape({
  email: yup
    .string()
    .email("The email address was entered incorrectly.")
    .required("The cell cannot be left blank."),
  password: yup.string().
  required("The cell cannot be left blank."),
});
