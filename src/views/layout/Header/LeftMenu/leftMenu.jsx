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
        专栏
      </Menu.Item>
      <Menu.Item key="apps" className="modified-item">
        {/* <Icon type="appstore" /> */}
        朋友圈
      </Menu.Item>
      <Menu.Item key="news" className="modified-item">
        {/* <Icon type="appstore" /> */}
        资源
      </Menu.Item>
      <Menu.Item key="hot" className="modified-item">
        {/* <Icon type="appstore" /> */}
        热搜
      </Menu.Item>
      <Menu.Item key="hots" className="modified-item">
        {/* <Icon type="appstore" /> */}
        更新日志
      </Menu.Item>
      <Menu.Item key="hotss" className="modified-item">
        {/* <Icon type="appstore" /> */}
        归档
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
