function Progress({ index, totalQuestion, points, totalPoints, answer }) {
  return (
    <header className="progress">
      <progress max={totalQuestion} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {totalQuestion}
      </p>

      <p>
        <strong>
          {points} / {totalPoints}
        </strong>
      </p>
    </header>
  );
}

export default Progress;
