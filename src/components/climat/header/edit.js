import React from "react";
import Avatar from "react-avatar-edit";
import { message } from "antd";

const Edit = ({ setImg, setImgpost, setStatus }) => {
  const onClose = () => {
    setImg("");
  };

  const onCrop = (preview) => {
    setImg(preview);
    setImgpost(preview);
  };

  const onBeforeFileLoad = (elem) => {
    const size = elem.target.files[0].size;
    if (elem.target.files[0].size > 1500000) {
      elem.target.value = "";

      message.error(size + " размер картинки");
      setStatus(false);
    } else {
      setStatus(true);
    }
  };

  return (
    <div>
      <Avatar
        width={390}
        height={295}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={""}
      />
    </div>
  );
};
export default Edit;
/**

 */
