import * as yup from "yup";
import { Field } from "formik";
import { useEffect } from "react";
import classNames from "classnames";
import { Form, InputGroup } from "react-bootstrap";

export default function FormikTextInput({
  name,
  label,
  errorLabel,
  required,
  type,
  defaultValue,
  ...props
}) {
  if (["text", "date", "datetime-local"].includes(type)) {
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
            if (field.value === undefined && typeof defaultValue === "string") {
              setFieldValue(name, defaultValue);
            } else if (field.value === undefined && required) {
              setFieldValue(name, "");
            }
          }, []);

          // return "Bhola";
          return (
            <>
              <Form.Label className="form-label2 m-0">{label}</Form.Label>
              <InputGroup>
                <Form.Control {...field} {...props} type={type} />
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
