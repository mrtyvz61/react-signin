import React from "react";
import { UseSigninState, UseSigninDispatch, onRequestHandler } from "../context";

// Formik && Yup
import { Formik } from "formik";
import * as Yup from "yup";

// Components
import FormikContainer from "./FormikContainer";

// Initial Valuues
const initialValues = {
    email: "",
    password: "",
    isRemember: false
};

// Validation
const LoginSchema = Yup.object().shape({
    email: Yup.string().email().required("Email Required"),
    password: Yup.string()
        .required("Password Required")
        .min(8, "Password is Too short")
        .matches(/(?=.*[0-9])/, "Must Contain Number"),
});

const Login = () => {
    
    const dispatch = UseSigninDispatch();

    const state = UseSigninState();

    const submitHandler = (values = initialValues, { setSubmitting }) => {
        onRequestHandler(values, dispatch);
        setSubmitting(false);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                validationSchema={LoginSchema}
            >
                {(formikProps) => {
                    formikProps.errors = { ...formikProps.errors, ...state.errors };
                    return <FormikContainer {...{ ...state, ...formikProps }} />;
                }}
            </Formik>
        </>
    );
};

export default Login;
