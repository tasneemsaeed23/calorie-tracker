import CaloriesRecordEdit from "./components/edit/CaloriesRecordEdit";
import { useState } from "react";
import ListingSection from "./components/CalorieRecordsSection/ListingSection";
import Modal from "react-modal";
import styles from "./App.module.css";
import { useEffect } from "react";
import AppContextProvider from "./AppContext";
const LOCAL_STORAGE_KEY = "calorieRecord";

function App() {
  const [records, setRecords] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }

  function loadRecords() {
    const storageRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageRecords != null && storageRecords !== "undefined") {
      setRecords(
        JSON.parse(storageRecords).map((record) => ({
          ...record,
          date: new Date(record.date),
          calories: Number(record.calories),
        }))
      );
    } else {
      setRecords([]);
    }
  }

  useEffect(() => {
    if (!records) {
      loadRecords();
    } else {
      save();
    }
  }, [records]);

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
      id: crypto.randomUUID(), //unique random id
    };
    setRecords((prevRecords) => [formattedRecord, ...prevRecords]);
    handleCloseModal();
  };

  return (
    <div className="App">
      <h1 className={styles.title}>Calorie Tracker</h1>
      <AppContextProvider>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          contentLabel="Modal"
          style={modalStyles}
        >
          <CaloriesRecordEdit
            onFormSubmit={formSubmitHandler}
            onCancel={handleCloseModal}
          />
        </Modal>
        {records && <ListingSection allRecords={records} />}
      </AppContextProvider>
      <button className={styles["open-modal-btn"]} onClick={handleOpenModal}>
        Track Food
      </button>
    </div>
  );
}

export default App;
