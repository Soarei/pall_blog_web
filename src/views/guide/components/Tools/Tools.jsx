import React from "react";
import { Icon } from "antd";
import "./Tools.less";
const Tools = () => {
  return (
    <div className="tools">
      <div className="tools-item">
        <Icon type="like" theme="filled" />
      </div>
      <div className="tools-item">
        <Icon type="dislike" theme="filled" />
      </div>
      <div className="tools-item">
        <Icon type="star" theme="filled" />
      </div>
    </div>
  );
};

export default Tools;
