import { Comment, Avatar } from "antd";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { getArticleComments } from "@/api/article";

const Comments = ({ articleId }) => {
  const [commentlist, setCommentList] = useState([]);
  // eslint-disable-next-line react/react-in-jsx-scope
  useEffect(() => {
    getArticleComments({
      articleId: "50eb9701-0b86-4011-89ab-e4dca4556c6f",
    }).then((res) => {
      setCommentList(res.data.data.comments);
    });
    // console.log(articleInfo.article_content);
  }, [articleId]);
  const actions = [<span key="comment-basic-reply-to">回复</span>];
  return (
    <div className="comments">
      {commentlist.map((item) => {
        return (
          <Comment
            actions={actions}
            author={<a>{item.user.username}</a>}
            key={item.id}
            avatar={<Avatar src={item.user.avatar} alt={item.user.username} />}
            content={<p>{item.content}</p>}
            datetime={<span>{item.createTime}</span>}
          ></Comment>
        );
      })}
    </div>
  );
};

export default Comments;
