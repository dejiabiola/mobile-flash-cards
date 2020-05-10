import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, RESET_STORE, REMOVE_DECK } from "../actions";
import { decks } from "../../utils/_Data";


export default function decksReducer(state = {}, action) {
  switch(action.type) {
    case RECEIVE_DECKS:
      const { decks } = actions
      return {
        ...state,
        ...decks
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
    case REMOVE_DECK:
      const { title } = action
      const { [title]: value, ...remainingDecks } = state
      return {
        remainingDecks
      }
    case RESET_STORE:
      return decks
    default: 
      return state
  }
}