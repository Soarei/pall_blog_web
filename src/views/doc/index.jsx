import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Carousel, Row, Col, Tabs, Tag } from "antd";
import ArticleList from "./components/ArticleList";
import {
  getCategorylist,
  gettopArticle,
  getBanner,
  getHotLabel,
} from "@/api/article";
import "./index.less";
const { TabPane } = Tabs;

// https://picture.moguit.cn//blog/admin/png/2024/2/26/1708936878668.png
// https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/65d192768e254a768c4391e2b92a4bb6~tplv-k3u1fbpfcp-watermark.image?
const Doc = () => {
  const mode = "top";
  const history = useHistory();
  let [catgorylist, setCatgoryList] = useState([]);
  let [toplist, setTopList] = useState([]);
  let [banner, setBanner] = useState([]);
  let [activeKey, setActiveKey] = useState("1");
  let [hotlist, setHotlist] = useState([]);
  let artileRef = React.createRef();
  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    gettopArticle().then((res) => {
      setTopList(res.data.data.data);
      // console.log(res.data.data.data);
    });
  }, []);
  //获取banner轮播图
  useEffect(() => {
    getBanner().then((res) => {
      setBanner(res.data.data);
    });
  }, []);
  //获取热门标签
  useEffect(() => {
    getHotLabel().then((res) => {
      console.log(res.data.data);
      setHotlist(res.data.data);
    });
  }, []);
  const onChange = (currentSlide) => {};
  const getCategory = () => {
    getCategorylist().then((res) => {
      setCatgoryList(res.data.data);
      console.log(res.data.data);
    });
  };
  const handleTabClick = (val) => {
    setActiveKey(val);
    artileRef.current.receive();
  };
  // 跳转到详情页面
  const getArticleDetail = (articleId) => {
    history.push(`/info/${articleId}`);
    // let url = document.URL + "info?articleId=" + articleId;
    // console.log(url);
  };
  return (
    <div className="app-container">
      {/* <TypingCard title='作者博客' source={cardContent}/> */}
      <Row>
        <Col span={16} lg={16} sm={24} xs={24}>
          <Carousel afterChange={onChange}>
            {banner.map((item) => {
              return (
                <div className="course-left-item" key={item.id}>
                  <img src={item.picture} alt="" />
                  <div className="course-text">{item.title}</div>
                </div>
              );
            })}
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
              {toplist.map((item, index) => {
                return (
                  <div
                    className="content-item"
                    key={item.article_id}
                    onClick={() => {
                      getArticleDetail(item.article_id);
                    }}
                  >
                    <div className="num">{index + 1}</div>
                    <div className="article-title">{item.article_title}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="recommend">
            <div className="header">
              <div className="left">
                <img src="https://s1.ax1x.com/2020/04/28/J5hUaT.jpg" alt="" />
                <div className="title">热门标签</div>
              </div>
              <div className="refresh">换一换</div>
            </div>
            <div className="contentlabel">
              {hotlist.map((item, index) => {
                return (
                  <div className="content-label-item" key={item.id}>
                    {/* <div className="num">{index + 1}</div>
                    <div className="article-title">{item.label_name}</div> */}
                    <Tag color={item.color}>{item.label_name}</Tag>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Doc;
