import React, { useEffect } from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { SET_LADDER_BOXACTIVE } from "../../constants/store";

const { Option } = Select;

export const SelectBox = ({ user, boxselect, index }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if(!!boxselect === false && user !== null && user.box.length !== 0) {
      dispatch({
        type: SET_LADDER_BOXACTIVE,
        box: user.box[0].box_id,
        index: index,
      });
    }
  },[boxselect])

  if (user === null || user.box.length === 0) {
    return null;
  }
  const box = user.box.map((val) => {
    return val.box_id;
  });

  
  const handleChange = (value) => {

    dispatch({
      type: SET_LADDER_BOXACTIVE,
      box: value,
      index: index,
    });
  };

  return (
    <Select
      defaultValue={user.box[0].box_id}
      style={{ width: 80 }}
      onChange={handleChange}
    >
      {box.map((val, index) => {
        return (
          <Option key={index} value={val}>
            {val}
          </Option>
        );
      })}
    </Select>
  );
};
