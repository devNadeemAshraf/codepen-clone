import { useEffect, useState } from "react";

import { html as HTMLLang } from "@codemirror/lang-html";
import { css as CSSLang } from "@codemirror/lang-css";
import { javascript as JSLang } from "@codemirror/lang-javascript";

import Editor from "./components/editor";

function App() {
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(
        `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
        `
      );
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <main className="wrapper">
      <div className="editor-container">
        <Editor
          state={html}
          setState={setHtml}
          title="HTML"
          extension={HTMLLang()}
        />
        <Editor
          state={css}
          setState={setCss}
          title="CSS"
          extension={CSSLang()}
        />
        <Editor
          state={js}
          setState={setJs}
          title="JavaScript"
          extension={JSLang()}
        />
      </div>
      <div className="op-iframe">
        <iframe
          srcDoc={srcDoc}
          frameBorder={0}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />
      </div>
    </main>
  );
}

export default App;
