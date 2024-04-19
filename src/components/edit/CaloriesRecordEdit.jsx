import { useState } from "react";
import styles from "./CaloriesRecordEdit.module.css";

function CaloriesRecordEdit(props) {
  let DEFAULT_VALUE = { date: "", meal: "", content: "", calories: "" };

  const [mealRecord, setMealRecord] = useState(DEFAULT_VALUE);

  const onDateChangeHandler = (event) => {
    setMealRecord({
      ...mealRecord,
      date: event.target.value,
    });
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
  };

  const onCalorieChangeHandler = (event) => {
    setMealRecord({
      ...mealRecord,
      calories: event.target.value,
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit(mealRecord);
    setMealRecord(DEFAULT_VALUE);
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <label htmlFor="date">Date: </label>
      <input
        type="date"
        name="date"
        id="date"
        value={mealRecord.date}
        onChange={onDateChangeHandler}
      />
      <label htmlFor="meal">Meal: </label>
      <select
        name="meal"
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
      />
      <label htmlFor="calories">Calories: </label>
      <input
        type="number"
        name="calories"
        id="calories"
        value={mealRecord.calories}
        onChange={onCalorieChangeHandler}
        className={`${styles["calories-input"]} ${styles.error}`}
      />
      <div className={styles.footer}>
        <button>Add Record</button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
