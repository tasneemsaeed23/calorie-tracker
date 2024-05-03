import styles from "./CaloriRecordDate.module.css";
import StyleRecordCell from "../Common/StyledRecoredCell";

function CalorieRecordDate(props) {
  const month = props.date.toLocaleString("default", { month: "long" });
  const day = props.date.getDate();
  const year = props.date.getFullYear();
  return (
    <StyleRecordCell>
      <div className={styles["record-date-month"]}>{month}</div>
      <div className={styles["record-date-day"]}>{day}</div>
      <div className={styles["record-date-year"]}>{year}</div>
    </StyleRecordCell>
  );
}

export default CalorieRecordDate;
