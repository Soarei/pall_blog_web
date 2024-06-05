import "@wangeditor/editor/dist/css/style.css";
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import {
  Form,
  Input,
  Icon,
  Tooltip,
  Select,
  Button,
  Upload,
  Radio,
  Tag,
  Popover,
} from "antd";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import {
  uploadImage,
  getCategory,
  getAllLabels,
  addArticle,
} from "@/api/common";
import "./editor.less";
const { TextArea } = Input;
const MyEditor = (props) => {
  const [editor, setEditor] = useState(null);
  const [html, setHtml] = useState("");
  const [category, setCategory] = useState([]);
  const [labels, setLabels] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [filelist, setFileList] = useState([]);
  const [loading, setLoading] = useState("plus");
  const [form, setForm] = useState({
    catgory_id: "",
    labelIds: [],
    articleType: 1,
    articleCover: "",
    articleTitle: "",
    abstract: "",
  });
  // 工具栏配置
  const toolbarConfig = {};
  const editorConfig = {
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        customUpload(file, insertFn) {
          const formData = new FormData();
          formData.append("file", file);
          uploadImage(formData).then((res) => {
            const { url, alt, href } = res.data.data;
            insertFn(url, alt, href);
          });
        },
      },
    },
  };
  useEffect(() => {
    getCategory().then((res) => {
      setCategory(res.data.data);
    });
  }, []);
  useEffect(() => {
    getAllLabels().then((res) => {
      setLabels(res.data.data);
    });
  }, []);
  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  // 提交文章
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const handleArticleTitle = (event) => {
    event.persist();
    setForm(() => {
      return {
        ...form,
        articleTitle: event.target.value,
      };
    });
  };
  // 选择分类
  const handleChange = (val) => {
    setForm(() => {
      return {
        ...form,
        catgory_id: val,
      };
    });
  };
  //选择文章标签
  const choiceTags = (item) => {
    if (form.labelIds.includes(item.id)) {
      setForm(() => {
        return {
          ...form,
          labelIds: form.labelIds.filter((id) => id !== item.id),
        };
      });
    } else {
      setForm(() => {
        return {
          ...form,
          labelIds: [...form.labelIds, item.id],
        };
      });
    }
  };
  //移除标签
  const onCloseLabel = (val) => {
    setForm(() => {
      return {
        ...form,
        labelIds: form.labelIds.filter((id) => id !== val),
      };
    });
  };
  const uploadButton = (
    <div className="upload-button">
      <Icon type={loading ? "plus" : "plus"} />
      <div className="ant-upload-text">添加文章封面</div>
    </div>
  );
  // 上传封面成功
  const uploadCover = ({ file, fileList }) => {
    const url = file.response ? file.response.data.url : "";
    setFileList(fileList);
    setImageUrl(url);
    setForm(() => {
      return {
        ...form,
        articleCover: url,
      };
    });
  };
  // 摘要
  const handleAbstract = (event) => {
    event.persist();
    setForm(() => {
      return {
        ...form,
        abstract: event.target.value,
      };
    });
  };
  const handleSubmit = () => {
    console.log("提交");
  };
  //类型
  const handleArticleType = (e) => {
    setForm(() => {
      return {
        ...form,
        articleType: e.target.value,
      };
    });
  };
  //气泡卡片
  const contentPopover = (
    <>
      <div className="content-popover" style={{ padding: 10, width: 400 }}>
        <p className="content-left">
          <Input placeholder="人生最大的遗憾：“不能同时拥有青春和对青春的感受”。"></Input>
        </p>
        <div className="tags">
          {labels.map((item) => {
            return (
              <Tag
                key={item.id}
                style={{ marginBottom: 10, cursor: "pointer" }}
                color={form.labelIds.includes(item.id) ? "#87d068" : null}
                onClick={() => {
                  choiceTags(item);
                }}
              >
                {item.label_name}
              </Tag>
            );
          })}
        </div>
      </div>
    </>
  );
  const addArticleBlog = () => {
    const {
      catgory_id,
      labelIds,
      articleCover,
      articleTitle,
      articleType,
      abstract,
    } = form;
    console.log(html);
    const data = {
      catgory_id,
      article_title: articleTitle,
      article_cover: articleCover,
      tags: labelIds,
      article_type: articleType,
      abstract,
      level: 1,
      article_content: html,
    };
    addArticle(data).then((res) => {
      console.log(res);
    });
  };
  return (
    <>
      <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <div className="editor">
          <Input
            className="editor-input"
            placeholder="请输入文章标题"
            value={form.articleTitle}
            onChange={handleArticleTitle}
          ></Input>
          <Editor
            defaultConfig={editorConfig}
            value={html}
            onCreated={setEditor}
            onChange={(editor) => setHtml(editor.getHtml())}
            mode="default"
            style={{
              height: "800px",
              overflowY: "hidden",
              margin: "0px auto",
              width: "100%",
            }}
          />
        </div>
      </div>
      <div className="article-info">
        <Form
          onSubmit={handleSubmit}
          className="login-form"
          {...formItemLayout}
        >
          <Form.Item
            label={
              <span className="label-name">
                文章分类&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
            required
          >
            {/* {
              getFieldDecorator('cagegoryId',{
                rules: [{ required: true, message: 'Please input your Password!' }],
              })
            } */}
            <Select
              value={form.catgory_id}
              style={{ width: 400 }}
              onChange={handleChange}
            >
              {category.map((item) => {
                return (
                  <Select.Option value={item.catgory_id} key={item.catgory_id}>
                    {item.catgory_name}
                  </Select.Option>
                );
              })}
              {/* <Select.Option value="jack">Jack</Select.Option>
              <Select.Option value="lucy">Lucy</Select.Option> */}
            </Select>
          </Form.Item>
          <Form.Item
            label={
              <span className="label-name">
                文章标签&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {" "}
            {labels.map((item) => {
              return form.labelIds.includes(item.id) ? (
                <Tag
                  key={item.id}
                  closable
                  onClose={() => {
                    onCloseLabel(item.id);
                  }}
                >
                  {item.label_name}
                </Tag>
              ) : null;
            })}
            <Popover content={contentPopover} title="选择标签" trigger="click">
              <Button type="dashed" size="default">
                添加文章标签
              </Button>
            </Popover>
          </Form.Item>
          <Form.Item
            label={
              <span className="label-name">
                添加封面&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {" "}
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/dev-api/admin/upload/uploadFile"
              headers={{ token: localStorage.getItem("token") }}
              onChange={uploadCover}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label={
              <span className="label-name">
                文章摘要&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {" "}
            <TextArea
              rows={4}
              placeholder="摘要:会在推荐、列表等场景外漏，帮助读者快速了解内容"
              maxLength={200}
              onChange={handleAbstract}
              value={form.abstract}
            ></TextArea>
          </Form.Item>
          <Form.Item
            label={
              <span className="label-name">
                文章类型&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {" "}
            <Radio.Group
              onChange={handleArticleType}
              value={form.articleType}
              size="large"
            >
              <Radio value={1}>原创</Radio>
              <Radio value={2}>转载</Radio>
              <Radio value={3}>翻译</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
      {/* 底部内容 */}
      <div className="article-footer">
        <div className="action">
          <div className="action-left">
            <div className="total-bate">共100字</div>
            <div className="top">回到顶部</div>
          </div>
          <div className="action-right">
            <div className="action-button" onClick={addArticleBlog}>
              发布博客
            </div>
          </div>
        </div>
      </div>
      {/* <div style={{ marginTop: "15px" }}>{html}</div> */}
    </>
  );
};

export default MyEditor;
