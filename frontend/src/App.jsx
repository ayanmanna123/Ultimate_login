import { useState } from "react";

import "./App.css";
import CreateAccount from "./auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import VerifyEmail from "./components/VerifyEmail";

function App() {
  const approute = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <CreateAccount />,
    },
    {
      path: "/user/varify",
      element: <VerifyEmail />,
    },
  ]);

  return (
    <>
      <RouterProvider router={approute} />
    </>
  );
}

export default App;
