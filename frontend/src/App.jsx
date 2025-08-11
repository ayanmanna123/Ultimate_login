import { useState } from "react";

import "./App.css";
import CreateAccount from "./auth/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import VerifyEmail from "./components/VerifyEmail";
 import { GoogleOAuthProvider } from "@react-oauth/google";
function App() {
  const GoogleAuthWrapper =()=>{
  return (
    <GoogleOAuthProvider clientId="63882386085-a0qpr9is12bm1kjmfprsngcenbq09881.apps.googleusercontent.com">
      <CreateAccount></CreateAccount>
    </GoogleOAuthProvider>
  )
 }
  const approute = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <GoogleAuthWrapper />,
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
