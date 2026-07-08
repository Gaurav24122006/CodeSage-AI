function ReviewButton({ onReview, loading }) {
  return (
    <button
      onClick={onReview}
      disabled={loading}
      className="
        w-full
        bg-blue-600
        hover:bg-blue-700
        disabled:bg-slate-700
        disabled:cursor-not-allowed
        text-white
        font-bold
        text-xl
        py-4
        rounded-xl
        transition-all
        duration-300
        hover:scale-[1.02]
        shadow-xl
      "
    >
      {loading ? "🤖 Reviewing..." : "🚀 Review Code"}
    </button>
  );
}

export default ReviewButton;