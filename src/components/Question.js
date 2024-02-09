import Options from "./Options";

function Question({ question, answer, dispatch }) {

  return (
    <>
      <h4>{question.question}</h4>
      <Options
        options={question.options}
        correctOption={question.correctOption}
        answer={answer}
        dispatch={dispatch}
      />
    </>
  );
}

export default Question;
