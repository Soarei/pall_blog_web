import React, { useEffect, useState } from "react";
import { getArticleDetail, getCountStatic } from "@/api/article";
import { Row, Col, Icon, Tag, Badge } from "antd";
import RichTextRender from "./components/RichTextRender/RichTextRender";
import Tools from "./components/Tools/Tools";
import Comments from "./components/Comments/Comments";
import "./index.less";
const Info = (props) => {
  let [articleInfo, setarticleInfo] = useState({});
  let [counts, setCounts] = useState({});

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

  const gotoAnchhor = (id) => {
    let element = document.getElementById(id);
    element && element.scrollIntoView({ block: "start", behavior: "smooth" });
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
                      <Tag color="magenta">前端开发</Tag>
                      <Tag color="magenta">前端开发</Tag>
                      {/* <div className="labels-item">前端开发</div>
                    <div className="labels-item">JAVA</div> */}
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
                      1000
                    </div>
                    <div className="icon">
                      å
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
            <RichTextRender htmlContent={articleInfo.article_content} />
          </div>
          <Comments id="components-comment"></Comments>
        </Col>
        <Col span={6} lg={6} md={0} sm={0} xs={0}>
          <div className="container-left">1111</div>
        </Col>
      </Row>
      <Tools className="tools" counts={counts} />
    </div>
  );
};

export default Info;
