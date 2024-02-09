import Footer from "./Footer";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import Question from "./Question";
import Timer from "./Timer";

function QuizScreen({
  questions,
  dispatch,
  index,
  points,
  answer,
  secondsRemaining,
}) {
  const totalQuestion = questions.length;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  return (
    <>
      <Progress
        index={index}
        points={points}
        answer={answer}
        totalQuestion={totalQuestion}
        totalPoints={totalPoints}
      />
      <Question
        question={questions[index]}
        dispatch={dispatch}
        answer={answer}
      />
      <Footer>
        <>
          <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
          <NextQuestion
            dispatch={dispatch}
            index={index}
            totalQuestion={totalQuestion}
          />
        </>
      </Footer>
    </>
  );
}

export default QuizScreen;
