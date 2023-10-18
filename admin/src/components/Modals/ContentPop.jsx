import React from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import CKEditor from "react-ckeditor-component";

const ContentPop = ({ value, updateValue, onSubmit }) => {
  const onChange = (evt) => {
    const newContent = evt.editor.getData();
    updateValue({
      ...value,
      description: newContent,
    });
  };

  const handleAddSegment = () => {
    updateValue({
      ...value,
      status: false,
    });
  };

  console.log("====================");

  return (
    <>
      <Modal
        className="AddSegmentPop"
        show={value.status}
        onHide={handleAddSegment}
        centered
      >
        <Modal.Body className="col col-12">
          <div className="modalHeader d-flex align-items-center justify-content-between pb-2 ">
            <h2 className="m-0 text-white">{value.heading}</h2>
            <Button
              onClick={handleAddSegment}
              className=" border-0 closeBtn"
              variant="transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
              >
                <path
                  d="M16.279 20L13.712 16.005L11.383 20H8.697L12.437 14.016L8.646 8.134H11.383L13.95 12.112L16.262 8.134H18.948L15.225 14.101L19.016 20H16.279Z"
                  fill="white"
                />
                <circle cx="14" cy="14" r="13.5" stroke="white" />
              </svg>
            </Button>
          </div>
          <div className="ModalBody py-3">
            <Form>
              <Row>
                <Col lg="12" className="my-2">
                  {/* <label htmlFor="" className="form-label text-white">
                    Description
                  </label>
                  <textarea
                    id=""
                    rows="4"
                    className="form-control border-white text-white bg-transparent rounded"
                    name="answer"
                    value={value.description}
                    onChange={(e) => {
                      updateValue({
                        ...value,
                        description: e.target.value,
                      });
                    }}
                  ></textarea> */}
                  <CKEditor
                    activeClass="p10"
                    content={value.description}
                    events={{
                      change: onChange,
                    }}
                  />
                </Col>
                <Col lg="12" className="my-2">
                  <Button
                    onClick={onSubmit}
                    className="d-flex align-items-center justify-content-center w-100 common-btn rounded"
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ContentPop;
