import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ReactComponent as RightArrow } from "../assets/icons/rightArrow.svg";

function Category() {
  const [activeAccordionKey, setActiveAccordionKey] = useState("0");

  const handleAccordionChange = (eventKey) => {
    setActiveAccordionKey(eventKey === activeAccordionKey ? null : eventKey);
  };

  return (
    <Accordion
      activeKey={activeAccordionKey}
      onSelect={handleAccordionChange}
      className="categoryAccordion"
    >
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          {activeAccordionKey === "0" ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
          Category{" "}
        </Accordion.Header>
        <Accordion.Body>
          <ul className="ct-list">
            {Array.from({ length: 7 }).map((_, i) => (
              <li key={i}>
                <Link className="primaryTextColor" to="">
                  Bike
                  <RightArrow className="icon categoryIcon" />
                </Link>
              </li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="categoryAccordion">
        <Accordion.Header>
          {activeAccordionKey === "1" ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
          Condition{" "}
        </Accordion.Header>
        <Accordion.Body>
          <ul className="ct-list">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i}>
                <Link className="primaryTextColor" to="">
                  Brand New
                  <RightArrow className="icon categoryIcon" />
                </Link>
              </li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="2" className="categoryAccordion">
        <Accordion.Header>
          {activeAccordionKey === "2" ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
          Price{" "}
        </Accordion.Header>
        <Accordion.Body>
          <ul className="ct-list">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i}>
                <Link className="primaryTextColor" to="">
                  Like New
                  <RightArrow className="icon categoryIcon" />
                </Link>
              </li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>

      <Accordion.Item eventKey="3" className="categoryAccordion">
        <Accordion.Header>
          {activeAccordionKey === "3" ? (
            <FontAwesomeIcon icon={faMinus} />
          ) : (
            <FontAwesomeIcon icon={faPlus} />
          )}
          Location{" "}
        </Accordion.Header>
        <Accordion.Body>
          <ul className="ct-list">
            {Array.from({ length: 4 }).map((_, i) => (
              <li key={i}>
                <Link className="primaryTextColor" to="">
                  Any
                  <RightArrow className="icon categoryIcon" />
                </Link>
              </li>
            ))}
          </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default Category;
