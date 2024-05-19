import RecordList from "./RecordList";
import styles from "./ListingSection.module.css";
import { useState, useEffect } from "react";

function ListingSection(props) {
  const { allRecords, currentDate, setCurrentDate } = props; // Destructuring props

  const dateChangeHandler = (event) => {
    setCurrentDate(new Date(event.target.value));
  };

  const dateFilter = (record) => {
    // Fixing the condition and adding return statement
    return (
      record.date.getDate() === currentDate.getDate() &&
      record.date.getMonth() === currentDate.getMonth() &&
      record.date.getFullYear() === currentDate.getFullYear()
    );
  };

  // Returning a single element enclosing the components
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
      {/* Render the RecordList component */}
      <RecordList records={allRecords.filter(dateFilter)} />
    </div>
  );
}

export default ListingSection;
