function News() {
  return (
    <div style={{
      backgroundColor: "#fff3cd",
      padding: "0.75rem 2rem",
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontWeight: "600",
      fontSize: "1rem",
      color: "#856404",
      borderTop: "1px solid #ffeeba",
      borderBottom: "1px solid #ffeeba",
      userSelect: "none"
    }}>
      <p style={{ 
        display: "inline-block",
        animation: "news-scroll 20s linear infinite"
      }}>
        Notice 1 - New Loan Schemes Launched &nbsp;&nbsp;|&nbsp;&nbsp; 
        Notice 2 - Download our mobile app now &nbsp;&nbsp;|&nbsp;&nbsp; 
        Notice 3 - Office closed on public holidays
      </p>

      <style>{`
        @keyframes news-scroll {
          0% { transform: translateX(100%) }
          100% { transform: translateX(-100%) }
        }
      `}</style>
    </div>
  );
}

export default News;
