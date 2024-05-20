import CalorieRecord from "./CalorieRecord";
import styles from "./RecordList.module.css";
import { useEffect, useState } from "react";

function RecordList(props) {
  const resultsElement = props.records?.length ? (
    <ul className={styles["record-list"]}>
      {props.records.map(
        (record) =>
          record.calories >= 0 && (
            <li className={styles["list-item"]} key={record.id}>
              <CalorieRecord
                date={record.date}
                meal={record.meal}
                content={record.content}
                calories={record.calories}
                addCalories={props.setTotalCalories}
              />
            </li>
          )
      )}
    </ul>
  ) : (
    <div className={styles.placeholder}>No records found for this date</div>
  );

  return (
    <>
      {resultsElement}
      <label>Total Calories: {props.totalCalories}</label>
      <br></br>
    </>
  );
}

export default RecordList;
