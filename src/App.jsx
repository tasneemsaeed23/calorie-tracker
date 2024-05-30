import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage, LandingPage, TrackPage, PageLayout } from "./Pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/track",
        element: <TrackPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
