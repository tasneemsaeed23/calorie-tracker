import { createContext, useState } from "react";

export const AppContext = createContext({
  currentDate: new Date(),
  setCurrentDate: (val) => {},
  totalCalories: 0,
  setTotalCalories: (val) => {},
});

function AppContextProvider(props) {
  const { children } = props;
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalCalories, setTotalCalories] = useState(0);

  return (
    <AppContext.Provider
      value={{ currentDate, setCurrentDate, totalCalories, setTotalCalories }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;
