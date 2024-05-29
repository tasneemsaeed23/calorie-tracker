import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage, TrackPage } from "./Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/track",
    element: <TrackPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
