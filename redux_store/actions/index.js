import { getDecks, getDeckss } from '../../utils/api.js'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'


export function receive_decks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function add_deck(title) {
  return {
    type: ADD_DECK,
    title
  }
}

export function add_card(titleId, card) {
  return {
    type: ADD_CARD,
    titleId,
    card
  }
}

export function removeDeck(title) {
  return {
    type: REMOVE_DECK,
    title
  }
}

export function handleInitialData() {
  return (dispatch) => {
    return getDecks().then(decks => {
      dispatch(receive_decks(decks))
    })
  }
}