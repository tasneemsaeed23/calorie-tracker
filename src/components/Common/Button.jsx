import styles from "./Button.module.css";
import { memo } from "react";
function Button(props) {
  // eslint-disable-next-line react/prop-types, no-unused-vars
  const { variant, children, ...rest } = props;
  return (
    <button {...rest} className={styles[variant]}>
      {children}
    </button>
  );
}

export default memo(Button);
