import FormikTextInput from "./textInput";
import FormikEmailInput from "./emailInput";
import FormikPasswordInput from "./passwordInput";
import FormikMobileInput from "./mobileInput";
import FormikSelectBox from "./selectBox";
import FormikSwitchInput from "./switchInput";
import FormikCheckBoxInput from "./checkBoxInput";

export default function FormikField(props) {
  if (["text", "date", "datetime-local"].includes(props.type)) {
    return <FormikTextInput {...props} />;
  } else if (props.type === "email") {
    return <FormikEmailInput {...props} />;
  } else if (props.type === "password") {
    return <FormikPasswordInput {...props} />;
  } else if (props.type === "mobile") {
    return <FormikMobileInput {...props} />;
  } else if (props.type === "select") {
    return <FormikSelectBox {...props} />;
  } else if (props.type === "switch") {
    return <FormikSwitchInput {...props} />;
  } else if (props.type === "checkbox") {
    return <FormikCheckBoxInput {...props} />;
  }
}
