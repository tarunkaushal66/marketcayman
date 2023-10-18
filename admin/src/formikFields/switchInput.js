import * as yup from "yup";
import { Field } from "formik";
import { useEffect } from "react";
import classNames from "classnames";
import { Form } from "react-bootstrap";
import Switch from "react-switch";

export default function FormikSwitchInput({
  name,
  label,
  errorLabel,
  required,
  type,
  defaultValue,
  ...props
}) {
  if (type === "switch") {
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
          field: { name, value, onChange, onBlur },
          form: { setFieldValue },
          meta: { error, touched },
        }) {
          //important for validation
          useEffect(() => {
            if (!value && typeof defaultValue === "boolean") {
              setFieldValue(name, defaultValue);
            } else if (!value && required) {
              setFieldValue(name, false);
            }
          }, []);

          return (
            <>
              <div className="d-flex align-items-center justify-content-between w-100 mt-3 pt-1">
                <Form.Label className="form-label2 m-0 me-3">
                  {label}
                </Form.Label>
                <div className="cstmSwitch d-flex align-items-center">
                  <Switch
                    offColor={"transparent"}
                    onColor={"transparent"}
                    offHandleColor="#3D3A34"
                    onHandleColor="#FFA800"
                    onChange={(selected) => setFieldValue(name, selected)}
                    checked={value}
                  />
                </div>
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
