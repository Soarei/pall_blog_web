import React from "react";
import { Result, Button, Icon } from "antd";
import "./success.less";
const CreationEditorSuccess = (props) => {
  // return MyEditor;
  return (
    <div className="success-bg">
      <Result
        status="success"
        title="发布成功!,正在审核中"
        subTitle="文章审核时间在20分钟之内，在个人中心页面可查看状态"
        extra={[
          <Button type="primary" key="console">
            查看文章
          </Button>,
          <Button key="buy">再写一篇</Button>,
        ]}
      />
      <div className="share">
        <div className="border"></div>
        <div className="text">分享至</div>
        <div className="border"></div>
      </div>
      <div className="share-icon">
        <div className="share-icon-item">
          <div className="circle">
            <Icon type="wechat" />
          </div>
          <div className="share-icon-text">微信</div>
        </div>
        <div className="share-icon-item">
          <div className="circle qq">
            <Icon type="qq" />
          </div>
          <div className="share-icon-text">微信</div>
        </div>
        <div className="share-icon-item">
          <div className="circle">
            <Icon type="twitter" />
          </div>
          <div className="share-icon-text">微信</div>
        </div>
        <div className="share-icon-item">
          <div className="circle">
            <Icon type="weibo-circle" />
          </div>
          <div className="share-icon-text">微信</div>
        </div>
        <div className="share-icon-item">
          <div className="circle">
            <Icon type="zhihu" />
          </div>
          <div className="share-icon-text">微信</div>
        </div>
      </div>
    </div>
  );
};

export default CreationEditorSuccess;
