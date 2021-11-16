// Import react dependencies
import React, { createContext, useContext, useReducer } from "react";

// Constants
export const SINGIN_ACTION_TYPES = Object.freeze({
    USER_SIGNIN_REQUEST: "USER_SIGNIN_REQUEST",
    USER_SIGNIN_SUCCESS: "USER_SIGNIN_SUCCESS",
    USER_SIGNIN_FAILURE: "USER_SIGNIN_FAILURE"
});

// Initial State 
const initialState = {
    errors: {
        email: "",
        password: ""
    },
    loading: false
};

/** Create signin state context */
const SigninStateContext = createContext();
/** Create signin dispatch context */
const SigninDispatchContext = createContext();

/** Reducer for modifying signin state */
const SigninReducer = (state, action) => {
    switch (action.type) {
        case SINGIN_ACTION_TYPES.USER_SIGNIN_REQUEST:
            return { ...state, loading: true };
        case SINGIN_ACTION_TYPES.USER_SIGNIN_SUCCESS:
            return { ...state, loading: false };
        case SINGIN_ACTION_TYPES.USER_SIGNIN_FAILURE:
            return { ...state, loading: false, errors: action.payload };
        // Default action
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

/** Container component so children can access signin state via context api */
const SigninProvider = ({ children }) => {
    // Create signin state reducer hook
    const [state, dispatch] = useReducer(SigninReducer, initialState);

    return (
        <SigninStateContext.Provider value={state}>
            <SigninDispatchContext.Provider value={dispatch}>
                {children}
            </SigninDispatchContext.Provider>
        </SigninStateContext.Provider>
    );
}


/** Utility function to allow other components to access signin state from context api */
const UseSigninState = () => {
    // Get signin state context
    const context = useContext(SigninStateContext);

    // If we have data in context (SigninStateContext.Provider value)
    if (context !== undefined) {
        return context;
    }
    throw new Error("UseSigninState must be used within a SinginProvider");
}

const UseSigninDispatch = () => {
    // Get signin dispatch context
    const context = useContext(SigninDispatchContext);

    // If we have data in context (SigninDispatchContext.Provider value)
    if (context !== undefined) {
        return context;
    }
    throw new Error("UseSigninDispatch must be used within a SinginProvider");
}

// Login Request Function - Sample Scenario
const onRequestHandler = async (values, dispatch) => {
    const error = true;
    const { email, password, isRemember } = values;
    const testObject = { mymail: email, mypass: password, rememberMe: isRemember };

    dispatch({
        type: SINGIN_ACTION_TYPES.USER_SIGNIN_REQUEST
    });
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (error) {
                dispatch({
                    type: SINGIN_ACTION_TYPES.USER_SIGNIN_FAILURE,
                    payload: {
                        email: "Yanlış Email",
                        password: "Yanlış Password"
                    }
                });
                resolve();
            } else {
                dispatch({
                    type: SINGIN_ACTION_TYPES.USER_SIGNIN_SUCCESS
                });
                localStorage.setItem("testObject", JSON.stringify(testObject));
                resolve();
            }
            reject("Rejected Unfortuanetly");
        }, 2000);
    });
};


export { SigninProvider, UseSigninState, UseSigninDispatch, onRequestHandler };

