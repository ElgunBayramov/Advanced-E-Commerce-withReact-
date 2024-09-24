import * as yup from "yup";

export const loginFormSchemas = yup.object().shape({
  email: yup
    .string()
    .email("Email adresi düzgün daxil edilməyib")
    .required("Xana boş buraxıla bilməz"),
  password: yup.string().
  required("Xana boş buraxıla bilməz"),
});
