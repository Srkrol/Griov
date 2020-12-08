import React from "react";
import { useSelector } from "react-redux";
import { Box } from "./box";
import { Info } from "./info";

export const BoxUSer = () => {
  const user = useSelector((state) => state.user.user);

  if (user === null) {
    return null;
  }
  return (
    <>
      <div
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
          display: "flex",
          flexWrap: 'wrap',
          background: "#52c41a",
          justifyContent: 'center'
        }}
      >
        {user.box.map((val, index) => {
          return <Box key={index} box={val} ind={index} />;
        })}
      </div>
      <Info />
    </>
  );
};
