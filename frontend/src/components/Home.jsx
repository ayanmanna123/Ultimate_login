import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const naviget = useNavigate();
  return (
    <div className=" absolute inset-0 bg-black flex justify-center items-center">
      <Button
        onClick={() => {
          naviget("/login");
        }}
        className={'bg-white text-black cursor-pointer hover:bg-gray-200'}
      >
        login
      </Button>
    </div>
  );
};

export default Home;
