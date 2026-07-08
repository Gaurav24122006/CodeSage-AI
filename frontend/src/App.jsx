import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import ReviewButton from "./components/ReviewButton";
import ResultPanel from "./components/ResultPanel";
import StatsCards from "./components/StatsCards";
import ReviewHistory from "./components/ReviewHistory";

import api from "./services/api";

function App() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("reviewHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const handleReview = async () => {
    if (!code.trim()) {
      toast.error("Please enter some code.");
      return;
    }

    setLoading(true);
    setReview(null);

    try {
      const response = await api.post("/review/", {
        language,
        code,
      });

      setReview(response.data);

      toast.success("Code reviewed successfully!");

      const newHistory = [
        {
          language,
          score: response.data.overall_score,
        },
        ...history,
      ].slice(0, 5);

      setHistory(newHistory);

      localStorage.setItem(
        "reviewHistory",
        JSON.stringify(newHistory)
      );
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(`Backend Error: ${error.response.status}`);
      } else {
        toast.error("Unable to connect to backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-8 py-10">

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1e293b",
            color: "#ffffff",
            border: "1px solid #334155",
          },
        }}
      />

      {/* Hero Section */}

      <div className="text-center mb-12">

        <h1 className="text-6xl font-extrabold text-blue-400 mb-4">
          🚀 CodeSage AI
        </h1>

        <p className="text-xl text-slate-300">
          Professional AI-Powered Code Review Platform
        </p>

        <div className="flex justify-center gap-5 mt-8 flex-wrap">

          <div className="bg-slate-800 px-6 py-4 rounded-xl shadow-lg hover:scale-105 hover:bg-slate-700 transition-all duration-300">
            ⚡ Performance Analysis
          </div>

          <div className="bg-slate-800 px-6 py-4 rounded-xl shadow-lg hover:scale-105 hover:bg-slate-700 transition-all duration-300">
            🔒 Security Review
          </div>

          <div className="bg-slate-800 px-6 py-4 rounded-xl shadow-lg hover:scale-105 hover:bg-slate-700 transition-all duration-300">
            📈 Best Practices
          </div>

          <div className="bg-slate-800 px-6 py-4 rounded-xl shadow-lg hover:scale-105 hover:bg-slate-700 transition-all duration-300">
            💻 AI Suggestions
          </div>

        </div>

      </div>

      {/* Language Selector */}

      <div className="mb-6">
        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
        />
      </div>

      {/* Monaco Editor */}

      <CodeEditor
        code={code}
        setCode={setCode}
        language={language}
      />

      {/* Review Button */}

      <div className="mt-6 mb-8">
        <ReviewButton
          onReview={handleReview}
          loading={loading}
        />
      </div>

      {/* Loading */}

      {loading && (
        <div className="bg-slate-800 rounded-xl p-6 text-center text-lg font-bold mb-8 animate-pulse shadow-xl">
          🤖 AI is reviewing your code...
        </div>
      )}

      {/* Dashboard */}

      {review && <StatsCards review={review} />}

      {/* Result */}

      <ResultPanel review={review} />

      {/* Review History */}

      <ReviewHistory history={history} />

      {/* Footer */}

      <footer className="mt-16 border-t border-slate-700 pt-6 text-center text-slate-500 text-sm">
        <p>
          Built with  using React • FastAPI • OpenRouter • Monaco Editor
        </p>

        <p className="mt-2 text-slate-600">
          © 2026 CodeSage AI • Developed by Gaurav S
        </p>
      </footer>

    </div>
  );
}

export default App;