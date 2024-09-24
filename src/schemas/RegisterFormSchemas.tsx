import * as yup from "yup";

export const registerFormSchemas = yup.object().shape({
  email: yup
    .string()
    .email("Email adresi düzgün daxil edilməyib")
    .required("Xana boş buraxıla bilməz"),
  password: yup.string().
  min(8,"Şifrə ən az 8 simvol olmalıdır").
  required("Xana boş buraxıla bilməz"),
  confirmPassword: yup
    .string()
    .required("Xana boş buraxıla bilməz")
    .oneOf([yup.ref("password")], "Şifrələr eyni deyil"),
});
