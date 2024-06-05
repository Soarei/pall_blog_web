import React from "react";
import { connect } from "react-redux";
import {
  Icon,
  Menu,
  Dropdown,
  Modal,
  Layout,
  Avatar,
  Input,
  Button,
} from "antd";
import { Link } from "react-router-dom";
import { logout, getUserInfo } from "@/store/actions";
import Settings from "@/components/Settings";
import LeftMenu from "./LeftMenu/leftMenu";
import "./index.less";
const { Header } = Layout;
const { Search } = Input;
const LayoutHeader = (props) => {
  const { token, avatar, logout, getUserInfo, showSettings } = props;
  token && getUserInfo(token);
  const handleLogout = (token) => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        logout(token);
      },
    });
  };
  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout(token);
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">首页</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">注销</Menu.Item>
    </Menu>
  );
  return (
    <>
      {/* 这里是仿照antd pro的做法,如果固定header，
      则header的定位变为fixed，此时需要一个定位为relative的header把原来的header位置撑起来 */}
      <Header>
        <div className="myheader">
          <div className="left-menu">
            <LeftMenu props="1"></LeftMenu>
          </div>
          <div className="right-menu">
            <Search
              placeholder="请输入搜索内容"
              onSearch={(value) => console.log(value)}
              style={{ width: 400, height: 40, marginRight: 20 }}
            />
            {/* {showSettings ? <Settings /> : null} */}
            <Button type="primary" className="createArticle">
              创作中心
            </Button>
            <div className="dropdown-wrap">
              <Dropdown overlay={menu}>
                <div>
                  <Avatar shape="square" size="medium" src={avatar} />
                  <Icon style={{ color: "rgba(0,0,0,.3)" }} type="caret-down" />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </Header>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings,
  };
};
export default connect(mapStateToProps, { logout, getUserInfo })(LayoutHeader);
