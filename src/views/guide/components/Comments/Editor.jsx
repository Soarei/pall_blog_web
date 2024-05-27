import React, { useState, useMemo } from "react";
import { Form, Input, Button, message, Mentions } from "antd";
import { addArticleComments } from "@/api/article";
import moment from "moment";
const { TextArea } = Input;
const Editor = (props) => {
  console.log(props);
  let [content, setContent] = useState("");
  let [submitting, setSubmitting] = useState(false);
  const onChange = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    console.log(moment().format("YYYY-MM-DD hh:mm:ss"));
    const data = {
      articleId: "50eb9701-0b86-4011-89ab-e4dca4556c6f",
      parentId: props.replyInfo.id,
      content: content,
      comment_time: moment().utc().format("YYYY-MM-DD hh:mm:ss"),
      comment_avtar:
        "http://image.linkvaper.com/linkvaper/2022-09-29/1664441385852.jpeg",
    };
    setSubmitting(true);
    addArticleComments(data).then((res) => {
      message.success("评论提交成功");
      setSubmitting(false);
    });
  };
  return (
    <div>
      <Form.Item>
        <TextArea
          rows={4}
          onChange={onChange}
          value={content}
          placeholder={
            props.replyInfo.user
              ? `回复${props.replyInfo.user.username}`
              : "说点什么吧"
          }
        />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          发表评论
        </Button>
      </Form.Item>
    </div>
  );
};

export default Editor;
