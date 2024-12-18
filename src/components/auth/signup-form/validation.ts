import * as yup from "yup";

export const defaultValue = {
    email: '',
    password: '',
    userName: '',
    fullName: '',
    phone: '',
    address: '',
}

export const ValidateRegister = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string()
        .required("Required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    userName: yup.string().required("Required"),
    fullName: yup.string().required("Required"),
    phone: yup.string().required("Required"),
    address: yup.string().required("Required"),
});