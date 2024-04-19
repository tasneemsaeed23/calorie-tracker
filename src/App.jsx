import RecordList from "./components/CalorieRecordsSection/RecordList";
import CallriesRecordEdit from "./components/edit/CaloriesRecordEdit";
import { useState } from "react";

const INITIANL_RECORDS = [
  {
    id: 1,
    date: new Date(2023, 2, 1),
    meal: "Breakfast",
    content: "Eggs",
    calories: -200,
  },
  {
    id: 2,
    date: new Date(2023, 2, 2),
    meal: "Lunch",
    content: "Chicken",
    calories: 600,
  },
  {
    id: 3,
    date: new Date(2023, 2, 3),
    meal: "Dinner",
    content: "Cheese",
    calories: 200,
  },
  {
    id: 4,
    date: new Date(2023, 2, 4),
    meal: "Snacks",
    content: "Chocolate",
    calories: 500,
  },
];

function App() {
  const [records, setRecords] = useState(INITIANL_RECORDS);
  const [nextId, setNextId] = useState(5);
  const formSubmitHandler = (record) => {
    const formattedRecord = {
      ...record,
      date: new Date(record.date),
      id: nextId,
    };
    setNextId((lastVal) => lastVal + 1);
    setRecords((prevRecords) => [formattedRecord, ...prevRecords]);
  };

  return (
    <>
      <h1>Welcome to calorie</h1>
      <CallriesRecordEdit onFormSubmit={formSubmitHandler} />
      <RecordList records={records} />
    </>
  );
}

export default App;
