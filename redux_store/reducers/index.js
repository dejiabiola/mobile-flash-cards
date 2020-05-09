import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from "../actions";


export default function decks(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      const { title } = action
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      }
    case ADD_CARD:
      const { titleId, card } = action
      return {
        ...state,
        [titleId]: {
          ...state[titleId],
          questions: [...state[titleId].questions].concat(card)
        }
      }
    default: 
      return state
  }
}