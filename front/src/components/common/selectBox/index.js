import React from "react";
import styles from "./SelectBox.module.css";
import Select from "react-select";

export default function SelectBox({
  options,
  placeholder,
  value,
  onChange,
  style,
}) {
  return (
    <>
      <Select
        options={options}
        value={value}
        onChange={onChange}
        isSearchable={false}
        menuPortalTarget={document.body}
        menuShouldBlockScroll={true}
        placeholder={placeholder}
        components={{
          IndicatorSeparator: false,
        }}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            width: "100%",
            backgroundColor: "transparent",
            outline: "none",
            border: "1px solid var(--secondary-text-color)",
            borderRadius: "8px",
            marginBlock: "16px",
            color: "var(--primary-text-color)",
            boxShadow: "none",
            "&:hover": {
              border: "1px solid var(--secondary-text-color)",
            },
          }),
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            color: "var(--primary-text-color)",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "var(--primary-text-color)",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "var(--secondary-background-color)",
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "var(--primary-background-color)",
            borderRadius: 8,
            padding: 0,
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            color: "var(--primary-text-color)",
            backgroundColor: state.isSelected
              ? "var(--secondary-background-color)"
              : "var(--primary-background-color)",
            "&:hover": {
              backgroundColor: "var(--secondary-background-color)",
            },
          }),
          ...style,
        }}
      />
    </>
  );
}
