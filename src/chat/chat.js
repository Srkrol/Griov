import React, { useState, useEffect } from "react";
import { Launcher } from "react-chat-window";
import openSocket from "socket.io-client";
import { host } from "../constants/api";
import { resort } from "./resort";
import { useLocation } from "react-router-dom";

import "./s.css";

const socket = openSocket(host);

const Chat = ({ socketid, userid, to }) => {
  const [messageList, setmessageList] = useState([]);
  const [lock, setLock] = useState(false);
  const to2 = !!to ? to : "";
  const location = useLocation();

  useEffect(() => {
    const sort = (a1, b1) => {
      let arr = [a1, b1];
      arr.sort();
      const result = arr[0] + arr[1];
      return result;
    };

    const resultid = sort(socketid, to2);

    socket.emit("message", {
      socketid,
      to: to2,
      status: "GET",
    });
    socket.on(resultid, (res) => {
      const url = location.pathname.slice(0, 5);
      const { result, idfrom, len } = resort(res, userid);
      setmessageList(result);
      setLock({
        idfrom: idfrom,
        len: len,
      });
    });
  }, [socketid]);

  if (lock !== false) {
    localStorage.setItem(lock.idfrom, lock.len);
  }
  const sendMessage = (mes) => {
    socket.emit("message", {
      mes,
      socketid,
      to: to2,
      status: "SET",
      userid: userid,
    });
  };

  const _onMessageWasSent = (message) => {
    console.log(message);
    if (message.type === "text") {
      const mes = { ...message };
      mes.data.text = mes.data.text;
      sendMessage(mes);
    } else {
      const mes = { ...message };
      mes.data.text = mes.data.emoji;
      sendMessage(mes);
    }
  };

  return (
    <div className="conteiner">
      <Launcher
        agentProfile={{
          teamName: "ава кому пишеш",
          imageUrl: "1.png",
        }}
        onMessageWasSent={_onMessageWasSent.bind(this)}
        messageList={messageList}
        showEmoji
        isOpen
      />
    </div>
  );
};

export default Chat;
