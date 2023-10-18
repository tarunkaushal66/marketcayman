import * as yup from "yup";
import { Field } from "formik";
import { useEffect } from "react";
import classNames from "classnames";
import PhoneInput from "react-phone-input-2";
import phone from "phone";
import { InputGroup, Form } from "react-bootstrap";

export default function FormikMobileInput({
  name,
  label,
  errorLabel,
  required,
  type,
  defaultValue,
  ...props
}) {
  if (type === "mobile") {
    return (
      <Field
        name={name}
        validate={(val) => {
          try {
            yup
              .string()
              .concat(
                required &&
                  yup.string().required(`${errorLabel ?? label} is required`)
              )
              .concat(
                !!val &&
                  yup
                    .string()
                    .test(
                      "phone",
                      "Mobile number is invalid",
                      (val) => phone("+" + val).isValid
                    )
              )

              .validateSync(val);
          } catch (error) {
            return error.message;
          }
        }}
      >
        {function FormikField({
          field: { name, value },
          form: { setFieldValue, setFieldTouched, validateField },
          meta: { error, touched },
        }) {
          //important for validation
          useEffect(() => {
            if (value === undefined && typeof defaultValue === "string") {
              setFieldValue(name, defaultValue);
            } else if (value === undefined && required) {
              setFieldValue(name, "");
            }
          }, []);
          return (
            <>
              <Form.Label className="form-label2 m-0">{label}</Form.Label>
              <InputGroup>
                <PhoneInput
                  type="text"
                  name={name}
                  placeholder=""
                  onChange={(value, others) => {
                    setFieldValue(name, value).then(() => validateField(name));
                    setFieldValue(`${name}Code`, "+" + others.dialCode);
                  }}
                  onBlur={() => setFieldTouched(name, true)}
                  value={value}
                  country={"in"}
                  inputClass="w-100"
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={classNames({
                    "d-block": error && touched,
                  })}
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
