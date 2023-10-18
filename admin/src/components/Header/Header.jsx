import React, { useRef, useState } from "react";
import {
  Container,
  Nav,
  Dropdown,
  Button,
  Navbar,
  NavDropdown,
  Form,
  Modal,
} from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ConfirmModal from "../Modals/ConfirmModal";
import UserProfileView from "../Modals/UserProfileVIew";
import ChangePassword from "../Modals/changePassword";
import UpdateProfile from "../Modals/editProfile";
import { logout } from "../../redux/states/auth/actions";
import { editProfile } from "../../redux/states/auth/thunks/profile/editProfile";
import { getProfile } from "../../redux/states/auth/thunks/profile/getProfile";
import { imageUpload } from "../../redux/states/common/thunks/imageUpload";

const Header = ({ sidebar, setSidebar }) => {
  const { admin } = useSelector((s) => s.auth) ?? {};
  const dispatch = useDispatch();
  const logoutModal = useRef();

  const [viewData, setViewData] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdateProfile = async (values) => {
    console.log("handleUpdateProfile");
    try {
      const imageUrl = await dispatch(
        imageUpload({ file: values.image })
      ).unwrap();

      const request = {
        name: values.name,
        email: values.email,
        full_phone_number: values.full_phone_number,
        image: imageUrl?.body[0]?.image_url,
      };

      const response = await dispatch(editProfile(request)).unwrap();
      if (response.success) {
        toast.success("Profile updated successfully");
        setEditingProfile((prev) => !prev);
        dispatch(getProfile())
          .unwrap()
          .catch((error) => toast.error(error.message));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log("admin", admin);
  console.log("admin.image", admin?.image);

  return (
    <>
      <header className="header  pt-lg-4 pt-2" style={{ zIndex: "99" }}>
        <Navbar expand="lg" className="p-0">
          <Container fluid className="gap-10">
            <div className="left d-flex align-items-center">
              <Button
                onClick={handleSidebar}
                variant="transparent"
                className="d-lg-none Toggle border-0 p-0 me-2 d-flex align-items-center justify-content-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M1.6875 10.1251C1.43886 10.1251 1.2004 10.0263 1.02459 9.85049C0.848772 9.67468 0.75 9.43622 0.75 9.18758V1.68945C0.75 1.44081 0.848772 1.20236 1.02459 1.02654C1.2004 0.850725 1.43886 0.751953 1.6875 0.751953H9.1875C9.43614 0.751953 9.6746 0.850725 9.85041 1.02654C10.0262 1.20236 10.125 1.44081 10.125 1.68945V9.18758C10.125 9.43622 10.0262 9.67468 9.85041 9.85049C9.6746 10.0263 9.43614 10.1251 9.1875 10.1251H1.6875ZM14.8125 10.1251C14.5639 10.1251 14.3254 10.0263 14.1496 9.85049C13.9738 9.67468 13.875 9.43622 13.875 9.18758V1.68945C13.875 1.44081 13.9738 1.20236 14.1496 1.02654C14.3254 0.850725 14.5639 0.751953 14.8125 0.751953H22.3106C22.5593 0.751953 22.7977 0.850725 22.9735 1.02654C23.1494 1.20236 23.2481 1.44081 23.2481 1.68945V9.18758C23.2481 9.43622 23.1494 9.67468 22.9735 9.85049C22.7977 10.0263 22.5593 10.1251 22.3106 10.1251H14.8125ZM1.6875 23.2501C1.43886 23.2501 1.2004 23.1513 1.02459 22.9755C0.848772 22.7997 0.75 22.5612 0.75 22.3126V14.8126C0.75 14.5639 0.848772 14.3255 1.02459 14.1497C1.2004 13.9739 1.43886 13.8751 1.6875 13.8751H9.1875C9.43614 13.8751 9.6746 13.9739 9.85041 14.1497C10.0262 14.3255 10.125 14.5639 10.125 14.8126V22.3126C10.125 22.5612 10.0262 22.7997 9.85041 22.9755C9.6746 23.1513 9.43614 23.2501 9.1875 23.2501H1.6875ZM14.8125 23.2501C14.5639 23.2501 14.3254 23.1513 14.1496 22.9755C13.9738 22.7997 13.875 22.5612 13.875 22.3126V14.8126C13.875 14.5639 13.9738 14.3255 14.1496 14.1497C14.3254 13.9739 14.5639 13.8751 14.8125 13.8751H22.3106C22.5593 13.8751 22.7977 13.9739 22.9735 14.1497C23.1494 14.3255 23.2481 14.5639 23.2481 14.8126V22.3126C23.2481 22.5612 23.1494 22.7997 22.9735 22.9755C22.7977 23.1513 22.5593 23.2501 22.3106 23.2501H14.8125Z"
                    fill="black"
                  />
                </svg>
              </Button>
              <ul className="list-unstyled welcome ps-0 mb-0 d-lg-flex align-items-center gap-10 d-none">
                <li className="px-1">
                  <h4 className="m-0">
                    Good morning, {admin?.name}{" "}
                    <span className="icn">
                      <img
                        src="/assets/images/hello.svg"
                        alt=""
                        className="img-fluid"
                      />
                    </span>
                  </h4>
                </li>
                <li className="px-1">
                  <p className="m-0">Let’s check your Details today</p>
                </li>
              </ul>
            </div>
            <div className="logo d-lg-none position-absolute mx-auto h-100">
              <Link to="" className="h-100">
                <img
                  src={"/assets/images/headerLogo.png"}
                  alt=""
                  className="img-fluid h-100"
                />
              </Link>
            </div>
            <div className="right ">
              <ul className="list-unstyled ps-0 mb-0 d-flex align-items-center gap-10">
                <li
                  className="d-flex align-items-center gap-10 profile pointer"
                  onClick={() => {
                    setViewData((prev) => !prev);
                  }}
                >
                  <div className="imgWrp">
                    <img
                      src={admin.image || "/assets/images/logo.png"}
                      alt=""
                      className="img-fluid rounded-circle"
                      style={{ height: "45px" }}
                    />
                  </div>
                  <div className="content">
                    <h6 className="fw-bold m-0">{admin?.name}</h6>
                    <p className="text-muted m-0">{admin?.full_phone_number}</p>
                  </div>
                </li>
                <li className="d-flex align-items-center gap-10">
                  <Button
                    variant="transparent"
                    className="border-0 p-0"
                    onClick={() => logoutModal.current?.show()}
                  >
                    <span className="icn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.8966 3.02481C17.6431 2.80087 18.4316 2.75454 19.1992 2.88953C19.9669 3.02452 20.6923 3.33709 21.3176 3.80228C21.9429 4.26747 22.4509 4.87241 22.8008 5.5688C23.1508 6.26519 23.3331 7.03376 23.3333 7.81315V32.1865C23.3331 32.9659 23.1508 33.7344 22.8008 34.4308C22.4509 35.1272 21.9429 35.7322 21.3176 36.1973C20.6923 36.6625 19.9669 36.9751 19.1992 37.1101C18.4316 37.2451 17.6431 37.1988 16.8966 36.9748L6.89659 33.9748C5.86675 33.6659 4.96393 33.0332 4.32205 32.1707C3.68018 31.3081 3.33343 30.2616 3.33325 29.1865V10.8131C3.33343 9.73797 3.68018 8.6915 4.32205 7.82895C4.96393 6.96641 5.86675 6.33374 6.89659 6.02481L16.8966 3.02481ZM24.9999 6.66648C24.9999 6.22445 25.1755 5.80053 25.4881 5.48797C25.8006 5.17541 26.2246 4.99981 26.6666 4.99981H31.6666C32.9927 4.99981 34.2644 5.5266 35.2021 6.46428C36.1398 7.40196 36.6666 8.67373 36.6666 9.99981V11.6665C36.6666 12.1085 36.491 12.5324 36.1784 12.845C35.8659 13.1575 35.4419 13.3331 34.9999 13.3331C34.5579 13.3331 34.134 13.1575 33.8214 12.845C33.5088 12.5324 33.3333 12.1085 33.3333 11.6665V9.99981C33.3333 9.55778 33.1577 9.13386 32.8451 8.8213C32.5325 8.50874 32.1086 8.33315 31.6666 8.33315H26.6666C26.2246 8.33315 25.8006 8.15755 25.4881 7.84499C25.1755 7.53243 24.9999 7.10851 24.9999 6.66648ZM34.9999 26.6665C35.4419 26.6665 35.8659 26.8421 36.1784 27.1546C36.491 27.4672 36.6666 27.8911 36.6666 28.3331V29.9998C36.6666 31.3259 36.1398 32.5977 35.2021 33.5353C34.2644 34.473 32.9927 34.9998 31.6666 34.9998H26.6666C26.2246 34.9998 25.8006 34.8242 25.4881 34.5117C25.1755 34.1991 24.9999 33.7752 24.9999 33.3331C24.9999 32.8911 25.1755 32.4672 25.4881 32.1546C25.8006 31.8421 26.2246 31.6665 26.6666 31.6665H31.6666C32.1086 31.6665 32.5325 31.4909 32.8451 31.1783C33.1577 30.8658 33.3333 30.4418 33.3333 29.9998V28.3331C33.3333 27.8911 33.5088 27.4672 33.8214 27.1546C34.134 26.8421 34.5579 26.6665 34.9999 26.6665ZM14.9999 18.3331C14.5579 18.3331 14.134 18.5087 13.8214 18.8213C13.5088 19.1339 13.3333 19.5578 13.3333 19.9998C13.3333 20.4418 13.5088 20.8658 13.8214 21.1783C14.134 21.4909 14.5579 21.6665 14.9999 21.6665H15.0016C15.4436 21.6665 15.8675 21.4909 16.1801 21.1783C16.4927 20.8658 16.6683 20.4418 16.6683 19.9998C16.6683 19.5578 16.4927 19.1339 16.1801 18.8213C15.8675 18.5087 15.4436 18.3331 15.0016 18.3331H14.9999Z"
                          fill="#292D32"
                        />
                        <path
                          d="M34.9998 19.9998L31.6665 23.3332M26.6665 19.9998H34.9998H26.6665ZM34.9998 19.9998L31.6665 16.6665L34.9998 19.9998Z"
                          stroke="#3366FF"
                          strokeWidth="3.33333"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </Button>
                </li>
              </ul>
            </div>
          </Container>
        </Navbar>
      </header>
      <ConfirmModal
        ref={logoutModal}
        onConfirm={handleLogout}
        data={{ title: "Do you want to Logout?" }}
      />
      {viewData && (
        <UserProfileView
          data={admin}
          toggle={() => setViewData((prev) => !prev)}
          changingPassword={changingPassword}
          setChangingPassword={setChangingPassword}
          setEditingProfile={setEditingProfile}
        />
      )}
      {changingPassword && (
        <ChangePassword
          data={admin}
          closeModal={() => setChangingPassword((prev) => !prev)}
        />
      )}
      {editingProfile && (
        <UpdateProfile
          data={admin}
          closeModal={() => setEditingProfile((prev) => !prev)}
          handleUpdateProfile={handleUpdateProfile}
        />
      )}
    </>
  );
};
export default Header;
