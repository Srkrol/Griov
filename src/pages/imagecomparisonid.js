import React, { useEffect, useState } from "react";
import { HeaderClimat } from "../components/climat/header";
import { useSelector } from "react-redux";
import axios from "axios";
import { imagecomparisonid } from "../constants/api";

import { CBack } from "../components/ui/back-2";
import { BoxImgs } from "../components/imagecomparisonid";

import { Loader } from "../components/loader";

import { useParams } from "react-router-dom";
export const ImageComparisonID = () => {
  const { box } = useParams();

  const user = useSelector((state) => state.user.user);

  const [isLoad, setIsLoad] = useState(false);
  const [boximg, setBox] = useState([]);

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
      form.append("box", box);

      axios
        .post(`${imagecomparisonid}`, form, headers)
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
      {isLoad === false ? (
        <Loader />
      ) : (
        <>
          <CBack />
          <BoxImgs imgs={boximg} />
        </>
      )}
    </>
  );
};
