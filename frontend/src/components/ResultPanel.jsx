import ScoreCard from "./ScoreCard";
import SectionCard from "./SectionCard";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "react-hot-toast";
import jsPDF from "jspdf";

function ResultPanel({ review }) {
  if (!review) return null;

  const downloadPDF = () => {
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(20);
    doc.text("CodeSage AI Review Report", 20, y);

    y += 15;
    doc.setFontSize(14);
    doc.text(`Overall Score: ${review.overall_score}/10`, 20, y);

    y += 15;
    doc.text("Summary", 20, y);

    y += 8;
    doc.setFontSize(11);
    doc.text(review.summary, 20, y, { maxWidth: 170 });

    y += 20;

    doc.setFontSize(14);
    doc.text("Strengths", 20, y);

    y += 8;
    doc.setFontSize(11);

    review.strengths.forEach((item) => {
      doc.text("• " + item, 20, y);
      y += 7;
    });

    y += 5;

    doc.setFontSize(14);
    doc.text("Issues", 20, y);

    y += 8;
    doc.setFontSize(11);

    if (review.issues.length === 0) {
      doc.text("No Issues Found", 20, y);
      y += 7;
    } else {
      review.issues.forEach((issue) => {
        doc.text(
          `• ${issue.severity}: ${issue.description}`,
          20,
          y,
          { maxWidth: 170 }
        );
        y += 10;
      });
    }

    y += 5;

    doc.setFontSize(14);
    doc.text("Performance", 20, y);

    y += 8;
    doc.setFontSize(11);

    review.performance.forEach((item) => {
      doc.text("• " + item, 20, y);
      y += 7;
    });

    y += 5;

    doc.setFontSize(14);
    doc.text("Security", 20, y);

    y += 8;
    doc.setFontSize(11);

    review.security.forEach((item) => {
      doc.text("• " + item, 20, y);
      y += 7;
    });

    y += 5;

    doc.setFontSize(14);
    doc.text("Best Practices", 20, y);

    y += 8;
    doc.setFontSize(11);

    review.best_practices.forEach((item) => {
      doc.text("• " + item, 20, y);
      y += 7;
    });

    doc.save("CodeSage_AI_Report.pdf");

    toast.success("PDF downloaded!");
  };

  return (
    <div className="mt-10">

      <ScoreCard score={review.overall_score} />

      <SectionCard title="📝 Summary">
        <p>{review.summary}</p>
      </SectionCard>

      <SectionCard title="✅ Strengths">
        <ul>
          {review.strengths.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="⚠ Issues">
        {review.issues.length === 0 ? (
          <p className="text-green-400 font-bold">
            ✅ No Issues Found
          </p>
        ) : (
          review.issues.map((issue, index) => {
            const color =
              issue.severity === "Critical"
                ? "bg-red-600"
                : issue.severity === "High"
                ? "bg-orange-600"
                : issue.severity === "Medium"
                ? "bg-yellow-500"
                : "bg-green-600";

            return (
              <div
                key={index}
                className="flex gap-4 items-center mb-4"
              >
                <span
                  className={`${color} px-3 py-1 rounded-full font-bold`}
                >
                  {issue.severity}
                </span>

                <span>{issue.description}</span>
              </div>
            );
          })
        )}
      </SectionCard>

      <SectionCard title="⚡ Performance">
        <ul>
          {review.performance.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="🔒 Security">
        <ul>
          {review.security.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="💡 Best Practices">
        <ul>
          {review.best_practices.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard title="💻 Improved Code">

        <div className="flex justify-end gap-4 mb-4">

          <button
            onClick={() => {
              navigator.clipboard.writeText(review.improved_code);
              toast.success("Copied to clipboard!");
            }}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            📋 Copy Code
          </button>

          <button
            onClick={downloadPDF}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            📄 Download PDF
          </button>

        </div>

        <SyntaxHighlighter
          language="python"
          style={oneDark}
          customStyle={{
            borderRadius: "12px",
          }}
        >
          {review.improved_code}
        </SyntaxHighlighter>

      </SectionCard>

    </div>
  );
}

export default ResultPanel;