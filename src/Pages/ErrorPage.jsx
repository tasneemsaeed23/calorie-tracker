import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <>
      <h1>Something Went Wrong...</h1>
      <p>
        Click <Link to="/">Home Page</Link> to go back
      </p>
    </>
  );
}
