import RecordList from "./RecordList";
import styles from "./ListingSection.module.css";
import { useState, useEffect } from "react"; // Importing necessary hooks from React

function ListingSection(props) {
  // ListingSection component
  const { allRecords } = props; // Destructuring props
  const [currentDate, setCurrentDate] = useState(new Date());

  // Handler for date change
  const dateChangeHandler = (event) => {
    setCurrentDate(new Date(event.target.value));
  };

  // Function to filter records based on the current date
  const dateFilter = async (record) => {
    const recordDate = new Date(record.date);
    return (
      recordDate.getDate() === currentDate.getDate() &&
      recordDate.getMonth() === currentDate.getMonth() &&
      recordDate.getFullYear() === currentDate.getFullYear()
    );
  };

  // Removed the getUser function and related code (commented out)
  // const getUser = async () => {
  //   console.log("Making a new HTTP request");
  //   // ... (previous getUser code)
  // };

  // Effect hook to fetch user data when component mounts (commented out)
  // useEffect(() => {
  //   getUser();
  // }, []);

  // JSX rendering
  return (
    <>
      {/* Label for date picker */}
      <label className={styles["listing-picker-label"]} htmlFor="listingDate">
        Select date
      </label>
      {/* Date picker input */}
      <input
        id="listingDate"
        className={styles["listing-picker-input"]}
        type="date"
        value={currentDate.toISOString().split("T")[0]}
        onChange={dateChangeHandler}
      />
      {/* Render RecordList component passing filtered records */}
      <RecordList records={allRecords.filter(dateFilter)} />
      {/* Removed user data display (commented out) */}
      {/* <div>
        <p>{user.id}</p>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
      </div> */}
    </>
  );
}

export default ListingSection;
