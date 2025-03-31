import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Detail from "./pages/Detail/Detail.jsx";

/* useQuery: hook to handle data fetching and error handling with queries */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import Bootstrap JS in React
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ListSearch from "./pages/ListSearch/ListSearch.jsx";
import Home from "./pages/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <ListSearch media_type={"movie"} />,
      },
      {
        path: "/movies/:name/:id",
        element: <Detail media_type="movie"/>
      },
      {
        path: "/tv-series",
        element: <ListSearch media_type={"tv"} />,
      },
      {
        path: "/tv-series/:name/:id",
        element: <Detail media_type="tv"/>
      },
    ],
  },
  {
    path: "/movies",
    element: <App />,
  },
  {
    path: "/tv-series",
    element: <App />,
  },
]);

const queryClient = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider> {/* Routing */}
    </QueryClientProvider>
  </React.StrictMode>
);
