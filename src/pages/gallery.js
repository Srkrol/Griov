import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import { galleryget } from "../constants/api";

import { HeaderClimat } from "../components/climat/header";
import { ImageG } from "../components/gellery/image";
import { VideoG } from "../components/gellery/video";

export const Gallery = () => {
  const user = useSelector((state) => state.user.user);

  const [isLoading, setIsLoading] = useState(null);
  const [count, setCount] = useState(false);

  const [status, setStatus] = useState(true);

  const [img, setImg] = useState([]);

  const Fetch = () => {
    const localtoken = localStorage.getItem("token");

    const form = new FormData();
    form.append("id", user.id);

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(`${galleryget}`, form, headers)
      .then((res) => {
        setImg(res.data.arr);
        setCount(1);
        setIsLoading(true);
        if (
          res.data.arr.length < 8 ||
          Number(res.data.arr[res.data.arr.length - 1].num) === 1
        ) {
          setStatus(false);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (user !== null && isLoading === null) {
      Fetch();
    }
  }, [user]);

  return (
    <>
      <HeaderClimat />

      <ImageG
        status={status}
        setStatus={setStatus}
        image={img}
        isLoading={isLoading}
        setImg={setImg}
        id={user !== null ? user.id : ""}
        count={count}
        setCount={setCount}
      />
      <VideoG />
    </>
  );
};
