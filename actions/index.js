export const PROCURAR_DECKS = 'PROCURAR_DECKS'
export const NOVO_DECK = 'NOVO_DECK'
export const REMOVER_DECK = 'REMOVER_DECK'

export function getDecks (decks) {
  return {
    type: PROCURAR_DECKS,
    payload: decks
  }
}

export function setDeck (deck){
    return {
        type: NOVO_DECK,
        payload: deck
    }
}

export function removeDeck(key){
  return {
    type:REMOVER_DECK,
    payload:key
  }
}
