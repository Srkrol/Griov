import React, { useState } from "react";
import { Radio,  Checkbox } from "antd";
import { useDispatch } from 'react-redux'
import { CREATE_BOX_UPDATE_TYPE } from '../../constants/store'

export const RatioAllBox = ({ box, boxsindex, index }) => {
  const [state, setState] = useState(1);
  const dispatch =  useDispatch()

  const onChange = (e) => {
    setState(e.target.value);
    dispatch({
        type: CREATE_BOX_UPDATE_TYPE,
        boxs: boxsindex,
        box: index,
        typeval: Number(e.target.value) === 1? [0]: [1]
    })
  };

  const  onChangeChecked = (checkedValues) => {
    dispatch({
        type: CREATE_BOX_UPDATE_TYPE,
        boxs: boxsindex,
        box: index,
        typeval: checkedValues
    })
  }

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  const options = [
    { label: box.param1, value: 0 },
    { label: box.param2, value: 1 },
  ];

  if(Number(box.select_type) === 2 && !!box.param1 && !!box.param2) {
      return  <Checkbox.Group options={options} onChange={onChangeChecked} />
  }

  return (
    box.param1?
    <Radio.Group onChange={onChange} value={state}>
      <Radio style={radioStyle} value={1}>
        {box.param1}
      </Radio>
      {!!box.param2 ? (
        <Radio style={radioStyle} value={2}>
          {box.param2}
        </Radio>
      ) : null}
    </Radio.Group>
    : null
  );
};
