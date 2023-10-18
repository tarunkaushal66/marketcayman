import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import MobilePage from "./components/mobilePage";
import OtpPage from "./components/otpPage";
import DetailsPage from "./components/detailsPage";
import { auth } from "../../../firebase";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import { signup } from "../../../redux/auth/thunk";
import { useNavigate } from "react-router-dom";
import LoadIndicator from "../../../layout/load-indicator";

const initialValues = {};

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupStep, setSignupStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const nextPage = () => {
    setSignupStep(signupStep + 1);
  };

  function onCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA solved response", response);
            // onSignup();
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
          "expired-callback": () => {
            console.log("expired-callback");
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
      window.recaptchaVerifier.render();
    }
  }

  const handleSendOtp = async (values) => {
    setLoading(true);
    const captchaResponse = await onCaptchaVerify();
    const appVerifier = window.recaptchaVerifier;
    // console.log("captchaResponse", captchaResponse);
    // console.log("auth", auth);
    // console.log("appVerifier", appVerifier);

    auth.settings.appVerificationDisabledForTesting = true;

    const phoneNumber = `+${values.phoneNumber}`;

    await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // console.log("confirmationResult", confirmationResult);

        window.confirmationResult = confirmationResult;
        toast.success("OTP sent");
        nextPage();
      })
      .catch((error) => {
        console.log("firebase error", error);
        if (error.message === "Firebase: Error (auth/too-many-requests).") {
          toast.error("Too many request please try after sometime");
        } else {
          toast.error(error.message);
        }
      });
    setLoading(false);
  };

  const verifyOtp = async (values) => {
    try {
      const otpVerificationResponse = await window.confirmationResult.confirm(
        values.otp
      );
      nextPage();
    } catch (error) {
      if (
        error.message === "Firebase: Error (auth/invalid-verification-code)."
      ) {
        toast.error("Invalid OTP");
      } else if (error.message === "Firebase: Error (auth/code-expired).") {
        toast.error("OTP expired");
      } else {
        toast.error(error.message);
      }
      console.log("verify error", error.message);
    }
  };

  const registerUser = async (values) => {
    try {
      const request = { ...values };
      delete request.otp;
      delete request.phoneNumberCode;
      delete request.confirmPassword;

      const response = await dispatch(signup(request)).unwrap();
      toast.success("User registered successfully");
      navigate("/");
      console.log("response", response);
    } catch (error) {
      toast.error(error.message);
      console.log("error", error);
    }
  };

  const handleSubmit = (values) => {
    if (signupStep === 1) {
      handleSendOtp(values);
      // nextPage();
    } else if (signupStep === 2) {
      verifyOtp(values);
      // nextPage();
    } else if (signupStep === 3) {
      registerUser(values);
    }
  };

  console.log("loading", loading);

  return (
    <>
      {loading && <LoadIndicator forceLoader={true} />}
      <div id="recaptcha-container" />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {function FormikForm({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit: formikSubmit,
          isSubmitting,
          validateForm,
          setFieldValue,
          setFieldTouched,
          setValues,
          /* and other goodies */
        }) {
          const handleSubmit = async (e) => {
            e.preventDefault();
            const errors = await validateForm();
            formikSubmit(e);
          };

          return (
            <>
              {signupStep === 1 ? (
                <MobilePage handleSubmit={handleSubmit} />
              ) : signupStep === 2 ? (
                <OtpPage handleSubmit={handleSubmit} />
              ) : (
                signupStep === 3 && <DetailsPage handleSubmit={handleSubmit} />
              )}
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default SignUp;
