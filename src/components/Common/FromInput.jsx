import { forwardRef } from "react";
import styles from "./FormInput.module.css";

const FormInput = forwardRef((props, ref) => {
  const { label, id, type, isValid, children, ...rest } = props;
  const inputElement =
    type === "select" ? (
      <select
        id={id}
        className={`${styles["form-input"]}${
          !isValid ? ` ${styles.error}` : ""
        }`}
        ref={ref}
        {...rest}
      >
        {children}
      </select>
    ) : (
      <input
        id={id}
        type={type}
        className={`${styles["form-input"]}${
          !isValid ? ` ${styles.error}` : ""
        }`}
        min={type === "number" ? -1000 : undefined}
        ref={ref}
        {...rest}
      />
    );
  return (
    <>
      <label htmlFor={id}>{label}: </label>
      {inputElement}
    </>
  );
});

export default FormInput;
