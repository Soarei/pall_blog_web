import React, { useState, useEffect } from "react";
import "./index.less";
import { Icon, Tree } from "antd";
const Catalogue = (props) => {
  const [content, setContent] = useState("");
  const [topic, setTopic] = useState([]);
  const { TreeNode } = Tree;
  const addAnchorLinks = (html) => {
    var div = document.createElement("div");
    div.innerHTML = html;
    console.log(div.querySelectorAll("h1"));
    const headings = div.querySelectorAll("h1, h2, h3");
    headings.forEach((heading, index) => {
      const anchorLink = document.createElement("a");
      anchorLink.setAttribute("href", `#section-${index + 1}`);
      anchorLink.style.pointerEvents = "none"; // 设置 pointer-events 为 none，使链接不可点击
      heading.setAttribute("id", `section-${index + 1}`);
      heading.innerHTML = anchorLink.outerHTML + heading.innerHTML;
    });
  };
  const generateTableOfContents = (html) => {
    var div = document.createElement("div");
    div.innerHTML = html;
    const headings = div.querySelectorAll("h1, h2, h3");
    const toc = [];
    headings.forEach((heading, index) => {
      const id = `section-${index + 1}`;
      const level =
        heading.tagName === "H1" ? 1 : heading.tagName === "H2" ? 2 : 3; // 根据标题等级设置目录项的缩进
      heading.setAttribute("id", id); // 设置标题的id属性

      toc.push({
        id: id,
        text: heading.textContent,
        level: level,
        index: index,
      });
    });
    setTopic(() => {
      return [...topic, toc];
    });
    // setTimeout(() => {
    //   setTopic([...topic, ...toc]);
    // }, 1000);
  };
  useEffect(() => {
    const parseHeadings = (html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const headings = doc.querySelectorAll("h1, h2, h3");
      function CreateTree() {
        let tree = [];
        let currentNode = null;
        function addNode(node, value) {
          if (!node.children) {
            node.children = [];
          }
          let newNode = { ...value, children: [] };
          node.children.push(newNode);
          return newNode;
        }
        Array.from(headings).forEach((heading, index) => {
          let item = {
            index: index,
            level:
              heading.tagName === "H1" ? 1 : heading.tagName === "H2" ? 2 : 3,
            text: heading.innerText,
            id: `section-${index + 1}`,
          };
          if (heading.tagName === "H1") {
            currentNode = { ...item, children: [] };
            tree.push(currentNode);
          } else if (heading.tagName === "H2" && currentNode) {
            currentNode = addNode(currentNode, item);
          } else if (heading.tagName === "H3" && currentNode) {
            currentNode = addNode(currentNode, item);
          }
        });
        return tree;
      }
      const logtree = CreateTree();
      return logtree;
    };
    const toc = parseHeadings(props.html);
    setTopic(toc);
  }, [props.html]);
  const onSelect = (val) => {
    console.log(val);
  };
  return (
    <div className="catalogue">
      <div className="catalogue-header">
        <div className="title">目录</div>
        <div className="icon">
          <Icon type="menu-fold" />
        </div>
      </div>
      <div className="content">
        {/* {topic.map((item, index) => {
          return (
            <div
              key={index}
              className={
                item.level === 1 ? "h1" : item.level === 2 ? "h2" : "h3"
              }
            >
              {item.text}
            </div>
          );
        })} */}
        <Tree
          showLine
          switcherIcon={<Icon type="down" />}
          defaultExpandedKeys={["0-0-0"]}
          onSelect={onSelect}
        >
          {topic.map((item) => {
            return (
              <TreeNode title={item.text} key={item.id}>
                {item.children.map((item2) => {
                  return (
                    <TreeNode title={item2.text} key={item2.id}>
                      {item2.children.map((item3) => {
                        return (
                          <TreeNode
                            title={item3.text}
                            key={item3.id}
                          ></TreeNode>
                        );
                      })}
                    </TreeNode>
                  );
                })}
              </TreeNode>
            );
          })}
        </Tree>
      </div>
    </div>
  );
};

export default Catalogue;
