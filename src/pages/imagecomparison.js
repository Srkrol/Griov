import React, { useEffect, useState } from "react";
import { HeaderClimat } from "../components/climat/header";
import { useSelector } from "react-redux";
import { imagecomparison } from "../constants/api";
import axios from "axios";

import { BoxImg } from "../components/imagecomparison";

export const ImageComparison = () => {
  const user = useSelector((state) => state.user.user);

  const [isLoad, setIsLoad] = useState(false);
  const [box, setBox] = useState([]);

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
        .post(`${imagecomparison}`, form, headers)
        .then((res) => {
          setBox(res.data);
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
      <BoxImg box={box} />
    </>
  );
};
