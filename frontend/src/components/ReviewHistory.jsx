function ReviewHistory({ history }) {
  if (history.length === 0) return null;

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "15px",
        marginTop: "30px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        🕒 Recent Reviews
      </h2>

      {history.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 0",
            borderBottom:
              index !== history.length - 1
                ? "1px solid #334155"
                : "none",
          }}
        >
          <span>{item.language}</span>

          <span>
            ⭐ {item.score}/10
          </span>
        </div>
      ))}
    </div>
  );
}

export default ReviewHistory;