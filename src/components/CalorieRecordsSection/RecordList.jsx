import CalorieRecord from "./CalorieRecord";
import styles from "./RecordList.module.css";

function RecordList(props) {
  return props.records?.length ? (
    <ul className={styles["record-list"]}>
      {props.records.map(
        (record) =>
          record.calories >= 0 && (
            <li className={styles["list-Item"]} key={record.id}>
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
}

export default RecordList;
