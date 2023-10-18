import { toast } from "react-toastify";
import { getImageLink } from "../redux/common/thunk";
import LoadIndicator from "../layout/load-indicator";

export const getMediaLink = async (file, dispatch) => {
  try {
    const formData = new FormData();
    formData.append("profileImage", file);
    const response = await dispatch(getImageLink(formData)).unwrap();
    return response.data;
  } catch (error) {
    toast.error(error.message);
    console.log("error", error.message);
  }
};
