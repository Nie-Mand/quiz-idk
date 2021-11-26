import { useDispatch } from "react-redux"
import { action_creators } from "../store"

export default ({ id, question, submitted }) => {
  const dispatch = useDispatch()

  const { description, options, givenAnswer, expectedAnswer, correct } =
    question

  const onChange = (e) => {
    dispatch(action_creators.answer_single_question(id, e.target.value))
  }

  const getClassName = (option) => {
    const selected = givenAnswer.indexOf(option) !== -1
    const shouldBeSelected = expectedAnswer.indexOf(option) !== -1

    if (!submitted) return ""
    if (shouldBeSelected) return "green"
    if (!shouldBeSelected && !selected) return ""
    return "red"
  }

  return (
    <div>
      <h1>
        {description}{" "}
        {submitted &&
          (correct ? (
            <span className="green">Correct</span>
          ) : (
            <span className="red">Wrong</span>
          ))}
      </h1>

      {options.map((option, idx) => (
        <div style={{ display: "flex", alignItems: "center" }} key={idx}>
          <h4 className={getClassName(option)}>{option}</h4>
          <input
            disabled={submitted}
            name={id}
            type="radio"
            value={option}
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  )
}
