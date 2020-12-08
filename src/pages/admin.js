import React, { useEffect, useState } from "react";
import axios from "axios";
import { admindata } from "../constants/api";
import { useSelector } from "react-redux";
import { HeaderClimat } from "../components/climat/header";
import { Box } from "../components/climat/boxUser/box";

export const AdminINC = () => {
  const [isLoad, setIsLoad] = useState(false);
  const [box, setBox] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user !== null && isLoad === false) {
      const localtoken = localStorage.getItem("token");

      const headers = {
        headers: {
          Authorization: "Bearer " + localtoken,
          "Content-Type": "multipart/form-data",
        },
      };

      const form = new FormData();
      form.append("user", user.id);

      axios
        .post(`${admindata}`, form, headers)
        .then((res) => {
          setBox(res.data.box);
          setIsLoad(true);
        })
        .catch((e) => {
          setIsLoad(true);
        });
    }
  }, [user]);
  
  return (
    <>
      <HeaderClimat />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {box.map((val, index) => {
          return (
            <div
              style={{
                padding: 10,
              }}
            >
              {" "}
              <Box key={index} box={val} ind={"admin"} />{" "}
            </div>
          );
        })}
      </div>
    </>
  );
};
