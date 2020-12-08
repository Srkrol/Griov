import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const ButtonChat = ({ index }) => {
  return (
    <Link to={`/chatladder/${index+1}`}>
      <Button>чат</Button>
    </Link>
  );
};

