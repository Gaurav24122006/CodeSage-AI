function ScoreCard({ score }) {
  const percentage = Math.max(0, Math.min(score * 10, 100));

  let color = "bg-red-500";

  if (score >= 8) color = "bg-green-500";
  else if (score >= 6) color = "bg-yellow-500";
  else if (score >= 4) color = "bg-orange-500";

  return (
    <div className="glass p-8 mb-8">

      <h2 className="text-2xl font-bold text-blue-400 mb-6">
        ⭐ Overall Score
      </h2>

      <div className="flex items-center gap-8">

        <div className="text-6xl font-extrabold text-white">
          {score}
          <span className="text-3xl text-slate-400">/10</span>
        </div>

        <div className="flex-1">

          <div className="w-full bg-slate-700 rounded-full h-6 overflow-hidden">

            <div
              className={`${color} h-6 transition-all duration-700`}
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

          <div className="flex justify-between mt-2 text-sm text-slate-400">
            <span>Poor</span>
            <span>Average</span>
            <span>Excellent</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ScoreCard;