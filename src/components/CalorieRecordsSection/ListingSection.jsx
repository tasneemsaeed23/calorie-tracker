import RecordList from "./RecordList";
import styles from "./ListingSection.module.css";
import { Fragment, useContext } from "react";
import { AppContext } from "./../../AppContext";

function ListingSection(props) {
  const { allRecords } = props;
  const { currentDate, currentDateStr, setCurrentDate } =
    useContext(AppContext);

  const dateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };

  const dateFilter = (record) => {
    return (
      record.date.getDate() === currentDate.getDate() &&
      record.date.getMonth() === currentDate.getMonth() &&
      record.date.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <Fragment>
      <label className={styles["listing-picker-label"]} htmlFor="listingDate">
        Select date
      </label>
      <input
        id="listingDate"
        className={styles["listing-picker-input"]}
        type="date"
        value={currentDateStr}
        onChange={dateChangeHandler}
      />
      <RecordList records={allRecords.filter(dateFilter)} />
    </Fragment>
  );
}

export default ListingSection;
