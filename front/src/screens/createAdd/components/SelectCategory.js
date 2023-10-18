import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles2 from "./PostAdd.module.css";
import styles from "../../../screens/profile/Profile.module.css";
import { ReactComponent as BuildingIcon } from "../../../assets/icons/iconbuilding.svg";
import { ReactComponent as RightArrow } from "../../../assets/icons/rightArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllCategories } from "../../../redux/adds/thunk";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.ads);

  const fetchCategories = async () => {
    try {
      const response = await dispatch(getAllCategories()).unwrap();
      // console.log("response", response);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  console.log("categories", categories);

  return (
    <div className="d-flex justify-content-center">
      <Container fluid>
        <Row className="d-flex justify-center m-0 m-md-5 ">
          <Col xs={12} lg={7}>
            <div className={styles.container}>
              <div className={styles.main}>
                <h4 className="text-center mb-5">Create your AD Post</h4>
                {categories.data?.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      navigate(`/createPost/selectSubCategory/${item._id}`);
                    }}
                    className={`${styles2.item} pointer d-flex justify-content-between align-items-center`}
                  >
                    <div className="d-flex align-items-center">
                      <BuildingIcon className="icon categoryIcon" />
                      <p className="m-0 mx-3">{item.categoryName}</p>
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
