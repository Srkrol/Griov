import React, { useState } from "react";
import { Button, message } from "antd";
import { Fetch } from "./fetch";
import { SET_RATING_PHOTO_ADMINPANEL } from '../../../../constants/store'
import { useDispatch } from 'react-redux'

export const TakePictures = () => {
  const [block, setBlock] = useState(false);
  const dispatch = useDispatch()

  const onClick = async () => {
    setBlock(true)
    const boxid = localStorage.getItem("boxid");
    const res = await Fetch(boxid);
    
    if (res === false) {
      message.error('рейтинговая фотография не создалась')
      setBlock(false)
    } else {
      dispatch({
        type: SET_RATING_PHOTO_ADMINPANEL,
        photorating: res
      })
      message.success('Рейтинговая фотография создана')
      setBlock(false)
    }
  };

  return (
    <>
      <Button
        disabled={block}
        loading={block}
        onClick={() => onClick()}
        style={{ width: "100%" }}
      >
        Сделать рейтинговую фотографию
      </Button>
    </>
  );
};
