import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: () => ({
      persons: {},
      transactions: {},
      cards: [],
      cardActive: 0
    }),
    mutations: {
      addPerson(state, person) {
        state.persons[person.id] = person
      },
      addCard(state, card) {
        const active = state.cards.length
        state.cards.push(card)
        state.cardActive = active
      },
      updateCard(state, obj) {
        state.cards[obj.index] = obj.card
        state.cardActive = obj.index
      },
      addTransaction(state, t) {
        state.transactions[t.id] = t
      }
    },
    getters: {
      cardActive: state => {
        return state.cards[state.cardActive]
      },
      cardHelp: state => {
        if (!state.cards.length) {
          return ''
        }

        return state.cards[state.cardActive].card_number.split(' ')[3]
      }
    }
  })
}

export default store
