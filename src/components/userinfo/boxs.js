import React from "react";
import { Box } from "./box";

export const Boxs = ({ boxs }) => {
  return (
    <div
      style={{
        marginTop: 15,
        width: "100%",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <p
        style={{
          margin: 10,
          fontSize: 20,
        }}
      >
        Коробки пользователя
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {boxs.length === 0 ? (
          <p
            style={{
              margin: 10,
            }}
          >
            Нету активных коробок
          </p>
        ) : (
          boxs.map((val, index) => {
            return <Box key={index} box={val} />;
          })
        )}
      </div>
    </div>
  );
};
