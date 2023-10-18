import { useEffect, Fragment } from "react";
import * as yup from "yup";
import { Field } from "formik";
import { Form, InputGroup } from "react-bootstrap";
import classNames from "classnames";

export default function FormikEmailInput({
  name,
  label,
  errorLabel,
  required,
  type,
  defaultValue,
  ...props
}) {
  if (type === "email") {
    //console.log("digga ",yup.string().email("not valid email").validateSync("dfdfd"));
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
              .email("Please enter a valid email")
              .validateSync(val);
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
              <Form.Label className="ps-2 m-0" htmlFor={"email-input-" + name}>
                {label}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  {...field}
                  {...props}
                  type={"email"}
                  className="bg-transparent"
                  id={"email-input-" + name}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={classNames({ "d-block": error && touched })}
                >
                  {error}
                </Form.Control.Feedback>
              </InputGroup>
            </Fragment>
          );
        }}
      </Field>
    );
  }
}
