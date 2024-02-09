function Options({ options, answer, correctOption, dispatch }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {options.map((opt, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          key={opt}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={answer !== null}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
