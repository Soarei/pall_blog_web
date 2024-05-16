import React from "react";
import { Menu } from "antd";
import "./leftMenu.less";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const LeftMenu = (props) => {
  const handleClick = (e) => {
    console.log(e);
    // this.setState({
    //   current: e.key,
    // });
  };
  return (
    <Menu onClick={handleClick} mode="horizontal">
      <Menu.Item key="mail" className="modified-item">
        {/* <Icon type="mail" /> */}
        <Link to="/doc"> 首页</Link>
      </Menu.Item>
      <Menu.Item key="app" className="modified-item">
        {/* <Icon type="appstore" /> */}
        前端开发
      </Menu.Item>
      <Menu.Item key="apps" className="modified-item">
        {/* <Icon type="appstore" /> */}
        后端开发
      </Menu.Item>
      <Menu.Item key="news" className="modified-item">
        {/* <Icon type="appstore" /> */}
        技术新闻
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
