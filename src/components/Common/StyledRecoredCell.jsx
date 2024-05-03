import styles from "./StyleRecordCell.module.css";
function StyleRecordCell(props) {
  return <div className={styles.StyleRecordCell}>{props.children}</div>;
}

export default StyleRecordCell;
