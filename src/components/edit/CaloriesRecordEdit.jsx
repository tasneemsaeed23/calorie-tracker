import { useState, useEffect } from "react";
import styles from "./CaloriesRecordEdit.module.css";

function CaloriesRecordEdit(props) {
  let DEFAULT_VALUE = {
    date: "",
    meal: "Breakfast",
    content: "",
    calories: "",
  };

  const [mealRecord, setMealRecord] = useState(DEFAULT_VALUE);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [isContentValid, setIsContentValid] = useState(false);
  const [isCaloriesValid, setIsCaloriesValid] = useState(true);

  useEffect(() => {
    setIsFormValid(isContentValid && isDateValid && isCaloriesValid);
  }, [isContentValid, isDateValid, isCaloriesValid]);

  const onDateChangeHandler = (event) => {
    setMealRecord({
      ...mealRecord,
      date: event.target.value,
    });
    setIsDateValid(!!event.target.value);
  };

  const onMealChangeHandler = (event) => {
    setMealRecord({
      ...mealRecord,
      meal: event.target.value,
    });
  };

  const onContentChangeHandler = (event) => {
    setMealRecord({
      ...mealRecord,
      content: event.target.value,
    });
    setIsContentValid(!!event.target.value);
  };

  const onCalorieChangeHandler = (event) => {
    setMealRecord({
      ...mealRecord,
      calories: event.target.value,
    });
    setIsCaloriesValid(
      (event.target.value >= 0 && mealRecord.content !== "sport") ||
        (event.target.value < 0 && mealRecord.content === "sport")
    );
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit(mealRecord);
    setMealRecord(DEFAULT_VALUE);
  };

  const onCancelHandler = () => {
    setMealRecord(DEFAULT_VALUE);
    props.onCancel();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <label htmlFor="date">Date: </label>
      <input
        type="date"
        id="date"
        value={mealRecord.date}
        onChange={onDateChangeHandler}
        className={`${styles["form-input"]}${!isDateValid ? styles.error : ""}`}
      />
      <label htmlFor="meal">Meal: </label>
      <select
        className={styles["form-input"]}
        id="meal"
        value={mealRecord.meal}
        onChange={onMealChangeHandler}
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </select>
      <label htmlFor="content">Content: </label>
      <input
        type="text"
        name="content"
        id="content"
        value={mealRecord.content}
        onChange={onContentChangeHandler}
        className={`${styles["form-input"]}${
          !isContentValid ? styles.error : ""
        }`}
      />
      <label htmlFor="calories">Calories: </label>
      <input
        type="number"
        name="calories"
        id="calories"
        value={mealRecord.calories}
        onChange={onCalorieChangeHandler}
        className={`${styles["form-input"]} ${
          !isCaloriesValid ? styles.error : ""
        }`}
        min={0}
      />
      <div className={styles.footer}>
        <button disabled={!isFormValid}>Add Record</button>
        <button
          className={styles["secondary"]}
          type="button"
          onClick={onCancelHandler}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
