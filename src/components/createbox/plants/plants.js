import React, { useEffect } from "react";
import axios from "axios";
import { choisehwplantget } from "../../../constants/api";
import { CREATE_BOX_ADD_PLANTS, CREATE_BOX_UPDATE_PLANTS } from "../../../constants/store";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Box } from './box'

export const Plants = () => {
  const dispatch = useDispatch()
  const plants = useSelector((state) => state.createbox.plants);
  const active = useSelector((state) => state.createbox.activeplant);
  const history = useHistory();

  const setActive = (index) => {
    dispatch({
      type: CREATE_BOX_UPDATE_PLANTS,
      plants: plants[index],
      index: index
    })
  }

  const Fetch = () => {
    const localtoken = localStorage.getItem("token");

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .get(`${choisehwplantget}`, headers)
      .then((res) => {
        dispatch({
          type: CREATE_BOX_ADD_PLANTS,
          plants: res.data
        })
      })
      .catch((e) => {
        history.push("/_404");
      });
  };

  useEffect(() => {
      Fetch()
  }, [true])

  return (
    <div className="create-box-conteiner-box">
      <h2 className="header">Растения</h2>
      <div className="content">
        {
          plants.map((val, index) => {
            return (
              <Box
                key={index}
                box={val}
                index={index}
                active={active}
                setActive={setActive}
              />
            );
          })
        }
      </div>
    </div>
  );
};
