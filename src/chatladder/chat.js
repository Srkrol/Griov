import React from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { CBack } from "../components/ui/back-2";
import ChatMessage from "../chat/chat";

export const Chat = () => {
  const { ladder } = useParams();
  const user = useSelector((state) => state.user.user);

  console.log(user);

  return (
    <>
      <CBack />
      <ChatMessage socketid={"ladder" + ladder} userid={user.id} />
    </>
  );
};
