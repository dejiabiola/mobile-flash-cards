import { getDecks } from '../../utils/api.js'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'
export const RESET_STORE = 'RESET_STORE'


export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  }
}

export function addCard(titleId, card) {
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

export function resetStore() {
  return {
    type: RESET_STORE
  };
}

export function handleInitialData() {
  return (dispatch) => {
    return getDecks().then(decks => {
      dispatch(receiveDecks(decks))
    })
  }
}