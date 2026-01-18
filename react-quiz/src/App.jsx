import { useEffect, useReducer } from "react";
const SECONDS_PER_QUESTION = 10;
const initialState = {
  questions: [],
  status: "loading", // loading | ready | active | finished | error
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        index: 0,
        points: 0,
        answer: null,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions[state.index];
      const isCorrect = action.payload === question.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...state,
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 1 ? "finished" : state.status,
      };
    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer } = state;
  const maxPoints = questions.reduce((acc, cur) => {
    return acc + cur.points;
  }, 0);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchQuestions();
  }, []);
  useEffect(() => {
    if (status !== "active") {
      return;
    }
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(id);
  }, [status]);
  return (
    <>
      <div>
        <h1>React Quiz</h1>
        {status === "loading" && <p>loading quiz questions</p>}
        {status === "error" && <p>Error loading the questions</p>}
        {status === "ready" && (
          <>
            <p>{questions.length} questions loaded.</p>
            <button onClick={() => dispatch({ type: "start" })}>
              Start Quiz
            </button>
          </>
        )}
        {status === "active" && (
          <div>
            <h2>{questions[index].question}</h2>
            <ul>
              {questions[index].options.map((option, i) => {
                return (
                  <li key={option}>
                    <button
                      onClick={() =>
                        dispatch({ type: "newAnswer", payload: i })
                      }
                      disabled={state.answer !== null}
                    >
                      {option}
                    </button>
                  </li>
                );
              })}
              {answer !== null && (
                <div>
                  <button
                    onClick={() => {
                      if (index < questions.length - 1) {
                        dispatch({ type: "nextQuestion" });
                      } else {
                        dispatch({ type: "finish" });
                      }
                    }}
                  >
                    {index === questions.length - 1 ? "Finish" : "Next"}
                  </button>
                </div>
              )}
            </ul>
            {answer !== null && (
              <p>
                {answer === questions[index].correctOption
                  ? "correct"
                  : "wrong"}
              </p>
            )}
            <p>⏳ Time left: {state.secondsRemaining}s</p>
          </div>
        )}
        {status === "finished" && (
          <div>
            <h2>Quiz Finished</h2>
            <p>
              your score: {state.points}/{maxPoints}
            </p>
            <button onClick={() => dispatch({ type: "restart" })}>
              Restart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
