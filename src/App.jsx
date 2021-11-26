import "./App.css"
import SingleChoice from "./components/SingleChoice"
import MultipleChoice from "./components/MultipleChoice"
import { useSelector, useDispatch } from "react-redux"
import { action_creators, types } from "./store"

function App() {
  const { score, submitted, questions, successful_answers } = useSelector(
    (state) => state
  )
  const dispatch = useDispatch()
  const handleSubmit = () => {
    dispatch(action_creators.submit())
  }

  return (
    <div>
      <h1>Test ({submitted ? "ENDED" : "GOING"})</h1>
      {submitted && (
        <h1>
          Score: {score} ({successful_answers} / {questions.length}){" "}
        </h1>
      )}

      {questions.map(
        ({
          id,
          type,
          description,
          options,
          givenAnswer,
          expectedAnswer,
          correct,
        }) =>
          type === types.single ? (
            <SingleChoice
              key={id}
              id={id}
              question={{
                description,
                options,
                givenAnswer,
                expectedAnswer,
                correct,
              }}
              submitted={submitted}
            />
          ) : (
            <MultipleChoice
              key={id}
              id={id}
              question={{
                description,
                options,
                givenAnswer,
                expectedAnswer,
                correct,
              }}
              submitted={submitted}
            />
          )
      )}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default App
