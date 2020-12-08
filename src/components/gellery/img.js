import React from "react";
import { Image } from "antd";


export const Img = (props) => {
  return (
    <>
      <Image width={300} style={{ padding: 5 }} src={props.val} />
    </>
  );
};
