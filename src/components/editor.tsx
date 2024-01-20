/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from "react";

import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { lineNumbersRelative } from "@uiw/codemirror-extensions-line-numbers-relative";

// Theme
import { okaidia } from "@uiw/codemirror-theme-okaidia";

type EditorProps = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  extension: Extension;
};

function Editor(props: EditorProps) {
  const { state, setState, title, extension } = props;
  const [didMount, setDidMount] = useState(false);

  const handleChange = useCallback((val: any) => {
    setState(val);
  }, []);

  useEffect(() => {
    setDidMount(true);
  }, []);

  if (!didMount) return <>Loading...</>;

  return (
    <div className="code-editor">
      <h1>{title}</h1>
      <CodeMirror
        value={state}
        style={{
          fontSize: 24,
        }}
        theme={okaidia}
        extensions={[lineNumbersRelative, extension]}
        onChange={handleChange}
      />
    </div>
  );
}

export default Editor;
