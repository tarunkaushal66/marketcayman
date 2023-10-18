import * as yup from "yup";
import { Field } from "formik";
import { useEffect } from "react";
import classNames from "classnames";
import { InputGroup, Form } from "react-bootstrap";
import Select from "react-select";

export default function FormikSelectBox({
  name,
  label,
  errorLabel,
  required,
  type,
  defaultValue,
  selectList,
  ...props
}) {
  if (type === "select") {
    return (
      <Field
        name={name}
        validate={(val) => {
          try {
            yup
              .object()
              .concat(
                required &&
                  yup.object().required(`${errorLabel ?? label} is required`)
              )
              .validateSync(val);
            // yup.object().shape({
            //   value: yup
            //     .string()
            //     .concat(
            //       required &&
            //         yup.string().required(`${errorLabel ?? label} is required`)
            //     )
            //     .validateSync(val),
            // });
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
                <Select
                  classNamePrefix={"ShowMutts"}
                  options={selectList}
                  value={field.value}
                  onChange={(selected) => {
                    setFieldValue(name, selected);
                  }}
                  styles={{
                    container: (baseStyles) => ({
                      ...baseStyles,
                      width: "100%",
                    }),
                  }}
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
