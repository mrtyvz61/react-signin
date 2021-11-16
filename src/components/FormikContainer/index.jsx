import React from "react";
import { Form } from "formik";
import { DisplayFormikState } from "../../DisplayFormikState";

const FormikContainer = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        isValid,
        dirty
    } = props;
    return (
        <>
            <DisplayFormikState {...props} />
            <Form className="row g-3">
                <div className="col-6 mx-auto">
                    <div className="col-12">
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && (
                            <div className="input-feedback">{errors.password}</div>
                        )}
                    </div>
                    <div className="col-12">
                        <input
                            type="checkbox"
                            name="isRemember"
                            checked={values.isRemember}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={!(isValid && dirty)}
                        >
                            Giriş
                        </button>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default FormikContainer;
