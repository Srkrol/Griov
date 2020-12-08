/* This version is based on Image element of Ant Design. Works fine, but always have preview.

import { Image } from "antd";
import React, { Component } from "react";

export default class Topimage extends Component {
  render() {
    return <Image width={"100%"} src="./images/TopImage.png" />; //src is from public folder /site/public/images
  }
}
*/

import React, { Component } from "react";
import topImage from "./images/TopImage.png";

export default class TopImage extends Component {
  render() {
    return <img src={topImage} alt="banner" />;
  }
}
