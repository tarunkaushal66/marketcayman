import React, { forwardRef, useEffect, useState, Fragment } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { ErrorBoundary } from "react-error-boundary";

function ModalBody({ data, toggle, onConfirm }) {
  return (
    <Modal.Body className="px-lg-5">
      <Fragment>
        <div className="inner px-lg-5 py-4">
          <div className="py-2 top">
            <h4 className="fw-bold m-0">{data?.title}</h4>
            <p className="py-2">{data?.message}</p>
          </div>
          <div className="py-2">
            <Form>
              <div className="py-2">
                <div className="btnWrp d-flex align-items-center justify-content-end gap-10">
                  <Button
                    onClick={onConfirm}
                    className="common-btn d-flex align-items-center justify-content-center"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={toggle}
                    className="common-btn common-btn2 d-flex align-items-center justify-content-center"
                  >
                    No
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>{" "}
      </Fragment>
    </Modal.Body>
  );
}

const ConfirmModal = (props, ref) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prev) => !prev);

  useEffect(() => {
    if (ref && "current" in ref) {
      ref.current = {
        toggle,
        show: () => setShow(true),
        hide: () => setShow(false),
      };
    }
  }, []);

  return (
    <>
      <Modal
        className="AuthPops"
        show={show}
        onHide={toggle}
        centered
        backdrop="static"
        size="sm"
      >
        <ErrorBoundary
          fallback={<></>}
          onError={() => {
            setShow(false);
          }}
        >
          {show && <ModalBody {...props} toggle={toggle} />}
        </ErrorBoundary>
      </Modal>
    </>
  );
};

const MyConfirmModal = forwardRef(ConfirmModal);

MyConfirmModal.defaultProps = {
  data: {
    title: "Are you sure?",
    message: "This may cause harm to you.",
  },
  onConfirm: () => null,
};

export default MyConfirmModal;
