import React from "react";
import { Icon, Badge, Anchor } from "antd";
import "./Tools.less";
const { Link } = Anchor;
const Tools = (props) => {
  const gotoAnchhor = () => {
    console.log(1111);
    let element = document.getElementById("components-comment");
    element && element.scrollIntoView({ block: "start", behavior: "smooth" });
  };
  return (
    <div className="tools">
      <Badge
        count={props.counts.thumbCount}
        style={{ backgroundColor: "#333" }}
      >
        <div className="tools-item">
          <Icon type="like" theme="filled" />
        </div>
      </Badge>
      <div className="tools-item">
        <Icon type="dislike" theme="filled" />
      </div>
      <div className="tools-item">
        <Icon type="star" theme="filled" />
      </div>
      <Badge
        count={props.counts.commentCount}
        style={{ backgroundColor: "#333" }}
      >
        <div className="tools-item">
          <Icon type="message" theme="filled" />
        </div>
      </Badge>
    </div>
  );
};

export default Tools;
