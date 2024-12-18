import * as yup from "yup";

export const validationSchemaLogin = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
});

export const defaultValueLogin = {
    email: "",
    password: "",
}