import { useEffect, useState, Fragment } from "react";
import * as yup from "yup";
import { Field } from "formik";
import { Form, InputGroup } from "react-bootstrap";
import classNames from "classnames";
import { HiEyeOff, HiEye } from "react-icons/hi";
import { ImEye, ImEyeBlocked } from "react-icons/im";

export default function FormikPasswordInput({
  name,
  label,
  errorLabel,
  required,
  type,
  defaultValue,
  checkRules,
  matchWith,
  ...props
}) {
  if (type === "password") {
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
                checkRules &&
                  yup
                    .string()
                    .required(`${errorLabel ?? label} is required`)
                    .min(8, "Minimum Password length is 8.")
                    .max(16, "Maximum Password length is 16")
                    .matches(
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                      "Password must contain atleast a capital letter, a lowercase letter, a number and a special character."
                    )
              )
              // .concat(
              //   matchWith &&
              //     yup
              //       .string()
              //       .oneOf(
              //         [yup.ref(matchWith), null],
              //         "Password and Confirm Password must match"
              //       )
              // )
              .validateSync(val);

            console.log("matchWith", matchWith);
          } catch (error) {
            return error.message;
          }
        }}
      >
        {function FormikField({
          field, // { name, value, onChange, onBlur }
          form: { setFieldValue },
          meta: { error, touched },
        }) {
          const [show, setShow] = useState(false);
          const toggleShow = () => setShow((prev) => !prev);

          //important for validation
          useEffect(() => {
            if (field.value === undefined && typeof defaultValue === "string") {
              setFieldValue(name, defaultValue);
            } else if (field.value === undefined && required) {
              setFieldValue(name, "");
            }
          }, []);

          return (
            <Fragment>
              <Form.Label
                className="ps-2 m-0"
                htmlFor={"password-input-" + name}
              >
                {label}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  {...field}
                  {...props}
                  type={show ? "text" : "password"}
                  className="bg-transparent"
                  id={"password-input-" + name}
                />
                <InputGroup.Text
                  style={{ cursor: "pointer" }}
                  onClick={toggleShow}
                >
                  {show ? (
                    <ImEye style={{ height: 18, width: 18 }} />
                  ) : (
                    <ImEyeBlocked style={{ height: 18, width: 18 }} />
                  )}
                </InputGroup.Text>
              </InputGroup>
              <Form.Control.Feedback
                type="invalid"
                className={classNames({ "d-block": error && touched })}
              >
                {error}
              </Form.Control.Feedback>
            </Fragment>
          );
        }}
      </Field>
    );
  }
}
