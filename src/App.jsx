import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ErrorPage,
  LandingPage,
  TrackPage,
  PageLayout,
  DetailPage,
} from "./Pages";

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
      {
        path: "/track/:recordId",
        element: <DetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
