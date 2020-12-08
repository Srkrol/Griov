import React from "react";
import { Typography, Card, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import "moment/locale/ru";

import { SelectBox } from "./select";
import { Register } from "./fetch";
import { Link } from "react-router-dom";
import { ButtonChat } from "./buttonchat";

const { Title, Text } = Typography;

export const NoActiveladder = () => {
  const { event } = useSelector((state) => state.ladder);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const date = moment().format();

  const FetchRegister = (id) => {
    Register(user, event[id], dispatch);
  };

  return (
    <div className="active_ladder_conteiner">
      <Title level={4}>Будущее соревнование</Title>
      <div className="site-card-border-less-wrapper" style={{ paddingTop: 10 }}>
        {event.map((val, index) => {
          return date < moment(val.comp.start).format() ? (
            <div className="wrapper" key={index}>
              <Card
                title={
                  <>
                    <Title
                      style={{ borderBottom: "1px solid #ececec" }}
                      level={5}
                    >
                      {val.comp.name}
                    </Title>
                  </>
                }
                style={{ maxWidth: 500, marginBottom: 10, width: "100%" }}
              >
                <div className="label11">
                  <Text>{val.comp.desc_all}</Text>
                  <div className="content">
                    <p style={{ wordWrap: "pre" }} className="prize">
                      {val.comp.prize}
                    </p>
                    <div className="ladder"></div>
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <p>{moment(val.comp.start).format("MMMM Do, YYYY")}</p>
                    <p>по {moment(val.comp.finish).format("MMMM Do, YYYY")}</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      maxWidth: "200px",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                    }}
                  >
                    <ButtonChat index={index}/>
                    <Button>
                      <Link to={"/topladder/" + val.comp.id}>Участники</Link>
                    </Button>
                    <SelectBox
                      user={user.user}
                      boxselect={val.boxselect}
                      index={index}
                    />
                    <Button
                      disabled={
                        user.user !== null
                          ? user.user.box.length !== 0
                            ? false
                            : true
                          : true
                      }
                      onClick={() => FetchRegister(index)}
                    >
                      Регистрация
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};
