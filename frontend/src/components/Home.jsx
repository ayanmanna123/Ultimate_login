import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const naviget = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          naviget("/login");
        }}
      >
        login
      </Button>
    </div>
  );
};

export default Home;
