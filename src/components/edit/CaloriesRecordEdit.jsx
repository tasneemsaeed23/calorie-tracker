import { useState, useEffect, useReducer, useContext } from "react";
import styles from "./CaloriesRecordEdit.module.css";
import { AppContext } from "./../../AppContext";

// Define the initial state for the form fields
const DEFAULT_VALUE = {
  date: { value: new Date().toISOString().split("T")[0], valid: true },
  meal: { value: "Breakfast", valid: true },
  content: { value: "", valid: false },
  calories: { value: 0, valid: true },
};

// Reducer function to handle form state changes
function formReducer(state, action) {
  const { type, key, value } = action;

  if (type === "RESET") {
    return DEFAULT_VALUE;
  }

  let valid;
  switch (key) {
    case "content":
      valid = value.trim().length > 0;
      return {
        ...state,
        content: { value, valid },
        calories: {
          ...state.calories,
          valid:
            (value === "sport" && state.calories.value < 0) ||
            (value !== "sport" && state.calories.value >= 0),
        },
      };
    case "calories":
      valid =
        (state.content.value === "sport" && value < 0) ||
        (state.content.value !== "sport" && value >= 0);
      return {
        ...state,
        calories: { value, valid },
      };
    case "date":
      valid = !isNaN(new Date(value).getTime());
      return {
        ...state,
        date: { value, valid },
      };
    case "meal":
      return {
        ...state,
        meal: { value, valid: true },
      };
    default:
      return state;
  }
}

function CaloriesRecordEdit(props) {
  const [isFormValid, setIsFormValid] = useState(false);
  const {
    currentDate,
    isValidDate,
    currentDateStr,
    setCurrentDate,
    totalCalories,
  } = useContext(AppContext);
  const [formState, dispatch] = useReducer(formReducer, DEFAULT_VALUE);
  const {
    content: { valid: isContentValid },
    calories: { valid: isCaloriesValid },
    date: { valid: isDateValid },
  } = formState;

  useEffect(() => {
    setIsFormValid(isContentValid && isDateValid && isCaloriesValid);
  }, [isContentValid, isDateValid, isCaloriesValid]);

  const onDateChangeHandler = (event) => {
    const newDate = event.target.value;
    setCurrentDate(newDate);
    dispatch({
      type: "UPDATE_FIELD",
      key: "date",
      value: newDate,
    });
  };

  const onMealChangeHandler = (event) => {
    dispatch({
      type: "UPDATE_FIELD",
      key: "meal",
      value: event.target.value,
    });
  };

  const onContentChangeHandler = (event) => {
    dispatch({
      type: "UPDATE_FIELD",
      key: "content",
      value: event.target.value,
    });
  };

  const onCalorieChangeHandler = (event) => {
    dispatch({
      type: "UPDATE_FIELD",
      key: "calories",
      value: Number(event.target.value),
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit({
      date: currentDate,
      ...Object.keys(formState).reduce((aggr, cur) => {
        aggr[cur] = formState[cur].value;
        return aggr;
      }, {}),
    });
    dispatch({ type: "RESET" });
  };

  const onCancelHandler = () => {
    dispatch({ type: "RESET" });
    props.onCancel();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <p className={styles.warning}>You spent {totalCalories} calories</p>
      <label htmlFor="date">Date: </label>
      <input
        type="date"
        id="date"
        value={currentDateStr}
        onChange={onDateChangeHandler}
        className={`${styles["form-input"]}${!isDateValid ? styles.error : ""}`}
      />
      <label htmlFor="meal">Meal: </label>
      <select
        className={styles["form-input"]}
        id="meal"
        value={formState.meal.value}
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
        value={formState.content.value}
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
        value={formState.calories.value}
        onChange={onCalorieChangeHandler}
        className={`${styles["form-input"]}${
          !isCaloriesValid ? styles.error : ""
        }`}
        min={-1000}
      />
      <div className={styles.footer}>
        <button disabled={!isFormValid}>Add Record</button>
        <button
          className={styles.secondary}
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
