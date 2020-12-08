import React from "react";

export const Money = (props) => {
  return (
    <>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 0,
          marginTop: 10,
          width: "100%",
          fontSize: 17,
          height: 35,
        }}
      >
        <p>
          {" "}
          <img style={{ width: 30, height: 30 }} src="/3.jpg" alt="/3.jpg" />
          GrCoin
        </p>
        <p>{props.user.coins}</p>
      </p>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 0,
          width: "100%",
          fontSize: 17,
          height: 35,
        }}
      >
        <p>
          {" "}
          <img
            style={{ width: 30, height: 30 }}
            src="/111.png"
            alt="/111.png"
          />
          GrLeaf
        </p>
        <p>{props.user.leaves}</p>
      </p>
    </>
  );
};
