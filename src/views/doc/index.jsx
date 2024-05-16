import React, { useState, useEffect } from "react";
import { Carousel, Row, Col, Tabs, Button } from "antd";
import ArticleList from "./components/ArticleList";
import { getCategorylist } from "@/api/article";
import "./index.less";
const { TabPane } = Tabs;

// https://picture.moguit.cn//blog/admin/png/2024/2/26/1708936878668.png
// https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65d192768e254a768c4391e2b92a4bb6~tplv-k3u1fbpfcp-watermark.image?
const Doc = () => {
  const mode = "top";
  let [catgorylist, setCatgoryList] = useState([]);
  let [activeKey, setActiveKey] = useState("1");
  let artileRef = React.createRef();
  useEffect(() => {
    getCategory();
  }, []);
  const onChange = (currentSlide) => {};
  const getCategory = () => {
    getCategorylist().then((res) => {
      setCatgoryList(res.data.data);
    });
  };
  const handleTabClick = (val) => {
    setActiveKey(val);
    artileRef.current.receive();
  };
  return (
    <div className="app-container">
      {/* <TypingCard title='作者博客' source={cardContent}/> */}
      <Row>
        <Col span={16} lg={16} sm={24} xs={24}>
          <Carousel afterChange={onChange}>
            <div className="course-left-item">
              <img
                src="https://picture.moguit.cn//blog/admin/png/2024/2/26/1708936878668.png"
                alt=""
              />
              <div className="course-text">Windows环境下配置蘑菇博客环境</div>
            </div>
            <div className="course-left-item">
              <img
                src="https://picture.moguit.cn//blog/admin/png/2024/2/26/1708936878668.png"
                alt=""
              />
              <div className="course-text">Windows环境下配置蘑菇博客环境</div>
            </div>
          </Carousel>
        </Col>
        <Col span={8} lg={8} sm={0} xs={0}>
          <div className="course-right">
            <div className="course-right-top">
              <img
                src="https://picture.moguit.cn//blog/admin/png/2024/2/22/1708614037031.png"
                className="course-right-img"
                alt=""
              />
            </div>
            <div className="course-right-bottom">
              <img
                src="https://picture.moguit.cn//blog/admin/png/2024/2/22/1708614037031.png"
                className="course-right-img "
                alt=""
              />
            </div>
          </div>
        </Col>
      </Row>
      {/* 分类 */}
      <Row>
        <Col span={16} lg={16} sm={24} xs={24}>
          <Tabs
            defaultActiveKey="1"
            tabPosition={mode}
            activeKey={activeKey}
            onTabClick={handleTabClick}
          >
            {catgorylist.map((i) => (
              <TabPane tab={`${i.catgory_name}`} key={i.catgory_id}></TabPane>
            ))}
          </Tabs>
          <ArticleList catgoryId={activeKey} onRef={artileRef} />
        </Col>
        <Col span={8} lg={8} sm={0} xs={0}>
          <div className="recommend">
            <div className="header">
              <div className="left">
                <img src="https://s1.ax1x.com/2020/04/28/J5hUaT.jpg" alt="" />
                <div className="title">文章榜</div>
              </div>
              <div className="refresh">换一换</div>
            </div>
            <div className="content">
              <div className="content-item">
                <div className="num">1</div>
                <div className="article-title">
                  Flutter 3.22 发布，快来看看有什么更新吧？
                </div>
              </div>
              <div className="content-item">
                <div className="num">2</div>
                <div className="article-title">
                  Flutter 3.22 发布，快来看看有什么更新吧？
                </div>
              </div>
              <div className="content-item">
                <div className="num">1</div>
                <div className="article-title">
                  Flutter 3.22 发布，快来看看有什么更新吧？
                </div>
              </div>
              <div className="content-item">
                <div className="num">1</div>
                <div className="article-title">
                  Flutter 3.22 发布，快来看看有什么更新吧？
                </div>
              </div>
              <div className="content-item">
                <div className="num">1</div>
                <div className="article-title">
                  Flutter 3.22 发布，快来看看有什么更新吧？
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Doc;
