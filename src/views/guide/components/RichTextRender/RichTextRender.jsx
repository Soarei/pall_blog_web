import React from "react";

const RichTextRender = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};
export default RichTextRender;
