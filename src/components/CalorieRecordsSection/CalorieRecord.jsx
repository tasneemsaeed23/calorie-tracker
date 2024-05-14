import styles from "./CalorieRecord.module.css";
import CalorieRecordDate from "./CalorieRecordDate";
import StyleRecordCell from "../Common/StyledRecoredCell";
import { useEffect } from "react";

function CalorieRecord(props) {
  useEffect(() => {
    props.addCalories((prevTotal) => prevTotal + props.calories);
    // Return a cleanup function to remove the current calories when this component unmounts or when props.calories changes
    return () => {
      props.addCalories((prevTotal) => prevTotal - props.calories);
    };
  }, []);

  if (props.calories < 0) {
    return null;
  }

  return (
    <ul className={styles.record}>
      <li>
        <CalorieRecordDate date={props.date} />
      </li>
      <li>{props.meal}</li>
      <li>{props.content}</li>
      <li className={styles["record-calories"]}>
        <StyleRecordCell>{props.calories}</StyleRecordCell>
      </li>
    </ul>
  );
}

export default CalorieRecord;
