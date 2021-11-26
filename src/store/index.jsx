import { createStore } from "redux"
import produce from "immer"
import { Provider } from "react-redux"
import { difference } from "lodash"

export const types = {
  single: "SINGLE_OPTION",
  multiple: "MULTIPLE_OPTION",
}

const initial = {
  score: 0,
  successful_answers: 0,
  submitted: false,
  questions: [
    {
      id: 0,
      type: types.single,
      description: "are you gay?",
      options: ["true", "false"],
      expectedAnswer: ["false"],
      givenAnswer: [],
      correct: false,
      score: 1,
    },
    {
      id: 1,
      type: types.multiple,
      description: "fuck you",
      options: ["fuck you too", "wtf?", "thanks"],
      expectedAnswer: ["fuck you too", "wtf?"],
      correct: false,
      givenAnswer: [],
      score: 2,
    },
    {
      id: 3,
      type: types.single,
      description: "suck a dick",
      options: ["no", "yes"],
      expectedAnswer: ["no"],
      correct: false,
      givenAnswer: [],
      score: 3,
    },
  ],
}

// Actions

export const actions = {
  SUBMIT: "SUBMIT",
  ANSWER_SINGLE_QUESTION: "ANSWER_SINGLE_QUESTION",
  ANSWER_MULTIPLE_QUESTION: "ANSWER_MULTIPLE_QUESTION",
}

const submit = () => ({ type: actions.SUBMIT })

const answer_single_question = (id, givenAnswer) => ({
  type: actions.ANSWER_SINGLE_QUESTION,
  id,
  givenAnswer,
})

const answer_mutliple_question = (id, givenAnswer, checked) => ({
  type: actions.ANSWER_MULTIPLE_QUESTION,
  id,
  checked,
  givenAnswer,
})

export const action_creators = {
  submit,
  answer_single_question,
  answer_mutliple_question,
}

const reducer = (state = initial, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case actions.SUBMIT:
        draft.submitted = true
        const successful_answers = draft.questions.filter(
          ({ givenAnswer, expectedAnswer }) =>
            difference(expectedAnswer, givenAnswer).length === 0
        )

        successful_answers.forEach(({ id }) => {
          const successful_question = draft.questions.find(
            (question) => question.id === id
          )
          successful_question.correct = true
        })

        draft.successful_answers = successful_answers.length
        draft.score = successful_answers
          .map((question) => question.score)
          .reduce((sum, score) => sum + score, 0)

        break
      case actions.ANSWER_SINGLE_QUESTION:
        const _single_question = draft.questions.find(
          (question) => question.id === action.id
        )
        _single_question.givenAnswer = [action.givenAnswer]
        break

      case actions.ANSWER_MULTIPLE_QUESTION:
        const _multiple_question = draft.questions.find(
          (question) => question.id === action.id
        )
        console.log(action.givenAnswer)
        if (action.checked)
          _multiple_question.givenAnswer.push(action.givenAnswer)
        else
          _multiple_question.givenAnswer =
            _multiple_question.givenAnswer.filter(
              (answer) => answer !== action.givenAnswer
            )
    }
  })

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
