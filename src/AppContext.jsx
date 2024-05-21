import { createContext, useState } from "react";

export const AppContext = createContext({
  currentDate: new Date(),
  setCurrentDate: (val) => {},
  totalCalories: 0,
  setTotalCalories: (val) => {},
  currentDateStr: "",
  isValidDate: false,
});

function AppContextProvider({ children }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalCalories, setTotalCalories] = useState(0);

  const updateCurrentDate = (val) => {
    setCurrentDate(new Date(val));
  };

  const currentDateStr = currentDate.toISOString().split("T")[0];
  const isValidDate = !isNaN(currentDate.getTime());

  return (
    <AppContext.Provider
      value={{
        currentDate,
        setCurrentDate: updateCurrentDate,
        totalCalories,
        setTotalCalories,
        currentDateStr,
        isValidDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
