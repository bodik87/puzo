import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import RecipesPage from "./pages/RecipesPage";
import CatalogPage from "./pages/CatalogPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "recipes", element: <RecipesPage /> },
      { path: "catalog", element: <CatalogPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
