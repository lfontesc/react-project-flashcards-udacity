import { SET_DECK, FETCH_DECKS, DELETE_DECK } from '../actions/types'

export function getDecks (decks) {
  return {
    type: FETCH_DECKS,
    payload: decks
  }
}

export function setDeck (deck){
    return {
        type: SET_DECK,
        payload: deck
    }
}

export function removeDeck(key){
  return {
    type:DELETE_DECK,
    payload:key
  }
}
