import { useState, useEffect, useReducer } from "react";
import styles from "./CaloriesRecordEdit.module.css";

// Define the initial state for the form fields
const DEFAULT_VALUE = {
  date: { value: "", valid: false },
  meal: { value: "Breakfast", valid: true },
  content: { value: "", valid: false },
  calories: { value: 0, valid: true },
};

// Reducer function to handle form state changes
function formReducer(state, action) {
  const { type, key, value } = action;

  // Reset form state to default values
  if (type === "RESET") {
    return DEFAULT_VALUE;
  }

  // Determine the validity of the input value based on the key
  let valid;
  switch (key) {
    case "content":
      // If content is "sport", calories must be negative; otherwise, calories must be non-negative
      valid =
        (value === "sport" && state.calories.value < 0) ||
        (value !== "sport" && state.calories.value >= 0);
      return {
        ...state,
        content: { value, valid: !!value }, // Update content value and validity
        calories: { ...state.calories, valid }, // Update calories validity based on content
      };
    case "calories":
      // If content is "sport", calories must be negative; otherwise, calories must be non-negative
      valid =
        (state.content.value === "sport" && value < 0) ||
        (state.content.value !== "sport" && value >= 0);
      return {
        ...state,
        calories: { value, valid }, // Update calories value and validity
      };
    default:
      return {
        ...state,
        [key]: { value, valid: !!value }, // Update other fields' values and validity
      };
  }
}

// Component for editing calorie records
function CaloriesRecordEdit(props) {
  // State to manage form validity
  const [isFormValid, setIsFormValid] = useState(false);
  // State to manage form state using reducer
  const [formState, disPatchFn] = useReducer(formReducer, DEFAULT_VALUE);
  const {
    date: { valid: isDateValid },
    content: { valid: isContentValid },
    calories: { valid: isCaloriesValid },
  } = formState;

  // Effect to update form validity when form state changes
  useEffect(() => {
    setIsFormValid(isContentValid && isDateValid && isCaloriesValid);
  }, [isContentValid, isDateValid, isCaloriesValid]);

  // Event handler for date input change
  const onDateChangeHandler = (event) => {
    disPatchFn({
      type: "UPDATE_FIELD",
      key: "date",
      value: event.target.value,
    });
  };

  // Event handler for meal select change
  const onMealChangeHandler = (event) => {
    disPatchFn({
      type: "UPDATE_FIELD",
      key: "meal",
      value: event.target.value,
    });
  };

  // Event handler for content input change
  const onContentChangeHandler = (event) => {
    disPatchFn({
      type: "UPDATE_FIELD",
      key: "content",
      value: event.target.value,
    });
  };

  // Event handler for calories input change
  const onCalorieChangeHandler = (event) => {
    disPatchFn({
      type: "UPDATE_FIELD",
      key: "calories",
      value: event.target.value,
    });
  };

  // Event handler for form submission
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Submit form data
    props.onFormSubmit(
      Object.keys(formState).reduce((aggr, cur) => {
        aggr[cur] = formState[cur].value;
        return aggr;
      }, {})
    );
    // Reset form state
    disPatchFn({ type: "RESET" });
  };

  // Event handler for cancel action
  const onCancelHandler = () => {
    // Reset form state
    disPatchFn({ type: "RESET" });
    // Trigger cancel action
    props.onCancel();
  };

  // Render the form
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <label htmlFor="date">Date: </label>
      <input
        type="date"
        id="date"
        value={formState.date.value}
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
        min={-1000} // Allow negative calorie values
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
