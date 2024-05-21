import React, { useState, useEffect, useImperativeHandle } from "react";
import { Link, useHistory } from "react-router-dom";
import { getArticleList } from "@/api/article";
import { Row, Col, Tag, Icon } from "antd";
import "./ArticleList.less";
const ArticleList = (props) => {
  const history = useHistory();
  const [queryParams, setqueryParams] = useState({
    page: 1,
    size: 5,
    catgory_id: "",
  });
  queryParams.catgory_id = props.catgoryId;
  var [loadAll, setloadAll] = useState(false);
  var [list, setList] = useState([]);
  useEffect(() => {
    setqueryParams(queryParams);
    getArticleList(queryParams).then((res) => {
      setList(res.data.data.rows);
    });
    console.log(1111);
  }, [queryParams]);
  // 暴露方法
  useImperativeHandle(props.onRef, () => {
    return {
      receive,
    };
  });
  // 接受传来的值
  const receive = () => {
    list = [];
    setList(list);
    queryParams.page = 1;
    queryParams.size = 5;
    queryParams.catgory_id = props.catgoryId;
    setqueryParams(queryParams);
    getList();
  };
  const getList = () => {
    getArticleList(queryParams).then((res) => {
      const { rows, count } = res.data.data;
      list = list.concat(rows);
      setList(list);
      if (queryParams.page * queryParams.size < count) {
        setloadAll(false);
      } else {
        setloadAll(true);
      }
    });
  };
  // 跳转到详情页面
  const getArticleDetail = (articleId) => {
    history.push(`/info/${articleId}`);
    // let url = document.URL + "info?articleId=" + articleId;
    // console.log(url);
  };
  // const getList = () => {};
  const loadMore = () => {
    if (loadAll) return;
    queryParams.page++;
    setqueryParams(queryParams);
    getList();
  };
  return (
    <div className="article">
      {list.map((item) => {
        return (
          <div className="article-item" key={item.article_id}>
            <div
              className="article-item-title"
              onClick={() => {
                getArticleDetail(item.article_id);
              }}
            >
              {item.article_title}
            </div>
            <div className="article-item-content">
              <div className="content">
                Mybatis异常，报错提示There is no
                getterMybatis异常，报错提示There is no
                getterMybatis异常，报错提示There is no
              </div>
              <div className="image">
                <img src={item.article_cover} alt="" />
              </div>
            </div>
            <div className="article-item-user">
              <Row>
                <Col span={12} lg={12} md={12} sm={24} xs={24} className="user">
                  <img
                    src={item.pall_user.user_avatar}
                    alt=""
                    className="useravatar"
                  />
                  <div className="userName">{item.pall_user.user_name}</div>
                  <div className="labels">
                    {item.pall_labels.length > 0 &&
                      item.pall_labels.map((label) => {
                        return (
                          <Tag color="magenta" key={label.id}>
                            {label.label_name}
                          </Tag>
                        );
                      })}
                    {/* <div className="labels-item">前端开发</div>
                    <div className="labels-item">JAVA</div> */}
                  </div>
                </Col>
                <Col span={12} lg={12} md={12} sm={24} xs={24} className="info">
                  <div className="icon">
                    <Icon type="eye" className="custom-icon" />
                    1000
                  </div>
                  <div className="icon">
                    <Icon type="like" className="custom-icon" />
                    赞1000
                  </div>
                  <div className="icon">
                    <Icon type="star" className="custom-icon" />
                    收藏1000
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        );
      })}
      <div className="loadmore" onClick={loadMore}>
        {loadAll ? "已加载完成" : "查看更多"}
      </div>
    </div>
  );
};

export default ArticleList;
