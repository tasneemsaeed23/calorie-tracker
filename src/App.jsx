import CallriesRecordEdit from "./components/edit/CaloriesRecordEdit";
import { useState } from "react";
import ListingSection from "./components/CalorieRecordsSection/ListingSection";
import Modal from "react-modal";
import styles from "./App.module.css";

const INITIAL_RECORDS = [
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
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [nextId, setNextId] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      padding: "0px",
      borderRadius: "10px",
    },
    overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formSubmitHandler = (record) => {
    const formattedRecord = {
      ...record,
      date: new Date(record.date),
      id: nextId,
    };
    setNextId((lastVal) => lastVal + 1);
    setRecords((prevRecords) => [formattedRecord, ...prevRecords]);
    handleCloseModal();
  };

  return (
    <div className="App">
      <h1 className={styles.title}>Calorie Tracker</h1>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}
      >
        <CallriesRecordEdit
          onFormSubmit={formSubmitHandler}
          onCancel={handleCloseModal}
        />
      </Modal>
      <ListingSection allRecords={records} />
      <button className={styles["open-modal-btn"]} onClick={handleOpenModal}>
        Track Food
      </button>
    </div>
  );
}

export default App;
