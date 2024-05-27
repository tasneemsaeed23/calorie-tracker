import {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styles from "./CaloriesRecordEdit.module.css";
import { AppContext } from "./../../AppContext";
import FormInput from "../Common/FromInput"; // Ensure correct path
import Button from "./../Common/Button";
// Define the initial state for the form fields
const DEFAULT_VALUE = {
  date: { value: new Date().toISOString().split("T")[0], valid: true },
  meal: { value: "Breakfast", valid: true },
  content: { value: "", valid: false },
  calories: { value: 0, valid: true },
};

// Reducer function to handle form state changes
function formReducer(state, action) {
  const { key, value } = action;

  let valid;
  switch (key) {
    case "content":
      valid = value.trim().length > 0;
      return {
        ...state,
        content: { value, valid },
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
      valid = !!value;
      return {
        ...state,
        meal: { value, valid },
      };
    default:
      return state;
  }
}

function CaloriesRecordEdit(props) {
  const { currentDate, setCurrentDate, totalCalories } = useContext(AppContext);
  const [formState, dispatch] = useReducer(formReducer, DEFAULT_VALUE);

  const {
    content: { valid: isContentValid },
    calories: { valid: isCaloriesValid },
    date: { valid: isDateValid },
    meal: { valid: isMealValid },
  } = formState;

  const contentRef = useRef();
  const caloriesRef = useRef();
  const mealRef = useRef();

  const isFormValid = useMemo(() => {
    return isContentValid && isDateValid && isCaloriesValid;
  }, [isContentValid, isDateValid, isCaloriesValid]);

  useEffect(() => {
    if (!isContentValid) {
      contentRef.current.focus();
    }
  }, [isContentValid]);

  const onDateChangeHandler = (event) => {
    const newDate = event.target.value;
    setCurrentDate(newDate);
    dispatch({ key: "date", value: newDate });
  };

  const onMealBlurHandler = (event) => {
    dispatch({ key: "meal", value: event.target.value });
  };

  const onContentBlurHandler = (event) => {
    dispatch({ key: "content", value: event.target.value });
  };

  const onCalorieBlurHandler = (event) => {
    dispatch({ key: "calories", value: Number(event.target.value) });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormSubmit({
      date: formState.date.value,
      meal: formState.meal.value,
      content: formState.content.value,
      calories: formState.calories.value,
    });
  };

  const onCancelHandler = useCallback(() => {
    if (isFormValid) {
      props.onCancel();
    }
  }, [isFormValid]);

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <p className={styles.warning}>You spent {totalCalories} calories</p>

      <FormInput
        type="date"
        defaultValue={formState.date.value}
        id="date"
        onChange={onDateChangeHandler}
        isValid={isDateValid}
      />

      <FormInput
        type="select"
        label="Meal"
        id="meal"
        defaultValue={formState.meal.value}
        onBlur={onMealBlurHandler}
        isValid={isMealValid}
        ref={mealRef}
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </FormInput>
      <FormInput
        type="text"
        label="Content"
        id="content"
        onBlur={onContentBlurHandler}
        isValid={isContentValid}
        ref={contentRef}
      />
      <FormInput
        type="number"
        label="Calories"
        id="calories"
        onBlur={onCalorieBlurHandler}
        isValid={isCaloriesValid}
        ref={caloriesRef}
      />

      <div className={styles.footer}>
        <Button variant="primary" disabled={!isFormValid}>
          Add Record
        </Button>
        <Button variant="secondary" type="button" onClick={onCancelHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default CaloriesRecordEdit;
