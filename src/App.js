import { useReducer } from "react";
import useQuestions from "./hooks/useQuestions";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import FinishedScreen from "./components/FinishedScreen";
import QuizScreen from "./components/QuizScreen";
import "./index.css";
import "./App.css";

const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const SECONDS_PER_QUESTION = 30;

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "fetchedData":
      return { ...state, questions: payload, status: "ready" };
    case "fetchDataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const { questions, points, index: i } = state;
      const { correctOption, points: pointAssigned } = questions.at(i);
      const isCorrectAnswer = payload === correctOption;

      return {
        ...state,
        answer: payload,
        points: isCorrectAnswer ? points + pointAssigned : points,
      };
    case "nextQuestion":
      const { index } = state;

      return {
        ...state,
        index: index + 1,
        answer: null,
      };
    case "finish":
      return { ...state, status: "finished" };
    case "tick":
      const { secondsRemaining, status } = state;
      return {
        ...state,
        secondsRemaining: secondsRemaining - 1,
        status: secondsRemaining === 0 ? "finished" : status,
      };
    default:
      return initialState;
  }
}

function App() {
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const totalQuestion = questions.length;
  const totalPoints = questions.reduce((prev, curr) => prev + curr.points, 0);
  useQuestions(dispatch);

  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen totalQuestion={totalQuestion} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <QuizScreen
                answer={answer}
                index={index}
                dispatch={dispatch}
                points={points}
                questions={questions}
                secondsRemaining={secondsRemaining}
              />
            </>
          )}
          {status === "finished" && (
            <FinishedScreen points={points} totalPoints={totalPoints} />
          )}
        </Main>
      </div>
    </>
  );
}

export default App;
