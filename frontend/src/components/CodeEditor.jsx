import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode, language }) {
  const lines = code ? code.split("\n").length : 0;
  const characters = code.length;
  const words = code.trim() ? code.trim().split(/\s+/).length : 0;

  return (
    <div className="glass overflow-hidden mb-8">

      {/* Header */}

      <div className="flex justify-between items-center bg-slate-800 px-6 py-4 border-b border-slate-700">

        <div>

          <h2 className="text-xl font-bold text-blue-400">
            💻 Code Editor
          </h2>

          <p className="text-slate-400 text-sm">
            Paste your source code below
          </p>

        </div>

        <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
          {language.toUpperCase()}
        </span>

      </div>

      {/* Monaco */}

      <Editor
        height="500px"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          fontSize: 16,
          minimap: { enabled: false },
          automaticLayout: true,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          tabSize: 4,
          padding: {
            top: 20,
          },
        }}
      />

      {/* Footer */}

      <div className="flex justify-around bg-slate-900 border-t border-slate-700 py-4 text-slate-300">

        <div>
          <span className="font-bold text-blue-400">
            {lines}
          </span>
          <br />
          Lines
        </div>

        <div>
          <span className="font-bold text-blue-400">
            {words}
          </span>
          <br />
          Words
        </div>

        <div>
          <span className="font-bold text-blue-400">
            {characters}
          </span>
          <br />
          Characters
        </div>

      </div>

    </div>
  );
}

export default CodeEditor;