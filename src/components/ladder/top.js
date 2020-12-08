import React from "react";
import { Link } from "react-router-dom";

export const Top = ({ top, id }) => {
  return (
    <ol style={{ margin: 0, padding: 0 }}>
      {top.map((val, index) => {
        return index < 3 ? (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Link to={"/userboxladder/" + id + "/" + val.box_id}>{val.username}</Link>
            <p>{val.box_name}</p>
            <p>{val.last_rang}</p>
          </li>
        ) : null;
      })}
    </ol>
  );
};
