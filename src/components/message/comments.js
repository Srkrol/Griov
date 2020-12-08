import React, { useState } from "react";
import { useSelector } from "react-redux";

import { UserComp } from "./user";
import { UserAdmin } from "./admin";

export const Comments = ({ userscomm }) => {
  const user = useSelector((state) => state.user.user);

  if (user === null) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        padding: 10,
        minHeight: 100,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1240px",
          padding: 10,
          minHeight: 100,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {" "}
        <UserAdmin userid={user.id} userscomm={userscomm} />
        {userscomm.map((val, index) => {
          return <UserComp key={index} val={val} />;
        })}
      </div>
    </div>
  );
};
