import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const REDIRECT_COUNT = 10;
const COUNT_DOWN_INTERVAL = 500;
const HOME_LINK = "/";
export function ErrorPage() {
  const [counter, setCounter] = useState(REDIRECT_COUNT);
  const intervalHandler = useRef();
  const navigateHome = useNavigate();

  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalHandler.current);
      navigateHome(HOME_LINK);
    }
  }, [counter]);

  useEffect(() => {
    intervalHandler.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, COUNT_DOWN_INTERVAL);

    return () => {
      clearInterval(intervalHandler.current);
    };
  }, []);

  return (
    <>
      <h1>Something Went Wrong...</h1>
      <p>Redirecting to Home Page in {counter}</p>
      <p>
        OR Click <Link to={HOME_LINK}>Home Page</Link> to go back
      </p>
    </>
  );
}
