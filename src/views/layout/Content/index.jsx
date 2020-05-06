import React from "react";
import { Redirect, withRouter, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { Layout } from "antd";
import routeList from "@/config/routeMap";
import menuList from "@/config/menuConfig";
const { Content } = Layout;
const LayoutContent = (props) => {
  const { role, location } = props;
  const { pathname } = location;
  const handleFilter = (route) => {
    // 过滤没有权限的页面
    return !route.roles || route.roles.includes(role);
  };

  function getPageTitle(menuList, pathname) {
    let stack = [];
    let title = "Ant Design Pro";
    stack = stack.concat(menuList);

    while (stack.length) {
      let cur = stack.shift();
      if (cur.children && cur.children.length > 0) {
        stack = cur.children.concat(stack);
      }
      if (pathname === cur.path) {
        title = `${cur.title} - Ant Design Pro`;
      }
    }
    return title;
  }

  return (
    <DocumentTitle title={getPageTitle(menuList, pathname)}>
      <Content style={{ margin: "64px 16px 24px 16px" }}>
        <TransitionGroup>
          <CSSTransition
            classNames="fade"
            key={props.location.pathname}
            timeout={500}
          >
            <Switch>
              <Redirect exact from="/" to="/dashboard" />
              {routeList.map((route) => {
                return (
                  handleFilter(route) && (
                    <Route
                      component={route.component}
                      key={route.path}
                      path={route.path}
                    />
                  )
                );
              })}

              <Redirect to="/error/404" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Content>
    </DocumentTitle>
  );
};

export default connect((state) => state.user)(withRouter(LayoutContent));