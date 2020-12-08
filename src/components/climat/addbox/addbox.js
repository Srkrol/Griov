import React, { useEffect, useState } from "react";
import "./addbox.less";
import { Box } from "../allbox";
import axios from "axios";
import { choisehw } from "../../../constants/api";
import { ButtonAdd } from './buttonadd'
import { Random } from './random/random'
import { useHistory } from "react-router-dom";

export const AddBox = () => {
  const [state, setState] = useState([]);
  const [active, setActive] = useState(0);

  const history = useHistory();

  const Fetch = () => {
    const localtoken = localStorage.getItem("token");

    const type = "GrBox";

    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .get(`${choisehw}?type=${type}`, headers)
      .then((res) => {
        setState(res.data);
      })
      .catch(() => {
        history.push("/_500");
      });
  };

  useEffect(() => {
    Fetch();
  }, [true]);

  return (
    <>
      <h2
      className="site-card-border-less-wrapper-h2"
        style={{
          fontFamily: "'El Messiri', sans-serif",
          textAlign: "center",
        }}
      >
        выбор конфигурации
      </h2>
      <div className="site-card-border-less-wrapper-cont-1">
        {state.map((val, index) => {
          return (
            <Box
              key={index}
              box={val}
              index={index}
              active={active}
              setActive={setActive}
            />
          );
        })}
        < Random />
      </div>
      <ButtonAdd  box={state[active]}/>
    </>
  );
};
