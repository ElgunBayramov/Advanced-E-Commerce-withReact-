import * as yup from "yup";

export const registerFormSchemas = yup.object().shape({
  email: yup
    .string()
    .email("The email address was entered incorrectly.")
    .required("The cell cannot be left blank."),
  password: yup.string().
  min(8,"Password must be at least 8 characters long.").
  required("The cell cannot be left blank."),
  confirmPassword: yup
    .string()
    .required("The cell cannot be left blank.")
    .oneOf([yup.ref("password")], "Passwords are not the same."),
});
