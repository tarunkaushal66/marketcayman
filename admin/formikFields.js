import { Field } from "formik";
import {
  Fragment,
  useEffect,
  useReducer,
  useRef,
  useState,
  useCallback,
} from "react";
import { Form, InputGroup } from "react-bootstrap";
import classNames from "classnames";
import * as yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { phone } from "phone";
import get from "lodash/get";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { downloadFile } from "helpers/download-file";
import createImage from "helpers/getPlaceholder";
import getDynamicImage from "helpers/get-dynamic-image";
import {
  MdOutlineFileDownload,
  MdOutlineFileUpload,
  MdClose,
} from "react-icons/md";
import { HiEyeOff, HiEye } from "react-icons/hi";

import BootstrapSwitchButton from "bootstrap-switch-button-react";
import CreditCardInput from "react-credit-card-input";
import payment from "payment";
import { uploadFile } from "redux/states/_file/actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export default function FormikField({
  name,
  label,
  errorLabel,
  required,
  type,
  defaultValue,
  numberPositive = false,
  selectList,
  fileName,
  fileSize = 5, //MB
  fileAccept,
  fileUpload,
  passwordCheckRules,
  switchLabelOn,
  switchLabelOff,
  radioList,
  addressLatField = "lat",
  addressLngField = "lng",
  ...props
}) {
  const dispatch = useDispatch();
  const onUploadFile = useCallback(
    (file, { onUpload, onFail } = {}) => {
      console.log("bhola gupta here");
      dispatch(
        uploadFile({
          data: { image: file },
          onSuccess: (payload) => {
            console.log("Success payload", payload);
            toast.success("File Uploaded Successfully");
          },
          onFail: (payload) => {
            console.log("Error payload", payload);
            toast.error(payload.error?.message);
            onFail?.(payload);
          },
          onEnd: (payload) => {
            console.log("Final payload", payload);
            onUpload?.(payload);
          },
          showLoader: true,
        })
      );
    },
    [dispatch]
  );

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

          return (
            <Fragment>
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
            </Fragment>
          );
        }}
      </Field>
    );
  }

  if ("number" === type) {
    return (
      <Field
        name={name}
        validate={(val) => {
          try {
            yup
              .number()
              .concat(
                required &&
                  yup.number().required(`${errorLabel ?? label} is required`)
              )
              .concat(
                numberPositive && yup.number().min(0, "Can't be in negative")
              )
              .transform((value) => (isNaN(value) ? undefined : value))
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

          return (
            <Fragment>
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
            </Fragment>
          );
        }}
      </Field>
    );
  }

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
              <Form.Label className="form-label2 m-0">{label}</Form.Label>
              <InputGroup>
                <Form.Control {...field} {...props} type={"email"} />
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
                passwordCheckRules &&
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
              <Form.Label className="form-label2 m-0">{label}</Form.Label>
              <InputGroup>
                <Form.Control
                  {...field}
                  {...props}
                  type={show ? "text" : "password"}
                />
                <InputGroup.Text
                  style={{ cursor: "pointer" }}
                  onClick={toggleShow}
                >
                  {show ? (
                    <HiEye style={{ height: 14, width: 14 }} />
                  ) : (
                    <HiEyeOff style={{ height: 14, width: 14 }} />
                  )}
                </InputGroup.Text>
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
            <Fragment>
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
                  country={"us"}
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
            </Fragment>
          );
        }}
      </Field>
    );
  }

  if (type === "select") {
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
          field, // { name, value, onChange, onBlur }
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
            <Fragment>
              <Form.Label className="form-label2 m-0">{label}</Form.Label>
              <InputGroup>
                <Form.Select {...field} {...props}>
                  <option value="">None</option>
                  {selectList?.map((item, index) => (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  ))}
                </Form.Select>
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

  if (type === "address") {
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
          field: { name, value, onChange, onBlur },
          form: { setFieldValue, validateField, errors, setFieldTouched },
          meta: { error, touched },
        }) {
          //important for validation
          useEffect(() => {
            if (!value && typeof defaultValue === "string") {
              setFieldValue(name, defaultValue);
            } else if (!value && required) {
              setFieldValue(name, "");
            }
          }, []);

          function onFetchLatLng(placeId) {
            geocodeByPlaceId(placeId)
              .then((geocode) => {
                getLatLng(geocode?.[0])
                  .then((coords) => {
                    setFieldValue(addressLatField, coords.lat);
                    setFieldValue(addressLngField, coords.lng);
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              })
              .catch((err) => {
                console.error(err);
              });
          }

          return (
            <Fragment>
              <Form.Label className="form-label2 m-0">{label}</Form.Label>
              <InputGroup>
                <PlacesAutocomplete
                  value={value}
                  onSelect={(val, placeId) => {
                    onFetchLatLng(placeId);
                    setFieldValue(name, val).then(() => validateField(name));
                  }}
                  onChange={(val) =>
                    setFieldValue(name, val).then(() => validateField(name))
                  }
                  onError={(val) => console.error("Google Map Error :", val)}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <Fragment>
                      <Form.Control
                        {...getInputProps()}
                        name={name}
                        onBlur={onBlur}
                        {...props}
                      />
                      <div className="autocomplete-dropdown-container">
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? {
                                backgroundColor: "rgb(204 214 239)",
                                cursor: "pointer",
                              }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <div className="google-select-pop">
                                {suggestion.description}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Fragment>
                  )}
                </PlacesAutocomplete>
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
  if (type === "autocomplete-select") {
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
          field: { name, value, onChange, onBlur },
          form: { setFieldValue, validateField, errors, setFieldTouched },
          meta: { error, touched },
        }) {
          //important for validation
          useEffect(() => {
            if (!value && typeof defaultValue === "string") {
              setFieldValue(name, defaultValue);
            } else if (!value && required) {
              setFieldValue(name, "");
            }
          }, []);

          return (
            <Fragment>
              <Form.Label className="form-label2 m-0">{label}</Form.Label>
              <InputGroup>
                <PlacesAutocomplete
                  value={value}
                  onSelect={(val) =>
                    setFieldValue(name, val).then(() => validateField(name))
                  }
                  onChange={(val) =>
                    setFieldValue(name, val).then(() => validateField(name))
                  }
                  onError={(val) => console.error("Google Map Error :", val)}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <Fragment>
                      <Form.Control
                        {...getInputProps()}
                        name={name}
                        onBlur={onBlur}
                        {...props}
                      />
                      <div className="autocomplete-dropdown-container">
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? {
                                backgroundColor: "rgb(204 214 239)",
                                cursor: "pointer",
                              }
                            : { backgroundColor: "#ffffff", cursor: "pointer" };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <div className="google-select-pop">
                                {suggestion.description}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Fragment>
                  )}
                </PlacesAutocomplete>
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

  if (type === "card") {
    //console.log("digga ",yup.string().email("not valid email").validateSync("dfdfd"));
    return (
      <Field
        name={name}
        validate={(val) => {
          try {
            yup
              .object()
              .concat(
                (required || Object.values(val).some((item) => !!item)) &&
                  yup.object().shape({
                    cardNumber: yup
                      .string()
                      .required("Number on card is required")
                      .test("numbervalid", "Card Number is not valid", (val) =>
                        payment.fns.validateCardNumber(val)
                      ),
                    cardExpiry: yup
                      .string()
                      .required("Expiry on card is required")
                      .test("expiryvalid", "Card Expiry is not valid", (val) =>
                        payment.fns.validateCardExpiry(val)
                      ),
                    cardCVC: yup
                      .string()
                      .required("CVC on card is required")
                      .test("cvcvalid", "Card CVC is not valid", (val) =>
                        payment.fns.validateCardCVC(val)
                      ),
                  })
              )
              .validateSync(val, { abortEarly: false });
          } catch (error) {
            const errors = {};
            error.inner
              ?.reverse()
              ?.forEach((err) => (errors[err.path] = err.message));
            return errors;
          }
        }}
      >
        {function FormikField({
          field, // { name, value, onChange, onBlur }
          form: {
            handleChange,
            handleBlur,
            setFieldValue,
            errors,
            values,
            touched,
          },
        }) {
          //important for validation
          useEffect(() => {
            if (!field.value && typeof defaultValue === "object") {
              setFieldValue(name, defaultValue);
            } else if (required) {
              setFieldValue(name, {
                cardNumber: field.value?.cardNumber || "",
                cardExpiry: field.value?.cardExpiry || "",
                cardCVC: field.value?.cardCVC || "",
              });
            }
          }, []);

          return (
            <Fragment>
              <Form.Label className="form-label2 m-0">{label}</Form.Label>
              <InputGroup>
                <CreditCardInput
                  cardNumberInputProps={{
                    name: `${name}.cardNumber`,
                    value: field.value?.cardNumber,
                    onChange: handleChange,
                    onBlur: handleBlur,
                  }}
                  cardExpiryInputProps={{
                    name: `${name}.cardExpiry`,
                    value: field.value?.cardExpiry,
                    onChange: handleChange,
                    onBlur: handleBlur,
                  }}
                  cardCVCInputProps={{
                    name: `${name}.cardCVC`,
                    value: field.value?.cardCVC,
                    onChange: handleChange,
                    onBlur: handleBlur,
                  }}
                  fieldClassName="form-control"
                  dangerTextClassName="d-none"
                />
                <Form.Control.Feedback
                  type="invalid"
                  className={classNames({
                    "d-block":
                      (errors?.[name]?.cardNumber &&
                        touched?.[name]?.cardNumber) ||
                      (errors?.[name]?.cardExpiry &&
                        touched?.[name]?.cardExpiry) ||
                      (errors?.[name]?.cardCVC && touched?.[name]?.cardCVC),
                  })}
                >
                  {errors?.[name]?.cardNumber ||
                    errors?.[name]?.cardExpiry ||
                    errors?.[name]?.cardCVC}
                </Form.Control.Feedback>
              </InputGroup>
            </Fragment>
          );
        }}
      </Field>
    );
  }

  if (type === "file") {
    return (
      <Field
        name={name}
        validate={(val) => {
          try {
            yup
              .mixed()
              .concat(
                required &&
                  yup
                    .mixed()
                    .test(
                      "file",
                      `${errorLabel ?? label} is required`,
                      (val) => !!val
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
          form: { setFieldValue, setFieldError, setFieldTouched },
          meta: { error, touched },
        }) {
          const fileRef = useRef(null);
          const file = getDynamicImage(value, createImage(100, 100, "UPLOAD"));

          //important for validation
          useEffect(() => {
            if (value === undefined && typeof defaultValue === "string") {
              setFieldValue(name, defaultValue);
            } else if (value === undefined && required) {
              setFieldValue(name, null);
            }
          }, []);

          var nameOfFile = "file";
          if (value instanceof File) {
            nameOfFile = value.name;
          } else if (typeof value === "string") {
            nameOfFile = value.split("/").pop();
          }

          useEffect(() => {
            if (fileUpload && value instanceof File) {
              console.log("Upload started ", value);
              onUploadFile(value, {
                onUpload: (payload) => {
                  if (typeof fileUpload === "function") {
                    fileUpload?.(payload);
                  } else {
                    setFieldValue(name, payload?.response?.data?.link);
                  }
                },
                onFail: (payload) => {
                  setFieldValue(name, null);
                },
              });
            }
          }, [fileUpload, value]);

          return (
            <Fragment>
              <Form.Label className="form-label2 m-0">{label}</Form.Label>
              <InputGroup className="flex-column  upload-file">
                <input
                  type="file"
                  className="position-absolute"
                  onChange={(e) => {
                    if (e && e.target.files?.length > 0) {
                      if (e.target.files[0].size > fileSize * 1024 * 1024) {
                        setFieldError(name, `File size limit is ${fileSize}mb`);
                        return;
                      }
                      setFieldValue(name, e.target.files[0]);
                    } else if (!e.target.files) {
                      fileRef.current.click();
                    }
                  }}
                  hidden
                  value={""}
                  ref={fileRef}
                  accept={fileAccept}
                />
                <div className="inner position-relative border">
                  {value && (
                    <MdClose
                      onClick={() => setFieldValue(name, null)}
                      style={{
                        width: 24,
                        height: 24,
                        color: "black",
                        cursor: "pointer",
                        position: "absolute",
                        left: 0,
                        top: 0,
                        padding: 3,
                        backgroundColor: "white",
                      }}
                    />
                  )}
                  <img src={file} className="img-fluid w-100 h-100 " />
                  {value && (
                    <span
                      className="btn rounded-circle d-flex align-items-center justify-content-center position-absolute"
                      onClick={() =>
                        downloadFile(value, fileName || nameOfFile)
                      }
                    >
                      <MdOutlineFileDownload
                        style={{
                          width: 18,
                          height: 18,
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                  )}
                  {!value && (
                    <span
                      className="btn rounded-circle d-flex align-items-center justify-content-center position-absolute"
                      onClick={() => (
                        fileRef.current.click(),
                        setTimeout(() => setFieldTouched(name), 500)
                      )}
                    >
                      <MdOutlineFileUpload
                        style={{
                          width: 18,
                          height: 18,
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                    </span>
                  )}
                </div>
                {!value && (
                  <p className="small-text m-0 text-muted">
                    {fileAccept} <br /> Max. upload file size: {fileSize}MB
                  </p>
                )}
                {value instanceof File && (
                  <p className="small-text m-0 text-muted">{nameOfFile}</p>
                )}
                {typeof value === "string" && (
                  <p className="small-text m-0 text-muted">{nameOfFile}</p>
                )}
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

  if (type === "textarea") {
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
              <Form.Label className="form-label2 m-0">{label}</Form.Label>
              <InputGroup>
                <Form.Control {...field} as={"textarea"} {...props} />
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
            <Fragment>
              <div className="d-flex align-items-center justify-content-between w-100 mt-3 pt-1">
                <Form.Label className="form-label2 m-0">{label}</Form.Label>
                <div className="switch-btn-cstm">
                  <BootstrapSwitchButton
                    width={92}
                    height={36}
                    checked={value}
                    onlabel={switchLabelOn || "Yes"}
                    offlabel={switchLabelOff || "No"}
                    onChange={(e) => setFieldValue(name, !value)}
                  />
                </div>
                <Form.Control.Feedback
                  type="invalid"
                  className={classNames({ "d-block": error && touched })}
                >
                  {error}
                </Form.Control.Feedback>
              </div>
            </Fragment>
          );
        }}
      </Field>
    );
  }

  if (["radio"].includes(type)) {
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
          field: { name, value, onChange, onBlur },
          form: { setFieldValue },
          meta: { error, touched },
        }) {
          //important for validation
          useEffect(() => {
            if (value === undefined && typeof defaultValue === "string") {
              setFieldValue(name, defaultValue);
            } else if (value === undefined && required) {
              setFieldValue(name, "");
            }
          }, [value]);

          console.log("piggy value", value);

          return (
            <Fragment>
              <div className="d-flex flex-column justify-content-between w-100 mt-3 pt-1">
                <Form.Label className="form-label2 m-0">{label}</Form.Label>
                <div className="">
                  {radioList.map((item, index) => (
                    <Form.Check
                      type={type}
                      name={name}
                      label={item.label}
                      id={name + "-" + item.label}
                      value={item.value}
                      checked={value === item.value}
                      onChange={(e) => setFieldValue(name, e.target.value)}
                      key={index}
                    />
                  ))}
                </div>
                <Form.Control.Feedback
                  type="invalid"
                  className={classNames({ "d-block": error && touched })}
                >
                  {error}
                </Form.Control.Feedback>
              </div>
            </Fragment>
          );
        }}
      </Field>
    );
  }

  return null;
}
