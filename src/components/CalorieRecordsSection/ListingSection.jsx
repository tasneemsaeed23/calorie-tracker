import RecordList from "./RecordList";
import styles from "./ListingSection.module.css";
import { useState, useEffect } from "react";

function ListingSection(props) {
  const {
    allRecords,
    currentDate,
    setCurrentDate,
    totalCalories,
    setTotalCalories,
  } = props;

  const dateChangeHandler = (event) => {
    setCurrentDate(new Date(event.target.value));
  };

  const dateFilter = (record) => {
    return (
      record.date.getDate() === currentDate.getDate() &&
      record.date.getMonth() === currentDate.getMonth() &&
      record.date.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <div>
      <label className={styles["listing-picker-label"]} htmlFor="listingDate">
        Select date
      </label>
      <input
        id="listingDate"
        className={styles["listing-picker-input"]}
        type="date"
        value={currentDate.toISOString().split("T")[0]}
        onChange={dateChangeHandler}
      />
      <RecordList
        records={allRecords.filter(dateFilter)}
        setTotalCalories={setTotalCalories}
        totalCalories={totalCalories}
      />
    </div>
  );
}

export default ListingSection;
