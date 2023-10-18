import * as yup from "yup";
import { Field } from "formik";
import { useEffect } from "react";
import classNames from "classnames";
import { InputGroup, Form } from "react-bootstrap";
import OTPInput from "otp-input-react";

export default function FormikOtpField({
  name,
  label,
  errorLabel,
  required,
  type,
  defaultValue,
  ...props
}) {
  if (type === "otp") {
    return (
      <Field
        name={name}
        validate={(val) => {
          try {
            yup
              .string()
              .concat(
                required &&
                  yup
                    .string()
                    .required(`${errorLabel ?? label ?? name} is required`)
                    .min(6, "Please fill the 6 digit OTP")
              )
              .validateSync(val);
          } catch (error) {
            return error.message;
          }
        }}
      >
        {function FormikField({
          field, // { name, value, onChange, onBlur },
          form: { setFieldValue },
          meta: { error, touched },
        }) {
          //important for validation
          useEffect(() => {
            if (!field.value && typeof defaultValue === "string") {
              setFieldValue(name, defaultValue);
            } else if (!field.value && required) {
              setFieldValue(name, "");
            }
          }, []);

          return (
            <>
              <Form.Label className="form-label2 m-0">{label}</Form.Label>
              <InputGroup>
                <OTPInput
                  value={field.value}
                  onChange={(otpValue) => {
                    setFieldValue(name, otpValue);
                  }}
                  autoFocus
                  OTPLength={6}
                  otpType={props.otpType || "number"}
                  className="otpBox"
                  inputStyles={{
                    width: "100%",
                  }}
                  {...props}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={classNames({ "d-block": error && touched })}
                >
                  {error}
                </Form.Control.Feedback>
              </InputGroup>
            </>
          );
        }}
      </Field>
    );
  }
}
