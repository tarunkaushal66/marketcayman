import React, { useRef, useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.css";
import { ReactComponent as UploadIcon } from "../../assets/icons/upload.svg";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as RightArrow } from "../../assets/icons/rightArrow.svg";
import userImage from "../../images/userProfile.png";
import { logout } from "../../redux/auth/thunk";
import { getUserProfile, updateUserProfile } from "../../redux/profile/thunk";
import ChangePassword from "../editProfile/changePassword";
import { getMediaLink } from "../../utils/services";

const listItems = [
  {
    title: "Your Products",
    pagePath: "/dashboard",
  },
  {
    title: "Change Password",
    pagePath: "/changePassword",
  },
  {
    title: "Term & Condition",
    pagePath: "/t&c",
  },
  {
    title: "About Us",
    pagePath: "/aboutus",
  },
  {
    title: "Privacy Policy",
    pagePath: "/policies",
  },
  {
    title: "Logout",
    pagePath: "/logout",
  },
];

export default function Profile() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const fileRef = useRef();
  const imageRef = useRef();
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.profile);
  const [profileImage, setProfileImage] = useState();
  const [imageWidth, setImageWidth] = useState(0);

  async function handleLogout() {
    try {
      const response = await dispatch(logout()).unwrap();
      console.log("response", response);
      toast.success("User logged out successfully");
      navigate("/");
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  }

  const getProfileDetails = async () => {
    try {
      const response = await dispatch(getUserProfile()).unwrap();
    } catch (error) {
      console.log("error", error);
      toast.error(error.message);
    }
  };

  const handleUpdateProfileImage = async () => {
    try {
      const request = {
        profilePic: profileImage.mediaUrl,
      };
      const response = await dispatch(updateUserProfile(request)).unwrap();
      toast.success("Profile Image Updated successfully");
    } catch (error) {
      toast.error(error.message);
    }
    setProfileImage("");
  };

  useEffect(() => {
    setImageWidth(imageRef.current.offsetWidth);
    const getwidth = () => {
      setImageWidth(imageRef.current.offsetWidth);
    };
    window.addEventListener("resize", getwidth);

    return () => window.removeEventListener("resize", getwidth);
  }, []);

  useEffect(() => {
    getProfileDetails();
  }, [profileImage]);

  // console.log("pathName", pathname);
  // console.log("userProfile", userProfile);
  // console.log("profileImage", profileImage);

  return (
    <div className="d-flex justify-content-center">
      <Container fluid>
        <Row className="d-flex justify-center m-0 m-md-5 ">
          <Col xs={12} lg={6}>
            <div className={styles.container}>
              <div className={styles.main}>
                <div className="text-center">
                  <div className="w-50 mx-auto position-relative">
                    <img
                      ref={imageRef}
                      className="w-100 rounded-circle"
                      src={
                        profileImage?.mediaUrl ||
                        userProfile.data?.profilePic ||
                        userImage
                      }
                      style={{ height: `${imageWidth}px` }}
                      alt=""
                    />
                    <div
                      onClick={() => {
                        if (!profileImage) {
                          fileRef.current.click();
                        } else {
                          handleUpdateProfileImage();
                        }
                      }}
                      className={` ${styles.profileImageEditIconWrapper}`}
                    >
                      <input
                        type="file"
                        className="position-absolute d-none"
                        onChange={(e) => {
                          if (e && e.target.files?.length > 0) {
                            if (e.target.files[0].size > 2 * 1024 * 1024) {
                              toast.error(`File size limit is 2 mb`);
                              return;
                            }
                            getMediaLink(e.target.files[0], dispatch).then(
                              (image) => {
                                setProfileImage(image?.[0]);
                              }
                            );
                          } else if (!e.target.files) {
                            fileRef.current.click();
                          }
                        }}
                        ref={fileRef}
                        accept={".png, .jpg, .jpeg"}
                      />
                      {!profileImage ? (
                        <Pencil className={`categoryIcon`} />
                      ) : (
                        <UploadIcon style={{ margin: 8 }} className={`icon`} />
                      )}
                    </div>
                  </div>
                  <div className="my-3">
                    <h5>{userProfile.data?.name}</h5>
                    <b>{userProfile.data?.email}</b>
                  </div>
                  {/* <button
                    onClick={() => navigate("/editProfile")}
                    className="primaryBtn font-weight-bold"
                  >
                    Edit Your Profile
                    <Pencil className={`${styles.editIcon} icon`} />
                  </button> */}
                </div>

                {pathname === "/profile"
                  ? listItems.map((item) => (
                      <div
                        key={item.pagePath}
                        onClick={() => {
                          if (item.title === "Logout") {
                            handleLogout();
                          } else {
                            navigate(item.pagePath);
                          }
                        }}
                        className={`${styles.listItem} pointer d-flex justify-content-between align-items-center`}
                      >
                        <p className="m-0">{item.title}</p>
                        <RightArrow className="icon categoryIcon" />
                      </div>
                    ))
                  : pathname === "/changePassword" && <ChangePassword />}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
