// import styles from "./PostAdd.module.css";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../../screens/profile/Profile.module.css";
import styles2 from "./PostAdd.module.css";
import { ReactComponent as BuildingIcon } from "../../../assets/icons/iconbuilding.svg";
import { ReactComponent as RightArrow } from "../../../assets/icons/rightArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategories } from "../../../redux/adds/thunk";
import { toast } from "react-toastify";

export default function SelectSubCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subCategories } = useSelector((state) => state.ads);

  const fetchCategories = async () => {
    try {
      const response = await dispatch(getSubCategories(categoryId)).unwrap();
      // console.log("response", response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log("subCategories", subCategories);
  // console.log("categoryId", categoryId);

  return (
    <div className="d-flex justify-content-center">
      <Container fluid>
        <Row className="d-flex justify-center m-0 m-md-5 ">
          <Col xs={12} lg={6}>
            <div className={styles.container}>
              <div className={styles.main}>
                <h4 className="text-center mb-5">Create your AD Post</h4>
                {subCategories.data?.subcategory?.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(
                        `/createPost/addpostdetails/${subCategories.data?.categoryName}/${item._id}`
                      );
                    }}
                    className={` ${styles2.item} pointer d-flex justify-content-between align-items-center`}
                  >
                    <div className="d-flex align-items-center">
                      <BuildingIcon className="icon categoryIcon" />
                      <p className="m-0 mx-3">{item.subcategoryName}</p>
                    </div>
                    <RightArrow className="icon categoryIcon" />
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
