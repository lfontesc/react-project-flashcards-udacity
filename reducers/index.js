import { PROCURAR_DECKS, NOVO_DECK, REMOVER_DECK } from '../actions/index'


function decks(state = {}, action) {
  switch (action.type) {
    case NOVO_DECK: {
      const newState = {
        ...state,
        [action.payload.name]: action.payload
      }
      return newState
    }
    case REMOVER_DECK:{
      
      const newState = {...state}
      delete newState[action.payload]
      
      return newState
    }
    case PROCURAR_DECKS: {
        return action.payload
      }
    default:
      return state
  }
}

export default decks