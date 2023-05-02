import { MutationTree, ActionTree } from 'vuex'

type State = ReturnType<typeof state>

export const state = () => ({
  currentSession: {},
  sessionList: [],
})

export const mutations: MutationTree<State> = {
  setCurrentSession(state, payload) {
    state.currentSession = payload
  },

  setSessionList(state, payload) {
    state.sessionList  = payload
  }
}

export const actions: ActionTree<StaticRange, any> = {

}