import React, { useEffect, useState, useRef } from "react";
import {
  getArticleDetail,
  getCountStatic,
  getUserInfoArticle,
} from "@/api/article";
import { Row, Col, Icon, Tag, Avatar, Button } from "antd";
import RichTextRender from "./components/RichTextRender/RichTextRender";
import Tools from "./components/Tools/Tools";
import Comments from "./components/Comments/Comments";
import "./index.less";
const Info = (props) => {
  let [articleInfo, setarticleInfo] = useState({});
  let [counts, setCounts] = useState({});
  let [userInfo, setuserInfo] = useState({});
  const anchorRef = useRef();
  useEffect(() => {
    getArticleDetail({ articleId: props.match.params.articleId }).then(
      (res) => {
        setarticleInfo(res.data.data);
      }
    );
    // console.log(articleInfo.article_content);
  }, [props.match.params.articleId]);

  useEffect(() => {
    getCountStatic({ articleId: props.match.params.articleId }).then((res) => {
      setCounts(res.data.data);
      // console.log(counts);
    });
  }, [props.match.params.articleId]);

  useEffect(() => {
    getUserInfoArticle({ articleId: props.match.params.articleId }).then(
      (res) => {
        setuserInfo(res.data.data);
      }
    );
  }, [props.match.params.articleId]);

  //跳转到回复框
  const scrollToComment = () => {
    // anchorRef.current.scrollIntoView({
    //   behavior: "smooth",
    //   block: "start",
    // });
    console.log(anchorRef);
  };
  return (
    <div className="container">
      <Row>
        <Col span={16} lg={18} md={24} sm={24} xs={24}>
          <div className="container-content">
            <div className="header">
              <div className="header-title">{articleInfo.article_title}</div>
              <div className="header-info">
                <Row>
                  <Col
                    span={12}
                    lg={12}
                    md={12}
                    sm={24}
                    xs={24}
                    className="user"
                  >
                    <img
                      src="https://picture.moguit.cn//blog/admin/jpg/2023/7/21/1689904876080.jpg"
                      alt=""
                      className="useravatar"
                    />
                    <div className="userName">来自星星的你</div>
                    <div className="labels">
                      {articleInfo.labels
                        ? articleInfo.labels.map((item) => {
                            return (
                              <Tag color={item.color} key={item.label_name}>
                                {item.label_name}
                              </Tag>
                            );
                          })
                        : null}
                      {/* {articleInfo.labels} */}
                      {/* {articleInfo.labels.map((label) => {
                        return (
                          <Tag color="magenta" key={label.label_name}>
                            {label.label_name}
                          </Tag>
                        );
                      })} */}
                    </div>
                  </Col>
                  <Col
                    span={12}
                    lg={12}
                    md={12}
                    sm={24}
                    xs={24}
                    className="info"
                  >
                    <div className="icon">
                      <Icon type="eye" className="custom-icon" />
                      浏览{articleInfo.browse_count}
                    </div>
                    <div className="icon">
                      <Icon type="like" className="custom-icon" />赞
                      {articleInfo.thumbCount}
                    </div>
                    <div className="icon">
                      <Icon type="star" className="custom-icon" />
                      收藏 {articleInfo.collectCount}
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <RichTextRender htmlContent={articleInfo.article_content} />
          </div>
          <Comments articleId={props.match.params.articleId}></Comments>
        </Col>
        <Col span={6} lg={6} md={0} sm={0} xs={0}>
          <div className="container-left">
            <div className="authinfo">
              <div className="auth-header">
                <Avatar src={userInfo.userAvatar} size={56} />
                <div className="auth-name">{userInfo.userName}</div>
              </div>
              <div className="auth-content">
                <div className="auth-content-item">
                  <div className="value">{userInfo.articleCount}</div>
                  <div className="label">文章数</div>
                </div>
                <div className="auth-content-item">
                  <div className="value">{userInfo.commentCount}</div>
                  <div className="label">评论数</div>
                </div>
                <div className="auth-content-item">
                  <div className="value">{userInfo.collectCount}</div>
                  <div className="label">收藏数</div>
                </div>
              </div>
              <div className="auth-footer">
                <Button type="primary">关注他</Button>
                <Button type="danger">私信</Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Tools className="tools" counts={counts} />
    </div>
  );
};

export default Info;
