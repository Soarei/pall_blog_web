#评论模块

文章表、评论表、用户表来实现用户的评论板块

文章表字段(PALL_ARTICLE) article_id,article_cover,article_title,article_cover,article_content,level,user_id

评论表字段(PALL_COMMENT) id parent_id(用来区分上级 id 是哪个,做评论的嵌套),content,user_id,article_id,comment_time

用户表(PALL_USER) user_id user_name ....

#声明表和表之间的关系

PALL_ARTICLE.hasMany(PALL_COMMENT, { foreignKey: 'article_id' })
PALL_COMMENT.belongsTo(PALL_ARTICLE, { foreignKey: 'article_id' })
PALL_USER.hasMany(PALL_COMMENT, { foreignKey: 'user_id' })
PALL_COMMENT.belongsTo(PALL_USER, { foreignKey: 'user_id' })

#查询数据

1.拿到 article_id 通过 req.query

2.查询当前文章下面有多少的评论数据
let comments = await PALL_COMMENT.findAll({
where: {
article_id: articleId,
},
include: {
attribute: ['user_id', 'user_name', 'user_avatar'],
model: PALL_USER,
}
})
// 获取评论数量
const commentCount = await PALL_COMMENT.count({
where: { article_id: articleId }
});

// 格式化数据处理

const results = {
comments: comments.map(comment => ({
id: comment.id,
parent_id: comment.parent_id,
content: comment.content,
user: {
id: comment.pall_user.user_id,
username: comment.pall_user.user_name,
avatar: comment.pall_user.user_avatar
},
createTime: comment.comment_time,
children: comment.children,
commentCount
}))

}

return resJson(req, res, 5200, results, 'Success')

3.前端拿到数据后，递归处理数据

// eslint-disable-next-line react/react-in-jsx-scope
useEffect(() => {
getArticleComments({
articleId: "50eb9701-0b86-4011-89ab-e4dca4556c6f",
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
