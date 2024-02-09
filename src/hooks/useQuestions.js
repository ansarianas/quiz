import { useEffect } from "react";

export default function useQuestions(dispatch) {
  useEffect(
    function () {
      async function fetchQuestions() {
        try {
          const res = await fetch("http://localhost:8000/questions");
          const data = await res.json();
          dispatch({ type: "fetchedData", payload: data });
        } catch (err) {
          console.log(err);
          dispatch({ type: "fetchDataFailed" });
        }
      }

      fetchQuestions();
    },
    [dispatch]
  );
}
