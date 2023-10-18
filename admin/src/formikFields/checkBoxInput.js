import * as yup from "yup";
import { Field } from "formik";
import { useEffect } from "react";
import classNames from "classnames";
import { Form } from "react-bootstrap";

export default function FormikCheckBoxInput({
  name,
  label,
  errorLabel,
  required,
  type,
  defaultValue,
  ...props
}) {
  if (type === "checkbox") {
    return (
      <Field
        name={name}
        validate={(val) => {
          try {
            yup.boolean().typeError("Must be true/false").validateSync(val);
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
            if (!field.value && typeof defaultValue === "boolean") {
              setFieldValue(name, defaultValue);
            } else if (!field.value && required) {
              setFieldValue(name, false);
            }
          }, []);

          return (
            <>
              <div className="d-flex align-items-center justify-content-between w-100 mt-3 pt-1">
                <Form.Label className="form-label2 m-0 me-3">
                  {label}
                </Form.Label>
                <Form.Check
                  {...field}
                  {...props}
                  checked={field.value}
                  type={"checkbox"}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={classNames({ "d-block": error && touched })}
                >
                  {error}
                </Form.Control.Feedback>
              </div>
            </>
          );
        }}
      </Field>
    );
  }
}
