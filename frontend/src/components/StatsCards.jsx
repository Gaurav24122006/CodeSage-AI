function StatsCards({ review }) {
  if (!review) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <StatCard
        title="⭐ Score"
        value={`${review.overall_score}/10`}
      />

      <StatCard
        title="🐞 Issues"
        value={review.issues.length}
      />

      <StatCard
        title="⚡ Performance"
        value={review.performance.length}
      />

      <StatCard
        title="🔒 Security"
        value={review.security.length}
      />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
      }}
    >
      <h3
        style={{
          color: "#94a3b8",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          fontSize: "34px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default StatsCards;