import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const config = {
  buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
};

const RichTextEditor = ({ initialValue, getValue }) => {
  // const editor = useRef(null);
  const editor = useState('');

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={(newContent) => getValue(newContent)}
    />
  );
};

export default RichTextEditor;
