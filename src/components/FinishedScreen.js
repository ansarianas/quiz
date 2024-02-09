function FinishedScreen({ points, totalPoints }) {
  return (
    <p className="result">
      You scored <strong>{points}</strong> out of {totalPoints}
    </p>
  );
}

export default FinishedScreen;
