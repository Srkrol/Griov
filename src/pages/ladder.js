import React, { useEffect } from "react";
import { HeaderClimat } from "../components/climat/header";
import { ActiveLadder } from "../components/ladder/activeladder";
import { NoActiveladder } from "../components/ladder/noactiveladder";
import axios from "axios";
import { getladder } from "../constants/api";
import { SET_LADDER_COMP } from "../constants/store";
import { useDispatch, useSelector } from "react-redux";

export const Ladder = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user !== null) {
      const localtoken = localStorage.getItem("token");

      const headers = {
        headers: {
          Authorization: "Bearer " + localtoken,
          "Content-Type": "multipart/form-data",
        },
      };
      axios
        .get(`${getladder}`, headers)
        .then((res) => {
          dispatch({
            type: SET_LADDER_COMP,
            event: res.data.data,
            select: !!user.box[0] !== false ? user.box[0] : "",
          });
        })
        .catch((e) => {});
    }
  }, [user]);

  return (
    <>
      <HeaderClimat />
      <ActiveLadder />
      <NoActiveladder />
    </>
  );
};
