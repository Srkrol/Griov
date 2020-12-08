import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { rf } from "../../constants/api";

export const Box = ({ box }) => {
  const [img, setImg] = useState("");

  const history = useHistory();

  useEffect(() => {
    const localtoken = localStorage.getItem("token");

    const varBoxId = box.box_id;

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .get(`${rf}?boxid=${varBoxId}`, headers)
      .then((response) => {
        setImg(response.data);
      })
      .catch((e) => {
        history.push("/_500");
      });
  }, [true]);
  return (
    <Link
      style={{
        width: 180,
        height: 220,
        border: "1px solid #8c8c8c",
        padding: 5,
        margin: 5,
        cursor: "pointer",
      }}
      to={"/userboxladder/0/" + box.box_id}
    >
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          padding: 5,
          lineHeight: 1,
          color: "black",
        }}
      >
        {box.box_name}
      </p>
      <img
        src={`data:image/jpeg;base64,${img}`}
        src={`data:image/jpeg;base64,${img}`}
        style={{
          width: "100%",
          padding: 5,
          border: "1px solid #d9d9d9",
        }}
      />
      <p
        style={{
          textAlign: "center",
          fontSize: 13,
          padding: 5,
          lineHeight: 1,
          marginTop: 5,
          color: "black",
        }}
      >
        {box.plant_name}
      </p>
    </Link>
  );
};
