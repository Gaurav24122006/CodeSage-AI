const languages = [
  "python",
  "cpp",
  "java",
  "javascript",
  "typescript",
  "c",
  "csharp",
  "go",
  "rust",
];

function LanguageSelector({ language, setLanguage }) {
  return (
    <div className="glass p-6 mb-8">

      <label className="block text-xl font-bold text-blue-400 mb-4">
        Programming Language
      </label>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="
          w-full
          bg-slate-900
          border
          border-slate-700
          rounded-xl
          p-4
          text-white
          text-lg
          outline-none
          focus:ring-2
          focus:ring-blue-500
          transition
        "
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>

    </div>
  );
}

export default LanguageSelector;