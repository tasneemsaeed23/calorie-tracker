import CalorieRecord from "./CalorieRecord";
import styles from "./RecordList.module.css";
import { useContext, useEffect, useState } from "react";
import AppContext from "./../../app-context";

function RecordList(props) {
  const { totalCalories } = useContext(AppContext);
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
      <label>Total Calories: {totalCalories}</label>
      <br></br>
    </>
  );
}

export default RecordList;
