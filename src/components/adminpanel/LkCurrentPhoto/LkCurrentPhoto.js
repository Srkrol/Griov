import React, { useEffect } from "react";
import { Image } from "antd";
import { cf } from "../../../constants/api";
import { SET_CURENT_PHOTO_ADMINPANEL } from "../../../constants/store";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const LkCurrentPhoto = ({ cam }) => {
  const histoty = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const photo = useSelector((state) => state.device.photo);
  useEffect(() => {
    if (!!cam.device[0]) {
      const localtoken = localStorage.getItem("token");

      const headers = {
        headers: {
          Authorization: "Bearer " + localtoken,
          "Content-Type": "multipart/form-data",
        },
      };

      const form = new FormData();
      form.append("boxid", localStorage.getItem("boxid"));

      axios
        .post(`${cf}`, form, headers)
        .then((res) => {
          dispatch({
            type: SET_CURENT_PHOTO_ADMINPANEL,
            photo: res.data,
          });
        })
        .catch((e) => {
          histoty.push("/_500");
        });
    }
  }, [cam]);

  return (
    <>
      <div>
        <Image
          width={200}
          height={"auto"}
          src={ photo !== '' ? `data:image/jpeg;base64,${photo}` : '/default.png'}
        />
      </div>
    </>
  );
};

export default LkCurrentPhoto;

/**
 * socet.on("image", (img) => {
      if(this.state.img !== img) {
        this.setState({
          data: img,
        });
      }
    });
    socet.emit("image", this.state.boxid);
 */
