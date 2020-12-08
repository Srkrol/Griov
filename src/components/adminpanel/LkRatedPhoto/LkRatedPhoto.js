import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { rf } from "../../../constants/api";
import { SET_RATING_PHOTO_ADMINPANEL } from "../../../constants/store";
import "./LkRatedPhoto.css";
import { Image, Skeleton, Divider } from "antd";
import { TakePictures } from "./takepictures/takepictures";
import { TpInterval } from "./takePictureInterval/tpinterval"

const LkRatedPhoto = () => {

  const dispatch = useDispatch()
  const image = useSelector(state => state.device.photorating)

  const Fetch = () => {
    const localtoken = localStorage.getItem("token");

    const varBoxId = localStorage.getItem("boxid");

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .get(`${rf}?boxid=${varBoxId}`, headers)
      .then((response) => {
        dispatch({
          type: SET_RATING_PHOTO_ADMINPANEL,
          photorating: response.data
        })
      })
      .catch((e) => {
        dispatch({
          type: SET_RATING_PHOTO_ADMINPANEL,
          photorating: ""
        })
      });
  };

  useEffect(() => {
    Fetch();
  }, [true]);

  return (
    <div>
      <>
        <Divider orientation="left">Рейтинговое фото</Divider>
        <TakePictures />
        <TpInterval />
        <br />
        {image.length !== 0 ? (
          <Image
            width={350}
            height={"auto"}
            src={`data:image/jpeg;base64,${image}`}
          />
        ) : (
          <Skeleton.Image style={{ width: 350, height: 250 }} />
        )}
      </>
    </div>
  );
};

export default LkRatedPhoto;
