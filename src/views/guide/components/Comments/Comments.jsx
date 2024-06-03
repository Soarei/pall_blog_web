import { Comment, Avatar, Input, Mentions } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { getArticleComments, addArticleComments } from "@/api/article";
import Editor from "../../components/Comments/Editor";
import "./Comments.less";
const Comments = ({ articleId }) => {
  let [commentlist, setCommentList] = useState([]);
  var [content, setContent] = useState("");
  let [replyInfo, setreplyInfo] = useState({});
  // var content = "";
  // eslint-disable-next-line react/react-in-jsx-scope
  useEffect(() => {
    getArticleComments({
      articleId,
    }).then((res) => {
      let comments = res.data.data.comments;
      const groupByParentId = comments.reduce((acc, item) => {
        const parentId = item.parent_id;
        if (!acc[parentId]) {
          acc[parentId] = [];
        }
        acc[parentId].push(item);
        return acc;
      }, {});
      function buildTree(parentId = null) {
        return (groupByParentId[parentId] || []).map((item) => ({
          ...item,
          children: buildTree(item.id),
        }));
      }
      comments = buildTree();
      setCommentList(comments);
    });
    // console.log(articleInfo.article_content);
  }, [articleId]);
  const handleOpenEditor = (item) => {
    commentlist.forEach((comment) => {
      if (comment.id === item.id) {
        comment.showeditor = true;
      }
    });
    setCommentList(commentlist);
    console.log(commentlist);
  };
  const handleChangeComment = (event) => {
    setContent(event.target.value);
  };
  // 发送评论
  const sendComments = (e) => {
    const data = {
      articleId: "50eb9701-0b86-4011-89ab-e4dca4556c6f",
      content: content,
      comment_avtar:
        "http://image.linkvaper.com/linkvaper/2022-09-29/1664441385852.jpeg",
    };
    addArticleComments(data).then((res) => {});
  };
  // 回复评论
  const replyComment = (item) => {
    setreplyInfo(item);
  };
  return (
    <div className="comments" id="components-comment">
      <Editor replyInfo={replyInfo}></Editor>
      {commentlist.map((item) => {
        return (
          <Comment
            actions={[
              <span
                key="comment-basic-reply-to"
                onClick={() => {
                  replyComment(item);
                }}
              >
                回复
                {item.showeditor ? (
                  <span className="editor">
                    <Input.TextArea
                      onPressEnter={sendComments}
                      onChange={handleChangeComment}
                      allowClear={true}
                      value={content}
                    ></Input.TextArea>
                  </span>
                ) : null}
              </span>,
            ]}
            author={<a className="author">{item.user.username}</a>}
            key={item.id}
            avatar={<Avatar src={item.user.avatar} alt={item.user.username} />}
            content={<p className="content">{item.content}</p>}
            datetime={<span className="datetime">{item.createTime}</span>}
          >
            {item.children && item.children.length > 0
              ? item.children.map((child) => {
                  return (
                    <Comment
                      actions={[
                        <span
                          key="comment-basic-reply-to"
                          onClick={() => {
                            replyComment(child);
                          }}
                        >
                          回复
                        </span>,
                      ]}
                      author={<a>{child.user.username}</a>}
                      key={child.id}
                      avatar={
                        <Avatar
                          src={child.user.avatar}
                          alt={child.user.username}
                        />
                      }
                      content={<p>{child.content}</p>}
                      datetime={<span>{child.createTime}</span>}
                    ></Comment>
                  );
                })
              : null}
          </Comment>
        );
      })}
    </div>
  );
};

export default Comments;
