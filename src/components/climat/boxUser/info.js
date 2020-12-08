import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Card, Typography } from "antd";
import { boxrequest } from "../../../constants/api";
import { SET_USER_BOX_LOAD } from "../../../constants/store";
import { Link } from "react-router-dom";
const { Title } = Typography;

export const Info = () => {
  const user = useSelector((state) => state.user.user);
  const infobox = useSelector((state) => state.infobox.box);
  const [loadBoxinfo, seTloadBoxInfo] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const Fetch = () => {
    const localtoken = localStorage.getItem("token");
    const id = user.id;
    const headers = {
      headers: {
        Authorization: "Bearer " + localtoken,
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .get(`${boxrequest}?boxid=${id}`, headers)
      .then((data) => {
        const box = data.data.map((val) => {
          return {
            box_type: val.box_type,
            plant: val.plant,
          };
        });
        dispatch({
          type: SET_USER_BOX_LOAD,
          box: box,
        });
        seTloadBoxInfo(true);
      })
      .catch((e) => {
        history.push("/_500");
      });
  };

  useEffect(() => {
    if (user !== null) {
      Fetch();
    }
  }, [user]);

  return (
    <div
      style={{
        marginTop: 10,
        width: "100%",
        minHeight: 80,
        paddingTop: 30,
        background: "#e6f7ff",
        fontSize: "18px",
      }}
    >
      <h3
        style={{
          fontFamily: "'El Messiri', sans-serif",
          fontSize: "22px",
          textAlign: "center",
        }}
      >
        {infobox.length !== 0 && !!infobox !== false
          ? "Коробки на добавление"
          : "Коробок на добавление пока нет,  закажите себе новую!"}
      </h3>
      {infobox.length !== 0 && !!infobox !== false ? null : (
        <Link
          to="/order"
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <img src="/1.png" style={{ width: 100 }} />
        </Link>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "10px",
        }}
      >
        {user ? (
          <>
            {loadBoxinfo === false ? (
              <h1>Загрузка</h1>
            ) : infobox.length !== 0 ? (
              <>
                {infobox.map((val, index) => {
                  return (
                    <Card
                      key={index}
                      title={<Title level={4}>{val.plant}</Title>}
                      bordered={false}
                      style={{
                        width: 300,
                        background: "white",
                        marginLeft: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <pre
                        style={{
                          width: "100%",
                          height: 170,
                          fontFamily: "'El Messiri', sans-serif",
                        }}
                      >
                        {val.box_type}
                      </pre>
                    </Card>
                  );
                })}
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};
